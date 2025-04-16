"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Send, Play, Award, Briefcase, Camera, Mail, Clock, Video, Volume2, Scissors, Palette, Sparkles } from "lucide-react";
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

// Заглушки для видео (будут заменены на реальные после загрузки)
const videoSamples = [
  {
    id: 1,
    title: "Графический дизайн для рекламы",
    description: "Рекламный ролик с красочными переходами и спецэффектами",
    category: "Реклама",
    duration: "0:45",
    thumbnail: "/images/video1.jpg",
    url: "https://www.youtube.com/watch?v=L8i8YtPrueI"
  },
  {
    id: 2,
    title: "Монтаж спортивных видео",
    description: "Динамичная нарезка спортивных моментов с музыкальным сопровождением",
    category: "Спорт",
    duration: "1:20",
    thumbnail: "/images/video2.jpg",
    url: "#"
  },
  {
    id: 3,
    title: "Корпоративный видеоролик",
    description: "Презентация для бизнеса с инфографикой и элементами анимации",
    category: "Бизнес",
    duration: "2:15",
    thumbnail: "/images/video3.jpg",
    url: "#"
  },
  {
    id: 4,
    title: "Кинематографический трейлер",
    description: "Короткий фильм в кинематографическом стиле с цветокоррекцией",
    category: "Арт",
    duration: "1:30",
    thumbnail: "/images/video4.jpg",
    url: "#"
  },
  {
    id: 5,
    title: "Промо для YouTube",
    description: "Яркое интро и переходы для YouTube-канала",
    category: "Социальные сети",
    duration: "0:30",
    thumbnail: "/images/video5.jpg",
    url: "#"
  },
  {
    id: 6,
    title: "Монтаж интервью",
    description: "Профессионально смонтированное интервью с несколькими камерами",
    category: "Интервью",
    duration: "3:45",
    thumbnail: "/images/video6.jpg",
    url: "#"
  },
  {
    id: 7,
    title: "Музыкальный клип",
    description: "Создание музыкального клипа с синхронизированными визуальными эффектами",
    category: "Музыка",
    duration: "4:10",
    thumbnail: "/images/video7.jpg",
    url: "#"
  },
  {
    id: 8,
    title: "Анимационный ролик",
    description: "2D анимация с текстовыми эффектами и фирменным стилем",
    category: "Анимация",
    duration: "1:15",
    thumbnail: "/images/video8.jpg",
    url: "#"
  },
  {
    id: 9,
    title: "Свадебное видео",
    description: "Эмоциональный свадебный клип с плавными переходами",
    category: "События",
    duration: "5:30",
    thumbnail: "/images/video9.jpg",
    url: "#"
  }
];

// Информация о навыках
const skills = [
  { name: "Adobe Premiere Pro", level: 87 },
  { name: "Adobe After Effects", level: 55 },
  { name: "DaVinci Resolve", level: 33 },
  { name: "Motion Design", level: 48 },
  { name: "Цветокоррекция", level: 63 },
  { name: "Аудиомонтаж", level: 75 }
];

// Услуги
const services = [
  {
    icon: <Scissors className="w-8 h-8 mb-4 text-blue-400" />,
    title: "Монтаж видео",
    description: "Профессиональный монтаж любой сложности из вашего материала"
  },
  {
    icon: <Palette className="w-8 h-8 mb-4 text-blue-400" />,
    title: "Цветокоррекция",
    description: "Профессиональная цветокоррекция для создания нужной атмосферы"
  },
  {
    icon: <Sparkles className="w-8 h-8 mb-4 text-blue-400" />,
    title: "Анимация и эффекты",
    description: "Создание визуальных эффектов, анимации текста и графики"
  },
  {
    icon: <Volume2 className="w-8 h-8 mb-4 text-blue-400" />,
    title: "Аудиомонтаж",
    description: "Работа со звуком, подбор музыки, создание звуковых эффектов"
  }
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videosPerPage = 3;
  const totalPages = Math.ceil(videoSamples.length / videosPerPage);

  // Для анимации прогресс-баров только при появлении блока
  const [progress, setProgress] = useState(0);
  const skillsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame: number;
    let started = false;
    const duration = 1000; // ms
    function startAnimation() {
      if (started) return;
      started = true;
      const start = performance.now();
      function animate(now: number) {
        const prog = Math.min((now - start) / duration, 1);
        setProgress(prog);
        if (prog < 1) {
          frame = requestAnimationFrame(animate);
        }
      }
      frame = requestAnimationFrame(animate);
    }
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Вычисляем текущие видео для отображения
  const currentVideos = videoSamples.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  // Добавляю свайпы для пролистывания видео
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextPage,
    onSwipedRight: prevPage,
    trackMouse: true
  });

  return (
    <main className="min-h-screen py-8 px-4 md:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Фон с иконками AE, PR, DaVinci */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        {/* After Effects Logo (PNG) */}
        <motion.div
          className="absolute left-[-20px] top-[7%]"
          animate={{
            y: [0, 32, 0, -32, 0],
            x: [0, 18, 0, -18, 0],
            scale: [1, 1.08, 1, 0.96, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/icons/ae.png" alt="After Effects" width={110} height={110} className="opacity-25 blur-lg rounded-xl" draggable={false} />
        </motion.div>
        {/* Premiere Pro Logo (PNG) */}
        <motion.div
          className="absolute right-[-20px] top-[13%]"
          animate={{
            y: [0, -36, 0, 24, 0],
            x: [0, -20, 0, 16, 0],
            scale: [1, 0.94, 1, 1.06, 1]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/icons/pr.png" alt="Premiere Pro" width={110} height={110} className="opacity-25 blur-lg rounded-xl" draggable={false} />
        </motion.div>
        {/* DaVinci Resolve Logo (PNG) */}
        <motion.div
          className="absolute left-[8%] top-[32%]"
          animate={{
            rotate: [0, 360],
            y: [0, -10, 0, 10, 0],
            x: [0, 8, 0, -8, 0]
          }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          <Image src="/icons/davinci.png" alt="DaVinci Resolve" width={110} height={110} className="opacity-25 blur-lg rounded-xl" draggable={false} />
        </motion.div>
      </div>
      <div className="w-full max-w-5xl">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0 }}
          viewport={{ once: true }}
          className="glass-card mb-8 p-6 md:p-8 flex items-center bg-white/30 backdrop-blur-md shadow-lg"
        >
          <div className="flex-shrink-0 mr-4 relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/favicon.ico"
              alt="Логотип ВидеоМонтаж"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">ВидеоМонтаж</h1>
            <p className="text-gray-300 text-sm md:text-base">Профессиональный видеомонтаж и создание контента</p>
          </div>
        </motion.div>

        {/* Секция "О себе" с гарантированной анимацией */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
          className="glass-card mb-8 p-6 md:p-8 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">О себе</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <p className="text-gray-200 mb-4">
                Я профессиональный видеомонтажер с более чем 5-летним опытом создания качественного видеоконтента для различных платформ и целей. Моя специализация включает монтаж рекламных роликов, музыкальных клипов, корпоративных презентаций и контента для социальных сетей.
              </p>
              <p className="text-gray-200 mb-4">
                Мой подход к работе основан на тщательном внимании к деталям, пониманию потребностей клиента и созданию историй, которые привлекают внимание аудитории. Я постоянно совершенствую свои навыки, осваивая новые техники и инструменты видеомонтажа.
              </p>
              <p className="text-gray-200 mb-6">
                Каждый проект для меня — это возможность создать что-то уникальное, что будет работать на ваши цели и задачи. Я верю, что хороший видеоролик должен не только выглядеть профессионально, но и вызывать эмоции у зрителей.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Award className="text-yellow-400 w-5 h-5" />
                  <span className="text-gray-200">5+ лет опыта</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="text-blue-400 w-5 h-5" />
                  <span className="text-gray-200">100+ завершенных проектов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-green-400 w-5 h-5" />
                  <span className="text-gray-200">Выполнение работы точно в срок</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3" ref={skillsRef}>
              <h3 className="text-xl font-medium mb-4">Навыки</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => {
                  const percent = Math.round(skill.level * progress);
                  let logo = null;
                  if (skill.name === "Adobe Premiere Pro") {
                    logo = (
                      <Image src="/icons/pr.png" alt="Premiere Pro" width={24} height={24} className="w-6 h-6 mr-2 align-middle rounded object-contain" />
                    );
                  } else if (skill.name === "Adobe After Effects") {
                    logo = (
                      <Image src="/icons/ae.png" alt="After Effects" width={24} height={24} className="w-6 h-6 mr-2 align-middle rounded object-contain" />
                    );
                  } else if (skill.name === "DaVinci Resolve") {
                    logo = (
                      <Image src="/icons/davinci.png" alt="DaVinci Resolve" width={24} height={24} className="w-6 h-6 mr-2 align-middle rounded object-contain" />
                    );
                  } else if (skill.name === "Motion Design") {
                    logo = <Sparkles className="w-6 h-6 mr-2 align-middle text-blue-300" />;
                  } else if (skill.name === "Цветокоррекция") {
                    logo = <Palette className="w-6 h-6 mr-2 align-middle text-blue-300" />;
                  } else if (skill.name === "Аудиомонтаж") {
                    logo = <Volume2 className="w-6 h-6 mr-2 align-middle text-blue-300" />;
                  }
                  return (
                    <div key={`skill-${index}`} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 flex items-center">{logo}{skill.name}</span>
                        <span className="text-gray-300">{percent}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${skill.level * progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Услуги */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card mb-8 p-6 md:p-8 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Мои услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={`service-${index}`} className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition duration-300 flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Галерея видео */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
          className="relative video-container glass-card p-6 md:p-8 mb-8 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Примеры работ</h2>

          {/* Контейнер для видео */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...swipeHandlers}>
            {currentVideos.map((video) => (
              video.url && video.url !== "#" ? (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-lg overflow-hidden group"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-blue-500/80 flex items-center justify-center cursor-pointer">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-lg font-medium text-white mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-300 mb-2">{video.description}</p>
                      <span className="inline-block bg-blue-600/70 text-white text-xs px-2 py-1 rounded">
                        {video.category}
                      </span>
                    </div>
                  </div>
                </a>
              ) : (
                <div key={video.id} className="relative rounded-lg overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-blue-500/80 flex items-center justify-center cursor-pointer">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-lg font-medium text-white mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-300 mb-2">{video.description}</p>
                      <span className="inline-block bg-blue-600/70 text-white text-xs px-2 py-1 rounded">
                        {video.category}
                      </span>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Кнопки навигации */}
          <button
            onClick={prevPage}
            className="navigation-button prev-button absolute left-0 top-1/2 -translate-y-1/2 z-10"
            aria-label="Предыдущие видео"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextPage}
            className="navigation-button next-button absolute right-0 top-1/2 -translate-y-1/2 z-10"
            aria-label="Следующие видео"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Индикаторы страниц */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`page-${index}`}
                className={`pagination-dot ${currentPage === index ? "active" : ""}`}
                onClick={() => setCurrentPage(index)}
                aria-label={`Страница ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Контакты */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-card mb-8 p-6 md:p-8 text-center shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Свяжитесь со мной</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Готовы обсудить ваш проект? Напишите мне в Telegram, и я отвечу вам в кратчайшие сроки.
            Каждый проект начинается с диалога!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://t.me/b1tr1x"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-button"
            >
              <Send className="w-5 h-5" />
              <span>Связаться в Telegram</span>
            </a>

            <a
              href="mailto:work@b1tr1x.ru"
              className="email-button flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Написать на Email</span>
            </a>
          </div>
        </motion.div>

        {/* Футер */}
        <footer className="text-center text-gray-400 text-sm mt-8">
          <p>© {new Date().getFullYear()} ВидеоМонтаж. Все права защищены.</p>
        </footer>
      </div>
    </main>
  );
}
