/**
 * Изменено: Обновлен компонент Community с использованием компонентов типографики для централизованного управления стилями.
 */
import { Button } from "@/components/ui/button";
import { MessageCircle, Star, Users, Globe, ChevronDown } from "lucide-react";
import { H2, H3, Text, SmallText, AccordionText, FooterHeading } from "@/components/ui/typography";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Community() {
  return (
    <>
      {/* Блок "Любим профессионалами в обучении и развитии по всему миру" */}
      <section id="community" className="py-20 bg-gray-100 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <H2 className="mb-12 text-black">
              Любим профессионалами в обучении и развитии по всему миру
            </H2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <H3 className="mb-2">7 500+ видео создано</H3>
              </div>
              
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <H3 className="mb-2">Рейтинг 4.8/5</H3>
              </div>
              
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <H3 className="mb-2">Поддержка 200+ языков</H3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
                  <div className="text-left">
                    <FooterHeading>Андрей П.</FooterHeading>
                    <SmallText className="text-gray-600">Руководитель отдела обучения</SmallText>
                  </div>
                </div>
                <Text className="text-left text-gray-700">
                  "АЙКА ВИДЕО значительно ускорила наш процесс создания обучающих материалов. Теперь мы создаем профессиональные видео за минуты вместо дней."
                </Text>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
                  <div className="text-left">
                    <FooterHeading>Елена С.</FooterHeading>
                    <SmallText className="text-gray-600">Маркетолог</SmallText>
                  </div>
                </div>
                <Text className="text-left text-gray-700">
                  "Качество ИИ-голосов просто потрясающее. Наши клиенты даже не догадываются, что видео созданы с помощью искусственного интеллекта."
                </Text>
              </div>
            </div>
            
            <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[200px] h-[50px]">
              Создать аккаунт бесплатно
            </Button>
          </div>
        </div>
      </section>

      {/* Блок "Создавайте видео за минуты с помощью ИИ" */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <H2 className="mb-8 text-black">
              Создавайте видео за минуты с помощью ИИ
            </H2>
            <Text className="text-gray-700 max-w-2xl mx-auto mb-12">
              ИИ помогает быстро превращать идеи в профессиональные видео. Экономьте время и ресурсы, 
              создавая высококачественный контент для любых целей.
            </Text>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 text-xs">Логотип 1</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 text-xs">Логотип 2</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 text-xs">Логотип 3</span>
              </div>
            </div>
            
            <Button className="bg-[#FF0080] text-white hover:bg-[#FF0080]/90 w-[180px] h-[40px]">
              Связаться с отделом продаж
            </Button>
          </div>
        </div>
      </section>

      {/* Блок "Часто задаваемые вопросы" */}
      <section className="py-20 bg-gray-100 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <H2 className="mb-12 text-black text-center">
              Часто задаваемые вопросы
            </H2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  <AccordionText>
                    Чем наш сервис отличается от других инструментов для создания видео из текста?
                  </AccordionText>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <Text>
                  АЙКА ВИДЕО предлагает уникальное сочетание реалистичных ИИ-голосов, высококачественных аватаров и 
                  интуитивно понятного интерфейса. Наша платформа позволяет создавать профессиональные видео 
                  без специальных навыков и дорогостоящего оборудования.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  <AccordionText>
                    Какие языки поддерживает платформа?
                  </AccordionText>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <Text>
                  Наша платформа поддерживает более 200 языков, включая русский, английский, испанский, 
                  немецкий, французский, китайский, японский и многие другие. Вы можете создавать 
                  многоязычный контент без необходимости нанимать переводчиков.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  <AccordionText>
                    Как работает функция создания ИИ-аватаров?
                  </AccordionText>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <Text>
                  Функция создания ИИ-аватаров позволяет выбрать из более чем 70 готовых персонажей или 
                  создать собственного цифрового клона. Аватары синхронизируют движения губ с речью и 
                  имеют естественную мимику, что делает видео более привлекательным и реалистичным.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  <AccordionText>
                    Могу ли я использовать сервис для коммерческих целей?
                  </AccordionText>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <Text>
                  Да, все видео, созданные на нашей платформе, можно использовать в коммерческих целях. 
                  Вы получаете полные права на созданный контент и можете использовать его для маркетинга, 
                  обучения, презентаций и любых других бизнес-задач.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  <AccordionText>
                    Как начать работу бесплатно?
                  </AccordionText>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <Text>
                  Просто зарегистрируйтесь на нашем сайте, и вы получите доступ к бесплатному тарифу, 
                  который позволяет создавать ограниченное количество видео в месяц. Это отличный способ 
                  попробовать платформу и оценить ее возможности перед переходом на платный тариф.
                  </Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Блок "Присоединяйтесь к нашему сообществу" */}
      <section className="py-20 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <H2 className="mb-4">Присоединяйтесь к нашему сообществу</H2>
            <Text className="text-gray-400 mb-8">
              АЙКА ВИДЕО - профессиональный инструмент для создания AI видео.
              Присоединяйтесь к нашему растущему сообществу и будьте в курсе
              последних новостей и обновлений.
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Link href="https://t.me/aiqaru" target="_blank">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Telegram
                </Button>
              </Link>
              <Link href="https://vk.com/aiqaru" target="_blank">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.136.681-1.254.681-1.846 0-3.896-1.118-5.335-3.202-2.166-3.013-2.76-5.25-2.76-5.717 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.5 2.303 4.691 2.896 4.691.22 0 .322-.102.322-.661V9.16c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.254.305-.491.728-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/>
                  </svg>
                  ВКонтакте
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
