"use client";

import { useProjectCreator } from "@/data/mutations";
import { queryKeys, useProjects } from "@/data/queries";
import type { AspectRatio, VideoProject } from "@/data/schema";
import { useVideoProjectStore } from "@/data/store";
import { useToast } from "@/hooks/use-toast";
import { createProjectSuggestion } from "@/lib/project";
import { cn, rememberLastProjectId } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileVideoIcon, FolderOpenIcon, WandSparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { LoadingIcon } from "./ui/icons";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import { WithTooltip } from "./ui/tooltip";
import { seedDatabase } from "@/data/seed";

type ProjectDialogProps = {} & Parameters<typeof Dialog>[0];

export function ProjectDialog({ onOpenChange, ...props }: ProjectDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aspect, setAspect] = useState<AspectRatio>("16:9");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch existing projects
  const { data: projects = [], isLoading } = useProjects();

  // Seed data with template project if empty
  useEffect(() => {
    if (projects.length === 0 && !isLoading) {
      seedDatabase().then(() => {
        queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      });
    }
  }, [projects, isLoading]);

  // Create project mutation
  const setProjectId = useVideoProjectStore((s) => s.setProjectId);
  const createProject = useProjectCreator();

  const suggestProject = useMutation({
    mutationFn: async () => {
      return createProjectSuggestion();
    },
    onSuccess: (suggestion) => {
      setTitle(suggestion.title);
      setDescription(suggestion.description);
    },
    onError: (error) => {
      console.warn("Failed to create suggestion", error);
      toast({
        title: "Failed to create suggestion",
        description:
          "There was an unexpected error while generating a suggestion. Try again.",
      });
    },
  });

  const setProjectDialogOpen = useVideoProjectStore(
    (s) => s.setProjectDialogOpen,
  );

  const handleSelectProject = (project: VideoProject) => {
    setProjectId(project.id);
    setProjectDialogOpen(false);
    rememberLastProjectId(project.id);
  };

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
    }
    onOpenChange?.(isOpen);
    setProjectDialogOpen(isOpen);
  };

  return (
    <Dialog {...props} onOpenChange={handleOnOpenChange}>
      <DialogContent className="flex flex-col max-w-4xl h-fit max-h-[520px] min-h-[380px]">
        <DialogHeader>
          <div className="flex flex-row gap-2 mb-4">
            <span className="text-lg font-medium">
              <Logo />
            </span>
          </div>
          <DialogTitle className="sr-only">New Project</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new or open an existent project
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-8 h-full">
          {/* New Project Form */}
          <div className="flex flex-col flex-1 gap-8">
            <h2 className="text-lg font-semibold flex flex-row gap-2">
              <FileVideoIcon className="w-6 h-6 opacity-50 stroke-1" />
              Создать новый проект
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Название проекта"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Опишите ваш проект"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <div>
                <h4 className="text-xs text-muted-foreground mb-1">
                  Соотношение сторон:
                </h4>
                <div className="flex flex-row gap-2">
                  <Button
                    variant={aspect === "16:9" ? "secondary" : "outline"}
                    onClick={() => {
                      setAspect("16:9");
                    }}
                  >
                    16:9
                  </Button>
                  <Button
                    variant={aspect === "9:16" ? "secondary" : "outline"}
                    onClick={() => {
                      setAspect("9:16");
                    }}
                  >
                    9:16
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-end justify-start gap-2">
              <WithTooltip tooltip="Out of ideas? Generate a new random project.">
                <Button
                  variant="secondary"
                  disabled={suggestProject.isPending}
                  onClick={() => suggestProject.mutate()}
                >
                  {suggestProject.isPending ? (
                    <LoadingIcon />
                  ) : (
                    <WandSparklesIcon className="opacity-50" />
                  )}
                  Сгенерировать
                </Button>
              </WithTooltip>
              <Button
                onClick={() =>
                  createProject.mutate(
                    {
                      title,
                      description,
                      aspectRatio: aspect,
                    },
                    {
                      onSuccess: (projectId) => {
                        handleSelectProject({ id: projectId } as VideoProject);
                      },
                    },
                  )
                }
                disabled={!title.trim() || createProject.isPending}
              >
                {createProject.isPending ? "Создание..." : "Создать проект"}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <Separator orientation="vertical" className="flex-1" />
              <span className="font-semibold">или</span>
            <Separator orientation="vertical" className="flex-1" />
          </div>

          {/* Existing Projects */}
          <div className="flex flex-col flex-1 gap-8">
            <h2 className="text-lg font-semibold flex flex-row gap-2">
              <FolderOpenIcon className="w-6 h-6 opacity-50 stroke-1" />
              Открыть существующий проект
            </h2>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
              {isLoading ? (
                // Loading skeletons
                <>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="w-full h-[72px] rounded-lg" />
                  ))}
                </>
              ) : projects?.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">
                  Проекты не найдены
                </div>
              ) : (
                // Project list
                projects?.map((project) => (
                  <button
                    type="button"
                    key={project.id}
                    onClick={() => handleSelectProject(project)}
                    className={cn(
                      "w-full text-left p-3 rounded",
                      "bg-card hover:bg-accent transition-colors",
                      "border border-border",
                    )}
                  >
                    <h3 className="font-medium text-sm">{project.title}</h3>
                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <p className="text-muted-foreground text-sm mt-4 w-full text-center">
            Это{" "}
            <a
              className="underline underline-offset-2 decoration-foreground/50 text-foreground"
              href="https://github.com/fal-ai-community/video-starter-kit"
            >
              проект с открытым исходным кодом
            </a>{" "}
            разработанный{" "}
            <a
              className="underline underline-offset-2 decoration-foreground/50 text-foreground"
              href="https://fal.ai"
            >
              {" "}
              fal.ai
            </a>{" "}
            и его партнерами.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
