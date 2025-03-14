"use client";

/**
 * Компонент кнопки синхронизации звука и видео
 * Добавляет возможность синхронизировать аудио и видео с использованием модели lipsync
 */

import { useProjectId, useVideoProjectStore } from "@/data/store";
import { syncLipSync, type LipSyncResponse } from "@/lib/fal";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/data/db";
import { queryKeys, useProjectMediaItems, useVideoComposition } from "@/data/queries";
import type { MediaItem } from "@/data/schema";
import { resolveMediaUrl } from "@/lib/utils";
import { useState } from "react";
import { WithTooltip } from "./ui/tooltip";
import { useJobCreator } from "@/data/mutations";

export function LipSyncButton() {
  const { toast } = useToast();
  const projectId = useProjectId();
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Получаем данные о композиции видео (дорожки, кадры, медиа)
  const { data: composition } = useVideoComposition(projectId);
  const { tracks = [], frames = {}, mediaItems = {} } = composition || {};
  
  // Находим видео и аудио дорожки
  const videoTrack = tracks.find(track => track.type === "video");
  const audioTracks = tracks.filter(track => track.type === "music" || track.type === "voiceover");
  
  // Получаем кадры с видео и аудио
  const videoFrames = videoTrack ? frames[videoTrack.id] || [] : [];
  const audioFrames = audioTracks.flatMap(track => frames[track.id] || []);
  
  // Получаем медиа элементы для видео и аудио
  const videoMediaIds = videoFrames.map(frame => frame.data.mediaId);
  const audioMediaIds = audioFrames.map(frame => frame.data.mediaId);
  
  // Проверяем, есть ли видео и аудио на дорожках
  const hasVideoOnTrack = videoMediaIds.length > 0;
  const hasAudioOnTrack = audioMediaIds.length > 0;
  
  const hasMediaForSync = hasVideoOnTrack && hasAudioOnTrack;
  
  // Получаем первый видеокадр и первый аудиокадр с дорожек
  const videoFrame = videoFrames[0];
  const audioFrame = audioFrames[0];
  
  // Получаем медиа элементы для видео и аудио, если они есть
  const videoItem = videoFrame ? mediaItems[videoFrame.data.mediaId] : undefined;
  const audioItem = audioFrame ? mediaItems[audioFrame.data.mediaId] : undefined;
  
  // Получаем URL видео и аудио с помощью функции resolveMediaUrl
  const videoUrl = videoItem ? resolveMediaUrl(videoItem) : undefined;
  const audioUrl = audioItem ? resolveMediaUrl(audioItem) : undefined;
  
  // Создаем job creator для синхронизации звука и видео
  const syncJobCreator = useJobCreator({
    projectId,
    endpointId: "fal-ai/sync-lipsync",
    mediaType: "video",
    input: {
      model: "lipsync-1.9.0-beta",
      video_url: videoUrl,
      audio_url: audioUrl,
      sync_mode: "cut_off"
    }
  });
  
  const handleSync = () => {
    if (!videoUrl || !audioUrl) {
      toast({
        title: "Ошибка синхронизации",
        description: "URL видео или аудио не найден. Убедитесь, что медиа файлы загружены корректно.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSyncing(true);
    
    // Создаем задачу синхронизации, которая будет отображаться в левой панели
    syncJobCreator.mutate({} as any, {
      onSuccess: () => {
        setIsSyncing(false);
        toast({
          title: "Задача синхронизации создана",
          description: "Процесс синхронизации запущен. Результат появится в галерее.",
        });
      },
      onError: (error) => {
        setIsSyncing(false);
        console.error("Ошибка при создании задачи синхронизации:", error);
        toast({
          title: "Ошибка синхронизации",
          description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
          variant: "destructive",
        });
      }
    });
  };
  
  return (
    <WithTooltip tooltip="Синхронизировать видео и аудио">
      <Button
        variant="outline"
        size="icon"
        disabled={!hasMediaForSync || isSyncing}
        onClick={handleSync}
        className="h-10 w-10"
      >
        <RefreshCwIcon className={`h-5 w-5 ${isSyncing ? 'animate-spin' : ''}`} />
      </Button>
    </WithTooltip>
  );
}
