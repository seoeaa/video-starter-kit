import type { VideoProject } from "@/data/schema";
import { fal } from "./fal";

type EnhancePromptOptions = {
  type: "image" | "video" | "music" | "voiceover";
  project?: VideoProject;
};

const SYSTEM_PROMPT = `
Вы помощник видеоредактора. Вы получите инструкции по улучшению описания
изображений, аудиоклипов и видеоклипов в видеопроекте. Вам будет дано название проекта
и краткое описание. Используйте эту контекстную информацию, чтобы придумать созданное и хорошо сформированное
описание для медиаресурсов. Описание должно быть креативным и интересным.

Важные рекомендации:

1. Описание должно быть креативным и интересным.
2. Оно должно быть кратким, не превышать 2-3 предложений.
3. Описание должно соответствовать проекту.
4. Описание должно быть хорошо сформированным и грамматически правильным.
5. И последнее, но не менее важное: **всегда** возвращайте только расширенную подсказку, не добавляйте
никакого дополнительного контента и/или объяснений. **НЕ ДОБАВЛЯЙТЕ разметку** или кавычки, возвращайте
**ПРОСТУЮ СТРОКУ**.
`;

export async function enhancePrompt(
  prompt: string,
  options: EnhancePromptOptions = { type: "video" },
) {
  const { type, project } = options;
  const projectInfo = !project
    ? ""
    : `
    ## Информация о проекте

    Звголоаок: ${project.title}
    Описание: ${project.description}
  `.trim();
  const promptInfo = !prompt.trim() ? "" : `Инструкция пользователя: ${prompt}`;

  const { data } = await fal.subscribe("fal-ai/any-llm", {
    input: {
      system_prompt: SYSTEM_PROMPT,
      prompt: `
        Создайте приглашение для генерации ${type} через вывод ИИ. Вот контекст:
        ${projectInfo}
        ${promptInfo}
      `.trim(),
      model: "anthropic/claude-3.5-sonnet",
    },
  });
  return data.output.replace(/^"|"$/g, "");
}
