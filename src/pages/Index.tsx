import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/73297232-3cfd-413a-bf1f-b7317e796c31/files/d896a726-c852-4cd5-ab63-654e4d01db35.jpg";
const MENU_IMG = "https://cdn.poehali.dev/projects/73297232-3cfd-413a-bf1f-b7317e796c31/files/7978d830-d845-4435-9e1c-eb94fc3e28fc.jpg";
const EVENT_IMG = "https://cdn.poehali.dev/projects/73297232-3cfd-413a-bf1f-b7317e796c31/files/a43ff229-46a9-4c0e-b164-cec154166bd1.jpg";

const snowflakes = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.6) % 100}%`,
  size: `${(i % 3) * 6 + 10}px`,
  duration: `${(i % 5) * 2 + 7}s`,
  delay: `${(i % 8) * 1.2}s`,
  opacity: 0.2 + (i % 5) * 0.1,
}));

const menuItems = [
  {
    category: "Закуски", emoji: "🥗", items: [
      { name: "Салат «Новогодний»", desc: "Крабовое мясо, икра, авокадо", price: "490 ₽" },
      { name: "Карпаччо из говядины", desc: "Трюфельное масло, пармезан, руккола", price: "620 ₽" },
      { name: "Тартар из лосося", desc: "Каперсы, лимонный крем, тосты", price: "580 ₽" },
    ]
  },
  {
    category: "Горячее", emoji: "🍖", items: [
      { name: "Утиная грудка", desc: "Апельсиновый соус, печёный картофель", price: "890 ₽" },
      { name: "Рибай на углях", desc: "Соус из красного вина, спаржа", price: "1290 ₽" },
      { name: "Сёмга в сливочном соусе", desc: "Шпинат, лимон, каперсы", price: "790 ₽" },
    ]
  },
  {
    category: "Десерты", emoji: "🎂", items: [
      { name: "Торт «Ёлочка»", desc: "Фисташковый мусс, малиновое желе", price: "380 ₽" },
      { name: "Шоколадный фондан", desc: "Ванильное мороженое, малина", price: "340 ₽" },
      { name: "Ассорти макарон", desc: "6 видов, сезонные вкусы", price: "290 ₽" },
    ]
  },
  {
    category: "Напитки", emoji: "🥂", items: [
      { name: "Глинтвейн «Зимний»", desc: "Пряное красное вино, апельсин", price: "290 ₽" },
      { name: "Шампанское Brut", desc: "Бокал / бутылка", price: "350 / 2400 ₽" },
      { name: "Горячий шоколад", desc: "Бельгийский, с маршмеллоу", price: "220 ₽" },
    ]
  },
];

const events = [
  {
    icon: "🎅",
    title: "Новогодняя ночь",
    date: "31 декабря",
    desc: "Торжественный банкет с живой музыкой, шоу-программой и встречей нового года. Лимитированное количество мест.",
    price: "от 3 500 ₽/чел",
    tag: "Хит продаж",
  },
  {
    icon: "🎄",
    title: "Корпоратив",
    date: "Декабрь–Январь",
    desc: "Организуем незабываемый корпоративный вечер для вашей команды: ужин, конкурсы, тосты и праздничное настроение.",
    price: "от 1 800 ₽/чел",
    tag: "Групповое",
  },
  {
    icon: "🎁",
    title: "Рождественский ужин",
    date: "7 января",
    desc: "Уютный семейный ужин в рождественской атмосфере. Специальное детское меню и подарки от Деда Мороза.",
    price: "от 1 200 ₽/чел",
    tag: "Семейное",
  },
];

const gallery = [
  { src: HERO_IMG, title: "Праздничный зал" },
  { src: MENU_IMG, title: "Новогодний банкет" },
  { src: EVENT_IMG, title: "Встреча Нового года" },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </section>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #d4a843, transparent)" }} />
      <span style={{ color: "#d4a843" }} className="text-xl">✦</span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #d4a843, transparent)" }} />
    </div>
  );
}

export default function Index() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ background: "#0d0608", color: "white", fontFamily: "'Golos Text', sans-serif" }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { transform: translateY(102vh) rotate(360deg); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,67,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(212,168,67,0); }
        }
        .snowflake { position: absolute; top: -20px; animation: snowfall linear infinite; pointer-events: none; user-select: none; }
        .shimmer-text { background: linear-gradient(135deg, #d4a843, #f5d89a, #d4a843); background-size: 200%; animation: shimmer 3s linear infinite; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .float { animation: float 3s ease-in-out infinite; }
        .pulse-gold { animation: pulse-gold 2s infinite; }
        .cormorant { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* Snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {snowflakes.map((s) => (
          <div
            key={s.id}
            className="snowflake"
            style={{ left: s.left, fontSize: s.size, animationDuration: s.duration, animationDelay: s.delay, opacity: s.opacity, color: "#c0c0d0" }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(13,6,8,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(212,168,67,0.2)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="cormorant text-2xl font-semibold tracking-wider" style={{ color: "#d4a843" }}>
            Школа <span style={{ color: "#c0394b" }}>16</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {[["hero", "Главная"], ["about", "О нас"], ["menu", "Меню"], ["events", "Мероприятия"], ["gallery", "Галерея"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm tracking-wide uppercase transition-colors duration-300 hover:opacity-100" style={{ color: "#c0c0d0", letterSpacing: "0.08em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#d4a843")}
                onMouseLeave={e => (e.currentTarget.style.color = "#c0c0d0")}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="md:hidden" style={{ color: "#d4a843" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: "rgba(13,6,8,0.98)", borderTop: "1px solid rgba(212,168,67,0.2)" }}>
            {[["hero", "Главная"], ["about", "О нас"], ["menu", "Меню"], ["events", "Мероприятия"], ["gallery", "Галерея"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-1 transition-colors" style={{ color: "#c0c0d0" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,6,8,0.65) 0%, rgba(13,6,8,0.45) 50%, rgba(13,6,8,1) 100%)" }} />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm tracking-widest uppercase pulse-gold" style={{ border: "1px solid rgba(212,168,67,0.5)", color: "#d4a843", letterSpacing: "0.15em" }}>
            ✨ Новый год 2025 ✨
          </div>
          <h1 className="cormorant font-bold leading-none mb-4" style={{ fontSize: "clamp(3.5rem, 10vw, 6rem)" }}>
            <span className="block text-white">Ресторан</span>
            <span className="shimmer-text block">Школа 16</span>
          </h1>
          <p className="cormorant text-xl md:text-2xl italic mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(224,224,240,0.9)" }}>
            Волшебная новогодняя атмосфера, изысканная кухня и незабываемые вечера в самом сердце праздника
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("events")} className="px-8 py-4 font-semibold rounded-full tracking-wide transition-all duration-300 hover:scale-105 text-white" style={{ background: "linear-gradient(135deg, #8b1a2a, #c0394b)", boxShadow: "0 8px 30px rgba(139,26,42,0.4)" }}>
              🎄 Забронировать стол
            </button>
            <button onClick={() => scrollTo("menu")} className="px-8 py-4 font-semibold rounded-full tracking-wide transition-all duration-300 hover:scale-105" style={{ border: "1px solid rgba(212,168,67,0.6)", color: "#d4a843", background: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,168,67,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              Смотреть меню
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 float" style={{ color: "rgba(212,168,67,0.5)" }}>
          <Icon name="ChevronDown" size={32} />
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#d4a843", letterSpacing: "0.15em" }}>О нас</p>
              <h2 className="cormorant font-bold text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                Место, где рождается<br />
                <span className="italic" style={{ color: "#d4a843" }}>волшебство</span>
              </h2>
              <GoldDivider />
              <p className="leading-relaxed text-lg mb-6" style={{ color: "#c0c0d0" }}>
                Ресторан «Школа 16» — это уютное пространство с богатой историей и современным видением праздника. Мы создаём особую атмосферу, в которой каждый гость чувствует себя частью настоящей новогодней сказки.
              </p>
              <p className="leading-relaxed text-lg mb-8" style={{ color: "#c0c0d0" }}>
                Наши шеф-повара готовят блюда только из свежих сезонных продуктов, а интерьер зала наполнен живой хвоей, золотыми украшениями и мягким светом сотен свечей.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[["200+", "блюд в меню"], ["15", "лет традиций"], ["500", "довольных гостей"]].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div className="cormorant font-bold" style={{ fontSize: "2.5rem", color: "#d4a843" }}>{num}</div>
                    <div className="text-sm mt-1" style={{ color: "#8888a0" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl blur-xl" style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.2), rgba(139,26,42,0.1))" }} />
              <img src={HERO_IMG} alt="Интерьер ресторана" className="relative rounded-2xl w-full object-cover" style={{ height: "24rem", border: "1px solid rgba(212,168,67,0.2)" }} />
              <div className="absolute -bottom-4 -right-4 px-5 py-3 rounded-xl shadow-lg" style={{ background: "#8b1a2a" }}>
                <p className="cormorant text-2xl font-bold text-white">С 2010</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>Работаем для вас</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MENU */}
      <section id="menu" style={{ background: "linear-gradient(to bottom, #0d0608, #120508, #0d0608)" }} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#d4a843", letterSpacing: "0.15em" }}>Наше меню</p>
              <h2 className="cormorant font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                Праздничная <span className="italic" style={{ color: "#d4a843" }}>кулинария</span>
              </h2>
              <p style={{ color: "#c0c0d0" }} className="max-w-xl mx-auto">Авторские блюда, вдохновлённые зимними традициями и новогодним волшебством</p>
            </div>
          </Section>

          <Section>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {menuItems.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMenu(i)}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                  style={activeMenu === i
                    ? { background: "linear-gradient(135deg, #8b1a2a, #c0394b)", color: "white", boxShadow: "0 8px 20px rgba(139,26,42,0.3)", transform: "scale(1.05)" }
                    : { border: "1px solid rgba(212,168,67,0.3)", color: "#c0c0d0", background: "transparent" }
                  }
                >
                  {cat.emoji} {cat.category}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {menuItems[activeMenu].items.map((item, i) => (
                <div key={i} className="group relative rounded-2xl p-6 transition-all duration-300" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,168,67,0.15)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,67,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,67,0.15)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                >
                  <h3 className="cormorant text-xl font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "#8888a0" }}>{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg" style={{ color: "#d4a843" }}>{item.price}</span>
                    <button className="text-xs px-3 py-1 rounded-full transition-colors" style={{ border: "1px solid rgba(212,168,67,0.3)", color: "#d4a843" }}>
                      В заказ
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center mt-10 text-sm" style={{ color: "#8888a0" }}>
              Полное меню доступно в ресторане • Сезонные специальные предложения уточняйте у хостес
            </p>
          </Section>

          <Section className="mt-16">
            <div className="relative rounded-3xl overflow-hidden">
              <img src={MENU_IMG} alt="Праздничный стол" className="w-full object-cover" style={{ height: "18rem" }} />
              <div className="absolute inset-0 flex items-center px-12" style={{ background: "linear-gradient(to right, rgba(13,6,8,0.9) 40%, transparent 100%)" }}>
                <div>
                  <p className="text-sm tracking-wider uppercase mb-2" style={{ color: "#d4a843" }}>Специальное предложение</p>
                  <h3 className="cormorant font-bold text-white mb-3" style={{ fontSize: "2.2rem" }}>
                    Банкетное меню<br /><span style={{ color: "#d4a843" }}>от 2 500 ₽/чел</span>
                  </h3>
                  <p className="max-w-xs mb-6 text-sm" style={{ color: "#c0c0d0" }}>5 блюд + напитки + торт + праздничное оформление стола</p>
                  <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 font-bold rounded-full transition-colors" style={{ background: "#d4a843", color: "#0d0608" }}>
                    Узнать подробнее
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#d4a843", letterSpacing: "0.15em" }}>Мероприятия</p>
              <h2 className="cormorant font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                Праздничные <span className="italic" style={{ color: "#d4a843" }}>события</span>
              </h2>
              <p style={{ color: "#c0c0d0" }} className="max-w-xl mx-auto">Создаём особые моменты, которые остаются в памяти навсегда</p>
            </div>
          </Section>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <Section key={i}>
                <div className="relative rounded-3xl p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-2" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.02))", border: "1px solid rgba(212,168,67,0.2)" }}>
                  <div className="absolute top-4 right-4 text-white text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "#8b1a2a" }}>
                    {event.tag}
                  </div>
                  <div className="text-5xl mb-6">{event.icon}</div>
                  <h3 className="cormorant text-2xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-sm mb-4 flex items-center gap-1" style={{ color: "#d4a843" }}>
                    <Icon name="Calendar" size={14} />
                    {event.date}
                  </p>
                  <p className="leading-relaxed mb-6 flex-1" style={{ color: "#c0c0d0" }}>{event.desc}</p>
                  <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(212,168,67,0.2)" }}>
                    <span className="cormorant text-xl font-semibold" style={{ color: "#d4a843" }}>{event.price}</span>
                    <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })} className="px-4 py-2 text-sm rounded-full transition-colors text-white" style={{ background: "#8b1a2a" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#c0394b")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#8b1a2a")}
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </Section>
            ))}
          </div>

          <Section className="mt-16">
            <div className="relative rounded-3xl p-10 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, #5c0f1a, #8b1a2a, #5c0f1a)" }}>
              <div className="relative">
                <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.15em" }}>🎁 Подарок каждому гостю</p>
                <h3 className="cormorant font-bold text-white mb-4" style={{ fontSize: "2.2rem" }}>Корпоративные скидки до 20%</h3>
                <p className="max-w-lg mx-auto mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>При бронировании от 20 человек — специальные условия, персональный менеджер и уникальная программа вечера</p>
                <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 font-bold rounded-full transition-all duration-300 hover:scale-105" style={{ background: "#d4a843", color: "#0d0608" }}>
                  Получить предложение
                </button>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24" style={{ background: "#080306" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#d4a843", letterSpacing: "0.15em" }}>Фотогалерея</p>
              <h2 className="cormorant font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                Атмосфера <span className="italic" style={{ color: "#d4a843" }}>праздника</span>
              </h2>
            </div>
          </Section>
          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((item, i) => (
              <Section key={i}>
                <div className="group relative overflow-hidden rounded-2xl transition-all duration-500" style={{ border: "1px solid rgba(212,168,67,0.15)" }}>
                  <img src={item.src} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ height: "18rem" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,6,8,0.8) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="cormorant text-xl font-semibold text-white">{item.title}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#d4a843", letterSpacing: "0.15em" }}>Контакты</p>
              <h2 className="cormorant font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                Свяжитесь <span className="italic" style={{ color: "#d4a843" }}>с нами</span>
              </h2>
              <p style={{ color: "#c0c0d0" }} className="max-w-md mx-auto">Забронируйте столик или уточните детали предстоящего мероприятия</p>
            </div>
          </Section>

          <div className="grid md:grid-cols-2 gap-12">
            <Section>
              <div className="space-y-6">
                {[
                  { icon: "MapPin", label: "Адрес", value: "ул. Ивана Виноградова, д. 18" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "info@shkola16.ru" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Вс: 12:00 – 23:00" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors" style={{ border: "1px solid rgba(212,168,67,0.3)", color: "#d4a843" }}>
                      <Icon name={item.icon as "MapPin"} size={20} />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wide mb-1" style={{ color: "#8888a0" }}>{item.label}</p>
                      <p className="text-white font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
                <GoldDivider />
                <div className="flex gap-4 flex-wrap">
                  {[{ icon: "📱", label: "VK" }, { icon: "✈️", label: "Telegram" }, { icon: "📸", label: "Instagram" }].map((s) => (
                    <button key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all" style={{ border: "1px solid rgba(212,168,67,0.3)", color: "#c0c0d0" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#d4a843"; (e.currentTarget as HTMLElement).style.color = "#d4a843"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,67,0.3)"; (e.currentTarget as HTMLElement).style.color = "#c0c0d0"; }}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </Section>

            <Section>
              <form className="rounded-3xl p-8 space-y-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,168,67,0.2)" }}>
                <h3 className="cormorant text-2xl font-bold text-white mb-2">Оставить заявку</h3>
                <p className="text-sm mb-6" style={{ color: "#8888a0" }}>Мы перезвоним в течение 30 минут</p>
                {[
                  { label: "Ваше имя", type: "text", placeholder: "Александр" },
                  { label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-sm mb-2 block" style={{ color: "#c0c0d0" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} className="w-full rounded-xl px-4 py-3 text-white focus:outline-none transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,168,67,0.2)", color: "white" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.6)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)")}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm mb-2 block" style={{ color: "#c0c0d0" }}>Мероприятие</label>
                  <select className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors" style={{ background: "#1a0810", border: "1px solid rgba(212,168,67,0.2)", color: "white" }}>
                    <option value="">Выберите тип</option>
                    <option>Новогодняя ночь</option>
                    <option>Корпоратив</option>
                    <option>Рождественский ужин</option>
                    <option>Просто ужин</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-2 block" style={{ color: "#c0c0d0" }}>Комментарий</label>
                  <textarea placeholder="Количество гостей, пожелания..." rows={3} className="w-full rounded-xl px-4 py-3 text-white focus:outline-none transition-colors resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,168,67,0.2)" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.6)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)")}
                  />
                </div>
                <button type="submit" className="w-full py-4 font-semibold rounded-xl tracking-wide transition-all duration-300 hover:scale-[1.02] text-white" style={{ background: "linear-gradient(135deg, #8b1a2a, #c0394b)", boxShadow: "0 8px 25px rgba(139,26,42,0.3)" }}>
                  🎄 Отправить заявку
                </button>
              </form>
            </Section>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 text-center">
          <p className="text-sm" style={{ color: "#8888a0" }}>
            Создатели: <span style={{ color: "#c0c0d0" }}>Волков Платон, Сиберт Денис</span>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(212,168,67,0.15)" }}>
        <p className="cormorant text-2xl font-semibold mb-2" style={{ color: "#d4a843" }}>Ресторан «Школа 16»</p>
        <p className="text-sm mb-4" style={{ color: "#8888a0" }}>С Новым годом! 🎄 Пусть каждый вечер будет праздником</p>
        <GoldDivider />
        <p className="text-xs" style={{ color: "#8888a0" }}>© 2025 Ресторан Школа 16. Все права защищены.</p>
      </footer>
    </div>
  );
}