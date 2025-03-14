/**
 * Изменено: Обновлен компонент Features с использованием компонентов типографики для централизованного управления стилями.
 */
import { Button } from "@/components/ui/button";
import { Play, FileText, Languages, Video, Download, Plus } from "lucide-react";
import { H2, H3, Text } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function Features() {
  return (
    <>
      {/* Блок "Нам доверяют более 50 000 компаний всех размеров" */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <H2 className="text-white mb-8">
              Нам доверяют более 50 000 компаний всех размеров
            </H2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {/* Здесь будут логотипы компаний */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/50 text-xs">Логотип {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Блок "Создавайте профессиональные и увлекательные видео для любых задач" */}
      <section id="features" className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <H2 className="mb-8 text-black">
              Создавайте профессиональные и увлекательные видео для любых задач
            </H2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-4">
                <div className="relative w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-[#FF0080]" />
                  </div>
                </div>
                <H3 className="mb-2">Обучение и развитие</H3>
              </div>
              
              <div className="p-4">
                <div className="relative w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-[#FF0080]" />
                  </div>
                </div>
                <H3 className="mb-2">Создание контента</H3>
              </div>
              
              <div className="p-4">
                <div className="relative w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-[#FF0080]" />
                  </div>
                </div>
                <H3 className="mb-2">Образование</H3>
              </div>
              
              <div className="p-4">
                <div className="relative w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-[#FF0080]" />
                  </div>
                </div>
                <H3 className="mb-2">Маркетинг</H3>
              </div>
            </div>
            
            <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[180px] h-[40px]">
              Изучить варианты применения
            </Button>
          </div>
        </div>
      </section>

      {/* Блок "Откройте простое создание контента в 4 шага" */}
      <section className="py-20 bg-gray-100 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <H2 className="mb-12 text-black">
              Откройте простое создание контента в 4 шага
            </H2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="p-4">
                <FileText className="w-12 h-12 text-[#007BFF] mx-auto mb-4" />
                <H3 className="mb-2">Начните с текста</H3>
                <Text className="text-gray-600">Начните с текста, сценария, блога или видео о продукте</Text>
              </div>
              
              <div className="p-4">
                <Languages className="w-12 h-12 text-[#007BFF] mx-auto mb-4" />
                <H3 className="mb-2">Выберите ИИ-голос</H3>
                <Text className="text-gray-600">Выберите персонализированный ИИ-голос</Text>
              </div>
              
              <div className="p-4">
                <Video className="w-12 h-12 text-[#007BFF] mx-auto mb-4" />
                <H3 className="mb-2">Выберите медиа</H3>
                <Text className="text-gray-600">Выберите медиа или создайте с помощью ИИ</Text>
              </div>
              
              <div className="p-4">
                <Download className="w-12 h-12 text-[#007BFF] mx-auto mb-4" />
                <H3 className="mb-2">Просмотрите и доработайте</H3>
                <Text className="text-gray-600">Просмотрите мгновенно и доработайте ваше творение</Text>
              </div>
            </div>
            
            <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[150px] h-[40px]">
              Начать создавать <Plus className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Блок "Добавьте индивидуальности вашим видео с аватарами" */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <H2 className="mb-12 text-black">
              Добавьте индивидуальности вашим видео с аватарами
            </H2>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-36 h-48 bg-gray-200 rounded-lg border border-gray-300 shadow-sm">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Аватар {i+1}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[200px] h-[50px]">
              Начать создавать 70+ аватаров <Plus className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Блок "Уверены перед камерой, но нет времени?" */}
      <section className="py-20 bg-gray-100 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <H2 className="mb-12 text-black">
              Уверены перед камерой, но нет времени?
            </H2>
            
            <div className="flex flex-wrap justify-center gap-12 mb-12">
              <div className="w-48 h-60 bg-gray-200 rounded-lg border border-gray-300 shadow-sm">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <span className="text-gray-500 mt-2">Реальный человек</span>
                </div>
              </div>
              
              <div className="w-48 h-60 bg-gray-200 rounded-lg border border-gray-300 shadow-sm">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <span className="text-gray-500 mt-2">ИИ-клон</span>
                </div>
              </div>
            </div>
            
            <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[180px] h-[40px]">
              Клонировать меня сейчас <Plus className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Блок "Больше не нужно ждать дикторов и переводчиков" */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <H2 className="mb-12 text-black">
              Больше не нужно ждать дикторов и переводчиков
            </H2>
            
            <div className="w-full max-w-lg mx-auto h-48 bg-gray-200 rounded-lg border border-gray-300 shadow-sm mb-12">
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-4">Человек с выбором языков</span>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-gray-300 rounded text-xs">English</div>
                    <div className="px-3 py-1 bg-gray-300 rounded text-xs">German</div>
                    <div className="px-3 py-1 bg-gray-300 rounded text-xs">Spanish</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[180px] h-[40px]">
              Изучить все голоса
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
