import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("Missing 'url' query parameter", {
      status: 400,
    });
  }
  
  try {
    const parsedUrl = new URL(url);
    
    // Проверяем, является ли URL результатом от sync.so
    if (parsedUrl.hostname === "api.sync.so") {
      console.log("Загрузка видео с sync.so:", parsedUrl.toString());
      
      // Получаем видео с API sync.so с включенным перенаправлением
      const response = await fetch(parsedUrl.toString(), {
        headers: {
          "Accept": "video/mp4,video/*;q=0.9,*/*;q=0.8",
        },
        redirect: "follow", // Следуем за перенаправлениями
      });
      
      if (!response.ok) {
        console.error("Ошибка при загрузке видео с sync.so:", response.status, response.statusText);
        return new Response(`Ошибка при загрузке видео: ${response.status} ${response.statusText}`, {
          status: response.status,
        });
      }
      
      // Получаем финальный URL после всех перенаправлений
      const finalUrl = response.url;
      console.log("Финальный URL видео:", finalUrl);
      
      // Получаем тип контента из ответа
      const contentType = response.headers.get("content-type") || "video/mp4";
      
      // Получаем данные видео
      const videoData = await response.arrayBuffer();
      
      // Возвращаем видео с правильным типом контента
      return new Response(videoData, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": "inline",
          "Cache-Control": "public, max-age=31536000",
        },
      });
    }
    
    // Для других URL просто проксируем запрос с включенным перенаправлением
    return fetch(parsedUrl.toString(), {
      redirect: "follow", // Следуем за перенаправлениями
    });
  } catch (error) {
    console.error("Ошибка при обработке URL:", error);
    return new Response(`Invalid 'url' query parameter: ${error instanceof Error ? error.message : String(error)}`, {
      status: 400,
    });
  }
};

// Увеличиваем лимит размера тела запроса для больших видеофайлов
export const config = {
  api: {
    responseLimit: '50mb',
  },
};
