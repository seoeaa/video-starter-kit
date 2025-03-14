/**
 * Изменено: Обновлен футер с использованием компонентов типографики для централизованного управления стилями.
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video, Plus } from "lucide-react";
import { H2, Text, FooterHeading, FooterText } from "@/components/ui/typography";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Верхняя часть футера */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <H2 className="mb-4">
            Перестаньте тратить время, силы и деньги на создание видео
          </H2>
          <Text className="text-gray-400 mb-8">
            Экономьте до 50 часов в месяц с подпиской всего за 4$/месяц
          </Text>
          <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[180px] h-[40px]">
            Начать использовать сейчас <Plus className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Колонка 1: Функции */}
          <div className="flex flex-col">
            <FooterHeading className="mb-4">Функции</FooterHeading>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Создание видео из текста</FooterText>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>ИИ-голоса</FooterText>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Аватары</FooterText>
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 2: Применение */}
          <div className="flex flex-col">
            <FooterHeading className="mb-4">Применение</FooterHeading>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Обучение</FooterText>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Маркетинг</FooterText>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Образование</FooterText>
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Руководство */}
          <div className="flex flex-col">
            <FooterHeading className="mb-4">Руководство</FooterHeading>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Как начать</FooterText>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Советы</FooterText>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  <FooterText>Поддержка</FooterText>
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Связаться с нами */}
          <div className="flex flex-col">
            <FooterHeading className="mb-4">Связаться с нами</FooterHeading>
            <div className="flex space-x-4">
              <Link href="https://t.me/aiqaru" target="_blank">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF0080]/20 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.296c-.146.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.054 5.56-5.022c.242-.213-.054-.334-.373-.121L8.48 13.037l-2.95-.924c-.642-.204-.657-.642.134-.953l11.514-4.435c.538-.196 1.006.128.832.523z" />
                  </svg>
                </div>
              </Link>
              <Link href="https://vk.com/aiqaru" target="_blank">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF0080]/20 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.136.681-1.254.681-1.846 0-3.896-1.118-5.335-3.202-2.166-3.013-2.76-5.25-2.76-5.717 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.5 2.303 4.691 2.896 4.691.22 0 .322-.102.322-.661V9.16c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.254.305-.491.728-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Video className="w-6 h-6" />
              <FooterHeading>АЙКА ВИДЕО</FooterHeading>
            </div>
            
            <div className="flex items-center">
              <FooterText className="text-gray-400 mr-4">
                Зарабатывайте 30% комиссии как партнер
              </FooterText>
              <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 h-[40px]">
                Начать
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
