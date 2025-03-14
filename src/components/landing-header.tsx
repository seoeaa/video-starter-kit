/**
 * Изменено: Обновлен хедер с использованием компонентов типографики для централизованного управления стилями.
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { FooterHeading, Text } from "@/components/ui/typography";

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex">
          <Link href="/" className="flex items-center space-x-2">
            <Video className="w-6 h-6" />
            <FooterHeading>АЙКА ВИДЕО</FooterHeading>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Text>Функции</Text>
          </Link>
          <Link
            href="#use-cases"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Text>Применение</Text>
          </Link>
          <Link
            href="#pricing"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Text>Цены</Text>
          </Link>
          <Link href="/login">
            <Button 
              variant="ghost" 
              className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90"
            >
              Войти
            </Button>
          </Link>
          <Link href="/register">
            <Button 
              className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[120px] h-[40px] rounded-lg"
            >
              Зарегистрироваться
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
