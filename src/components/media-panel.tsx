import { db } from "@/data/db";
import { queryKeys } from "@/data/queries";
import type { MediaItem } from "@/data/schema";
import { useProjectId, useVideoProjectStore } from "@/data/store";
import { fal } from "@/lib/fal";
import { cn, resolveMediaUrl, trackIcons } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CircleXIcon,
  GripVerticalIcon,
  HourglassIcon,
  ImageIcon,
  MicIcon,
  MusicIcon,
  VideoIcon,
} from "lucide-react";
import {
  type DragEventHandler,
  Fragment,
  type HTMLAttributes,
  createElement,
} from "react";
import { Badge } from "./ui/badge";
import { LoadingIcon } from "./ui/icons";
import { useToast } from "@/hooks/use-toast";
import { getMediaMetadata } from "@/lib/ffmpeg";

type MediaItemRowProps = {
  data: MediaItem;
  onOpen: (data: MediaItem) => void;
  draggable?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function MediaItemRow({
  data,
  className,
  onOpen,
  draggable = true,
  ...props
}: MediaItemRowProps) {
  const isDone = data.status === "completed" || data.status === "failed";
  const queryClient = useQueryClient();
  const projectId = useProjectId();
  const { toast } = useToast();
  useQuery({
    queryKey: queryKeys.projectMedia(projectId, data.id),
    queryFn: async () => {
      if (data.kind === "uploaded") return null;
      const queueStatus = await fal.queue.status(data.endpointId, {
        requestId: data.requestId,
      });
      if (queueStatus.status === "IN_PROGRESS") {
        await db.media.update(data.id, {
          ...data,
          status: "running",
        });
        await queryClient.invalidateQueries({
          queryKey: queryKeys.projectMediaItems(data.projectId),
        });
      }
      let media: Partial<MediaItem> = {};

      if (queueStatus.status === "COMPLETED") {
        try {
          const result = await fal.queue.result(data.endpointId, {
            requestId: data.requestId,
          });
          
          // Проверяем, является ли результат от sync.so
          if (data.endpointId === "fal-ai/sync-lipsync" && 
              result.data.video && 
              result.data.video.url && 
              result.data.video.url.includes("api.sync.so")) {
            
            console.log("Получен результат от sync.so, получаем прямую ссылку на видео...");
            
            try {
              // Получаем прямую ссылку на видео, следуя за перенаправлениями
              const response = await fetch(result.data.video.url, {
                redirect: "manual", // Не следуем за перенаправлениями автоматически
              });
              
              // Получаем URL перенаправления из заголовка Location
              const directUrl = response.headers.get("location");
              
              if (directUrl) {
                console.log("Получена прямая ссылка на видео:", directUrl);
                
                // Обновляем URL в результате
                result.data.video.url = directUrl;
              } else {
                console.warn("Не удалось получить прямую ссылку на видео");
              }
            } catch (error) {
              console.error("Ошибка при получении прямой ссылки на видео:", error);
            }
          }
          
          media = {
            ...data,
            output: result.data,
            status: "completed",
          };

          await db.media.update(data.id, media);

          toast({
            title: "Генерация завершена",
            description: `Ваш ${data.mediaType} был успешно сгенерирован.`,
          });
        } catch (error) {
          console.error("Ошибка при получении результата:", error);
          await db.media.update(data.id, {
            ...data,
            status: "failed",
          });
          toast({
            title: "Генерация не удалась",
            description: `Не удалось сгенерировать ${data.mediaType}.`,
          });
        } finally {
          await queryClient.invalidateQueries({
            queryKey: queryKeys.projectMediaItems(data.projectId),
          });
        }

        if (media.mediaType !== "image") {
          const mediaMetadata = await getMediaMetadata(media as MediaItem);

          await db.media.update(data.id, {
            ...media,
            metadata: mediaMetadata?.media || {},
          });

          await queryClient.invalidateQueries({
            queryKey: queryKeys.projectMediaItems(data.projectId),
          });
        }
      }

      return null;
    },
    enabled: !isDone && data.kind === "generated",
    refetchInterval: data.mediaType === "video" ? 20000 : 1000,
  });
  const mediaUrl = resolveMediaUrl(data) ?? "";
  const mediaId = data.id.split("-")[0];
  const handleOnDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.setData("job", JSON.stringify(data));
    return true;
    // event.dataTransfer.dropEffect = "copy";
  };

  const coverImage =
    data.mediaType === "video"
      ? data.metadata?.start_frame_url || data?.metadata?.end_frame_url
      : resolveMediaUrl(data);

  return (
    <div
      className={cn(
        "flex items-start space-x-2 py-2 w-full px-4 hover:bg-accent transition-all",
        className,
      )}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(data);
      }}
      draggable={draggable && data.status === "completed"}
      onDragStart={handleOnDragStart}
    >
      {!!draggable && (
        <div
          className={cn(
            "flex items-center h-full cursor-grab text-muted-foreground",
            {
              "text-muted": data.status !== "completed",
            },
          )}
        >
          <GripVerticalIcon className="w-4 h-4" />
        </div>
      )}
      <div className="w-16 h-16 aspect-square relative rounded overflow-hidden border border-transparent hover:border-accent bg-accent transition-all">
        {data.status === "completed" ? (
          <>
            {(data.mediaType === "image" || data.mediaType === "video") &&
              (coverImage ? (
                <img
                  src={coverImage}
                  alt="Сгенерированный медиа-контент"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center top-0 left-0 absolute p-2 z-50">
                  {data.mediaType === "image" ? (
                    <ImageIcon className="w-7 h-7 text-muted-foreground" />
                  ) : (
                    <VideoIcon className="w-7 h-7 text-muted-foreground" />
                  )}
                </div>
              ))}
            {data.mediaType === "music" && (
              <div className="w-full h-full flex items-center justify-center top-0 left-0 absolute p-2 z-50">
                <MusicIcon className="w-7 h-7 text-muted-foreground" />
              </div>
            )}
            {data.mediaType === "voiceover" && (
              <div className="w-full h-full flex items-center justify-center top-0 left-0 absolute p-2 z-50">
                <MicIcon className="w-7 h-7 text-muted-foreground" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center text-muted-foreground">
            {data.status === "running" && <LoadingIcon className="w-8 h-8" />}
            {data.status === "pending" && (
              <HourglassIcon className="w-8 h-8 animate-spin ease-in-out delay-700 duration-1000" />
            )}
            {data.status === "failed" && (
              <CircleXIcon className="w-8 h-8 text-rose-700" />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col h-full gap-1 flex-1">
        <div className="flex flex-col items-start justify-center">
          <div className="flex w-full justify-between">
            <h3 className="text-sm font-medium flex flex-row gap-1 items-center">
              {createElement(trackIcons[data.mediaType], {
                className: "w-4 h-4 stroke-1",
              } as React.ComponentProps<
                (typeof trackIcons)[keyof typeof trackIcons]
              >)}
              <span>{data.kind === "generated" ? "Задача" : "Файл"}</span>
              <code className="text-muted-foreground">#{mediaId}</code>
            </h3>
            {data.status !== "completed" && (
              <Badge
                variant="outline"
                className={cn({
                  "text-rose-700": data.status === "failed",
                  "text-sky-500": data.status === "running",
                  "text-muted-foreground": data.status === "pending",
                })}
              >
                {data.status === "failed" ? "ошибка" : 
                 data.status === "running" ? "выполняется" : 
                 data.status === "pending" ? "ожидание" : data.status}
              </Badge>
            )}
          </div>
          <p className="opacity-40 text-sm line-clamp-1 ">
            {data.input?.prompt}
          </p>
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(data.createdAt, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}

type MediaItemsPanelProps = {
  data: MediaItem[];
  mediaType: string;
} & HTMLAttributes<HTMLDivElement>;

export function MediaItemPanel({
  className,
  data,
  mediaType,
}: MediaItemsPanelProps) {
  const setSelectedMediaId = useVideoProjectStore((s) => s.setSelectedMediaId);
  const handleOnOpen = (item: MediaItem) => {
    setSelectedMediaId(item.id);
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden divide-y divide-border",
        className,
      )}
    >
      {data
        .filter((media) => {
          if (mediaType === "all") return true;
          return media.mediaType === mediaType;
        })
        .map((media) => (
          <Fragment key={media.id}>
            <MediaItemRow data={media} onOpen={handleOnOpen} />
          </Fragment>
        ))}
    </div>
  );
}
