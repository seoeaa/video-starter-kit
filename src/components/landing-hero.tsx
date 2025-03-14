/**
 * Изменено: Обновлен героический блок с использованием компонентов типографики для централизованного управления стилями.
 */
import { Button } from "@/components/ui/button";
import { LaptopMockup } from "@/components/ui/landing-laptop-mockup";
import { H1, Subtitle } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <H1 className="mb-8 text-white">
            Превращайте идеи в видео с помощью ИИ-голосов
          </H1>

          <Subtitle className="text-white/80 max-w-3xl mx-auto mb-12">
            Простой в использовании редактор текста в видео с реалистичными видео, 
            динамическими ИИ-голосами и широким набором функций на основе ИИ. 
            Начните бесплатно!
          </Subtitle>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/app">
              <Button
                size="lg"
                className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[200px] h-[50px] shadow-md"
              >
                Начать создавать
              </Button>
            </Link>
          </div>
        </div>

        {/* Видео демонстрация */}
        <div className="relative group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0080]/20 to-[#007BFF]/20 blur-3xl opacity-30" />
          <div className="relative border border-white/20 rounded-lg shadow-2xl overflow-hidden w-[60%] mx-auto">
            <LaptopMockup>
              <Image
                src="/screenshot.webp?height=800&width=1200"
                width={1200}
                height={800}
                alt="Демонстрация интерфейса АЙКА ВИДЕО"
                className="w-full h-auto"
                priority
              />
            </LaptopMockup>
          </div>

          {/* Floating gradient elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#FF0080]/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#007BFF]/20 rounded-full blur-3xl opacity-30" />
        </div>
      </div>
    </section>
  );
}
