"use client";

import { useEffect, useRef, useState } from "react";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/mytabi-mediakit" : "";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

/* Decorative leaf SVG */
function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="currentColor" opacity="0.15">
      <path d="M20 2C20 2 8 12 8 24c0 6.627 5.373 12 12 12s12-5.373 12-12C32 12 20 2 20 2zM20 32c-4.418 0-8-3.582-8-8 0-7.2 6-14.4 8-17 2 2.6 8 9.8 8 17 0 4.418-3.582 8-8 8z" />
    </svg>
  );
}

/* Decorative cloud SVG */
function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 50" className={className} fill="currentColor" opacity="0.08">
      <ellipse cx="60" cy="30" rx="50" ry="18" />
      <ellipse cx="35" cy="22" rx="25" ry="15" />
      <ellipse cx="85" cy="22" rx="25" ry="15" />
      <ellipse cx="55" cy="15" rx="30" ry="15" />
    </svg>
  );
}

/* Section divider */
function Divider() {
  return <hr className="ghibli-divider max-w-xs mx-auto my-0" />;
}

/* ============================================================
   Navigation
   ============================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "myTabiとは", href: "#about" },
    { label: "できること", href: "#services" },
    { label: "よくあるご質問", href: "#faq" },
    { label: "お問い合わせ", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/95 backdrop-blur-md shadow-sm shadow-bark-200/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className={`font-serif text-2xl font-bold transition-colors ${
            scrolled ? "text-forest-700" : "text-cream-50"
          }`}
        >
          myTabi
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-forest-500 ${
                scrolled ? "text-bark-600" : "text-cream-100/90"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${scrolled ? "text-bark-800" : "text-cream-50"}`}
          aria-label="メニュー"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-cream-50/95 backdrop-blur-md border-t border-cream-300">
          <div className="px-6 py-4 space-y-4">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-bark-700 text-sm font-medium hover:text-forest-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80"
          alt="日本の風景"
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/50 via-bark-900/30 to-forest-900/60" />
      </div>

      {/* Decorative floating elements */}
      <Cloud className="absolute top-20 left-10 w-40 text-cream-100 animate-drift" />
      <Cloud className="absolute top-32 right-16 w-32 text-cream-100 animate-drift delay-300" />
      <Leaf className="absolute bottom-32 left-16 w-10 text-forest-300 animate-sway" />
      <Leaf className="absolute top-40 right-20 w-8 text-forest-300 animate-sway delay-200" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-cream-200/60 overflow-hidden shadow-2xl mb-6">
            <img
              src={`${BASE_PATH}/profile-2.jpg`}
              alt="myTabi プロフィール"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-earth-300 tracking-[0.3em] uppercase text-sm font-medium mb-4">
          Inbound Travel Influencer &amp; Tour Guide
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-cream-50 mb-6 tracking-tight">
          myTabi
        </h1>
        <p className="text-cream-100/95 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-4 text-balance">
          日本の魅力を、世界へ届ける。
        </p>
        <p className="text-cream-200/80 text-base font-light max-w-xl mx-auto leading-relaxed mb-12">
          数万人の外国人観光客を案内してきたプロのツアーガイドが、
          <br className="hidden md:block" />
          SNSを通じて日本の魅力を世界へ発信します。
        </p>

        <a
          href="#about"
          className="inline-block bg-forest-600/90 hover:bg-forest-600 text-cream-50 font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-forest-700/30 tracking-wide text-sm"
        >
          詳しくはこちら
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-cream-100/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

/* ============================================================
   About — myTabiとは
   ============================================================ */
const profileStats = [
  { value: "5年+", label: "ガイド歴" },
  { value: "数万人", label: "案内実績" },
  { value: "3ヶ国語", label: "対応言語" },
];

function About() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} id="about" className="py-28 bg-cream-50 watercolor-bg relative overflow-hidden">
      <Leaf className="absolute top-10 right-10 w-16 text-forest-400 animate-sway opacity-10" />
      <Leaf className="absolute bottom-20 left-8 w-12 text-forest-400 animate-sway delay-300 opacity-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-forest-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            About
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-bark-800 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            myTabi とは
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={isInView ? "animate-slide-in-left" : "opacity-0"}>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-bark-800 mb-6 leading-tight">
              東京を拠点に、
              <br />
              日本の魅力を世界へ。
            </h3>
            <div className="space-y-4 text-bark-600 leading-relaxed">
              <p>
                本業はインバウンド向けバスツアーのガイド。5年以上にわたり、数万人以上の外国人観光客を日本各地へご案内してきました。
              </p>
              <p>
                現場で培った「外国人旅行者が本当に求めているもの」「何に感動し、何をシェアしたくなるか」というリアルな知見を活かし、SNSを通じて日本の観光地・ホテル・グルメ・文化体験を世界へ発信しています。
              </p>
              <p>
                英語・韓国語・中国語に対応。多言語でのコンテンツ制作が可能なため、欧米圏だけでなくアジア圏のインバウンド旅行者にも幅広くリーチできます。
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {profileStats.map((s) => (
                <div key={s.label} className="bg-cream-100 border border-cream-300 rounded-xl p-4 text-center">
                  <p className="font-serif text-xl font-bold text-forest-600">{s.value}</p>
                  <p className="text-bark-500 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-bark-400 uppercase tracking-wide mr-1">対応言語:</span>
                {["English", "한국어", "中文", "日本語"].map((lang) => (
                  <span
                    key={lang}
                    className="text-xs font-medium bg-forest-50 text-forest-700 border border-forest-200 px-3 py-1 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-bark-400 uppercase tracking-wide mr-1">SNS:</span>
                {["Instagram", "TikTok"].map((platform) => (
                  <span
                    key={platform}
                    className="text-xs font-medium bg-earth-50 text-earth-700 border border-earth-200 px-3 py-1 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`relative ${isInView ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 row-span-2">
                <img
                  src={`${BASE_PATH}/profile-2.jpg`}
                  alt="myTabi"
                  className="rounded-2xl shadow-xl w-full h-full object-cover border-2 border-cream-200"
                />
              </div>
              <div className="col-span-2">
                <img
                  src={`${BASE_PATH}/profile-1.jpg`}
                  alt="myTabi 着物"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover border-2 border-cream-200"
                />
              </div>
              <div className="col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80"
                  alt="京都"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover border-2 border-cream-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Stats
   ============================================================ */
const stats = [
  { label: "フォロワー数", value: "37万+", sub: "Instagram 25万 / TikTok 12万" },
  { label: "月間再生回数", value: "5,000万+", sub: "Instagram 3,500万 / TikTok 1,500万" },
  { label: "リーチ国数", value: "45+", sub: "カ国" },
  { label: "投稿年数", value: "5年", sub: "コンテンツ制作実績" },
];

function Stats() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-20 bg-forest-800 text-cream-50 relative overflow-hidden">
      <Cloud className="absolute top-4 left-10 w-48 text-cream-100 opacity-5" />
      <Cloud className="absolute bottom-2 right-8 w-36 text-cream-100 opacity-5" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center ${isInView ? "animate-count-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <p className="font-serif text-4xl md:text-5xl font-bold text-earth-300 mb-2">
                {s.value}
              </p>
              <p className="text-cream-100 font-semibold text-sm tracking-wide">
                {s.label}
              </p>
              <p className="text-forest-300 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Services — できること
   ============================================================ */
const platformCards = [
  {
    name: "Instagram",
    followers: "25万",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    ),
    mainService: "リール動画作成",
    mainPrice: "¥250,000",
    priceNote: "25万フォロワー × 1円",
    options: [
      { service: "ストーリーズ追加", price: "+¥50,000〜" },
      { service: "フィード投稿追加", price: "+¥50,000〜" },
    ],
  },
  {
    name: "TikTok",
    followers: "12万",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.1a8.16 8.16 0 005.58 2.17V11.3a4.85 4.85 0 01-3.77-1.84v-.01l-.23-.2V6.69z"/></svg>
    ),
    mainService: "動画作成",
    mainPrice: "¥120,000",
    priceNote: "12万フォロワー × 1円",
    options: [
      { service: "ストーリーズ追加", price: "+¥50,000〜" },
    ],
  },
];

function Services() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} id="services" className="py-28 bg-cream-100/50 watercolor-bg relative overflow-hidden">
      <Leaf className="absolute top-16 left-6 w-10 text-forest-400 animate-float opacity-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-6">
          <p className="text-forest-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Services &amp; Pricing
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-bark-800 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            SNS投稿によるPR
          </h2>
        </div>
        <p
          className={`text-center text-bark-500 max-w-2xl mx-auto mb-6 ${isInView ? "animate-fade-in-up delay-100" : "opacity-0"}`}
        >
          各プラットフォームでの投稿を通じて、インバウンド旅行者への認知拡大と購買意欲の向上を実現します。
          <br />
          英語・韓国語・中国語のキャプション付きで海外フォロワーへ直接リーチ。
        </p>

        {/* Pricing formula */}
        <div className={`flex items-center justify-center gap-3 mb-16 ${isInView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          <div className="bg-forest-800 text-cream-50 rounded-full px-6 py-2.5 flex items-center gap-3 text-sm font-medium shadow-md">
            <span>料金の考え方</span>
            <span className="text-earth-300 font-serif font-bold text-base">1フォロワー = 1円 / 1案件</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {platformCards.map((p, i) => (
            <div
              key={p.name}
              className={`bg-cream-50 border border-cream-300 rounded-2xl overflow-hidden hover:border-forest-300 hover:shadow-lg hover:shadow-forest-100/50 transition-all duration-300 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(i + 2) * 0.15}s` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="text-forest-600">{p.icon}</div>
                  <h3 className="font-serif text-2xl font-bold text-bark-800">{p.name}</h3>
                </div>
                <span className="text-xs font-medium bg-forest-50 text-forest-700 border border-forest-200 px-3 py-1 rounded-full">
                  {p.followers} フォロワー
                </span>
              </div>

              {/* Main service + price */}
              <div className="px-8 py-6 bg-forest-50/50 border-y border-cream-200">
                <p className="text-bark-500 text-sm font-medium mb-1">{p.mainService}</p>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold text-forest-700">{p.mainPrice}</span>
                  <span className="text-bark-400 text-xs">/ 1本</span>
                </div>
                <p className="text-bark-400 text-xs mt-2">{p.priceNote}</p>
              </div>

              {/* Options */}
              <div className="px-8 pt-5 pb-6">
                <p className="text-bark-400 text-xs font-semibold uppercase tracking-wider mb-3">オプション</p>
                <div className="space-y-2.5">
                  {p.options.map((opt) => (
                    <div key={opt.service} className="flex items-center justify-between">
                      <span className="text-bark-600 text-sm">{opt.service}</span>
                      <span className="font-semibold text-forest-600 text-sm">{opt.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-bark-400 text-xs mt-5 pt-4 border-t border-cream-200">※ 交通費は別途実費精算</p>
              </div>
            </div>
          ))}
        </div>

        <p
          className={`text-center text-bark-400 text-xs mt-8 ${isInView ? "animate-fade-in-up delay-400" : "opacity-0"}`}
        >
          ※ 上記以外のカスタムプランもご相談ください。複数投稿のセット割引もございます。
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Results — 実際のPR効果
   ============================================================ */
const results = [
  {
    metric: "リール最高再生数",
    highlight: "1,500万+",
    desc: "旅館のPRリール動画が1,500万回再生を突破。投稿後1週間でクライアントの公式サイトアクセスが約5倍に増加し、海外からの予約問い合わせが急増しました。",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    metric: "海外予約問い合わせ",
    highlight: "3倍",
    desc: "ホテル・観光施設のPR投稿後、海外からの直接予約・問い合わせ数が平均3倍に増加。英語・韓国語・中国語でのキャプションにより、欧米圏・アジア圏の両方から反応を獲得。",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    metric: "海外ユーザー比率",
    highlight: "50%+",
    desc: "フォロワーの約半数が海外ユーザー。アメリカ・韓国・台湾・オーストラリアを中心に45カ国以上にリーチ。ツアーガイドとして培った多言語力で、ターゲットに刺さるコンテンツを制作。",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
  },
];

function Results() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} id="results" className="py-28 bg-cream-100/50 watercolor-bg relative overflow-hidden">
      <Leaf className="absolute bottom-16 right-10 w-14 text-forest-400 animate-float opacity-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-forest-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Results
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-bark-800 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            実際のPR効果
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {results.map((r, i) => (
            <div
              key={r.metric}
              className={`relative bg-cream-50 border border-cream-300 rounded-2xl p-8 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-forest-50 text-forest-600 rounded-full flex items-center justify-center border border-forest-200">
                  {r.icon}
                </div>
                <span className="text-sm font-semibold text-bark-500 tracking-wide">
                  {r.metric}
                </span>
              </div>
              <p className="font-serif text-5xl font-bold text-forest-600 mb-4">
                {r.highlight}
              </p>
              <p className="text-bark-500 text-sm leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Posts — myTabi の投稿
   ============================================================ */
const snsLinks = [
  {
    name: "Instagram",
    handle: "@mytabi_travel",
    url: "https://www.instagram.com/mytabi_travel/",
    followers: "25万フォロワー",
    desc: "旅館・ホテル・観光地・グルメなど、日本各地の魅力をリール動画やフィード投稿で発信中。",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@mytabi_travel",
    url: "https://www.tiktok.com/@mytabi_travel",
    followers: "12万フォロワー",
    desc: "日本の旅行スポットをショート動画で紹介。トレンドを押さえた動画で訪日意欲を刺激します。",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.1a8.16 8.16 0 005.58 2.17V11.3a4.85 4.85 0 01-3.77-1.84v-.01l-.23-.2V6.69z"/></svg>
    ),
  },
];

function Posts() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-28 bg-cream-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-6">
          <p className="text-forest-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Posts
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-bark-800 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            myTabi の投稿
          </h2>
        </div>
        <p className={`text-center text-bark-500 max-w-xl mx-auto mb-14 ${isInView ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
          実際の投稿は各SNSアカウントからご覧いただけます。
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {snsLinks.map((s, i) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-cream-100 border border-cream-300 rounded-2xl p-8 hover:border-forest-300 hover:shadow-lg hover:shadow-forest-100/50 transition-all duration-300 block ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-forest-50 text-forest-600 rounded-xl flex items-center justify-center border border-forest-200 group-hover:bg-forest-100 transition-colors">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-bark-800">{s.name}</h3>
                  <p className="text-forest-600 text-sm font-medium">{s.handle}</p>
                </div>
              </div>
              <p className="text-bark-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium bg-forest-50 text-forest-700 border border-forest-200 px-3 py-1 rounded-full">
                  {s.followers}
                </span>
                <span className="text-forest-500 text-sm font-medium group-hover:text-forest-700 transition-colors flex items-center gap-1">
                  投稿を見る
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ — よくあるご質問
   ============================================================ */
const faqs = [
  {
    q: "どんな費用が発生しますか？",
    a: "基本料金は「1フォロワー × 1円 / 1案件」です。これにストーリーズやフィード投稿などのオプション料金、交通費（実費精算）が加わります。初期費用やアカウント開設料は一切かかりません。",
  },
  {
    q: "対応している言語を教えてください",
    a: "英語・韓国語・中国語・日本語の4言語に対応しています。キャプションはターゲット層に合わせた言語で制作し、日本語も併記するマルチリンガル形式です。欧米圏・アジア圏の両方へリーチできます。",
  },
  {
    q: "どのSNSプラットフォームに対応していますか？",
    a: "Instagram と TikTok をメインに対応しています。リール動画・ショート動画を中心に、ストーリーズやフィード投稿も可能です。",
  },
  {
    q: "カスタムプランは可能ですか？",
    a: "はい、ご要望に応じて柔軟にカスタマイズいたします。複数投稿のセットプラン、Instagram + TikTok の同時展開、長期契約による継続PRなど、目的や予算に合わせたプランをご提案可能です。",
  },
  {
    q: "投稿内容は事前に確認できますか？",
    a: "はい、投稿前にキャプション・動画の内容をご確認いただけます。修正のフィードバックも1回まで対応可能です。投稿後の内容変更は原則お受けできませんので、事前にしっかりご確認ください。",
  },
  {
    q: "依頼から投稿までの流れを教えてください",
    a: "お問い合わせ → ヒアリング・企画提案 → 撮影・制作 → 内容確認 → 投稿・レポート提出、の流れです。通常、ご依頼から投稿まで約2〜3週間ほどいただいております。",
  },
  {
    q: "地方への訪問撮影も可能ですか？",
    a: "はい、日本全国どこでも対応いたします。東京近郊以外の場合は、交通費に加えて宿泊費が別途発生する場合がございます。",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-cream-300 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-semibold text-bark-700 text-base pr-4 group-hover:text-forest-600 transition-colors">
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-bark-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 pb-6" : "max-h-0"}`}
      >
        <p className="text-bark-500 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function Faq() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} id="faq" className="py-28 bg-cream-100/50 watercolor-bg relative overflow-hidden">
      <Leaf className="absolute top-20 right-12 w-10 text-forest-400 animate-sway opacity-10" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-forest-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            FAQ
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-bark-800 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            よくあるご質問
          </h2>
        </div>

        <div className={`bg-cream-50 border border-cream-300 rounded-2xl px-8 ${isInView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Thoughts — myTabi の想い
   ============================================================ */
function Thoughts() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-28 bg-cream-50 relative overflow-hidden">
      <Cloud className="absolute top-8 left-8 w-40 text-forest-300 opacity-5" />
      <Leaf className="absolute bottom-12 right-16 w-14 text-earth-400 animate-float opacity-10" />
      <Leaf className="absolute top-24 left-20 w-8 text-forest-400 animate-sway delay-400 opacity-10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-forest-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Our Story
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-bark-800 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          >
            〜 myTabi の想い 〜
          </h2>
        </div>

        <div className={`${isInView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          <div className="bg-cream-100 border border-cream-300 rounded-2xl p-8 md:p-12">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-forest-200">
                <img
                  src={`${BASE_PATH}/profile-2.jpg`}
                  alt="myTabi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-5 text-bark-600 leading-relaxed text-sm md:text-base">
              <p>
                インバウンド向けバスツアーのガイドとして、5年以上にわたり数万人以上の外国人観光客を日本各地へ案内してきました。毎日のようにお客様と接する中で、「日本のどこに感動するのか」「何を写真に撮り、何をSNSでシェアしたくなるのか」を肌で感じてきました。
              </p>
              <p>
                一方で、日本にはまだまだ世界に知られていない素晴らしい場所がたくさんあることにも気づきました。言語の壁やSNSでの発信不足により、本当に素敵な観光地や体験が海外の旅行者に届いていない。
              </p>
              <p>
                「ガイドとして現場で得たリアルな知見を、SNSを通じてもっと多くの人に届けたい」—その想いから、myTabiの活動をスタートしました。
              </p>
              <p>
                英語・韓国語・中国語の多言語で、観光地・ホテル・旅館・グルメ・文化体験を世界中の旅行者に発信し、「日本に行ってみたい」という気持ちを一人でも多くの方に届けたい。そして、日本各地の観光業の力になりたいと考えています。
              </p>
              <p className="text-bark-800 font-medium italic">
                ガイドの現場とSNSの発信力。この両方を持つからこそ、届けられる日本の魅力があると信じています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Contact — お問い合わせ
   ============================================================ */
function Contact() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} id="contact" className="py-28 bg-forest-800 text-cream-50 relative overflow-hidden">
      <Cloud className="absolute top-6 left-6 w-48 text-cream-100 opacity-5" />
      <Cloud className="absolute bottom-10 right-10 w-36 text-cream-100 opacity-5" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <p className="text-earth-300 tracking-[0.2em] uppercase text-xs font-semibold mb-4">
          Contact
        </p>
        <h2
          className={`font-serif text-3xl md:text-4xl font-bold mb-6 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          お問い合わせ
        </h2>
        <p
          className={`text-forest-200 mb-12 leading-relaxed ${isInView ? "animate-fade-in-up delay-200" : "opacity-0"}`}
        >
          お問い合わせやご相談などございましたら、
          <br className="hidden md:block" />
          お気軽にご連絡ください。
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 ${isInView ? "animate-fade-in-up delay-300" : "opacity-0"}`}
        >
          <a
            href="mailto:mytabi.travel@gmail.com"
            className="flex items-center gap-3 bg-earth-400 hover:bg-earth-500 rounded-full px-8 py-4 transition-all duration-300 shadow-lg text-cream-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold">お問い合わせはこちら</span>
          </a>
        </div>

        <div
          className={`flex items-center justify-center gap-6 ${isInView ? "animate-fade-in-up delay-400" : "opacity-0"}`}
        >
          <a href="https://www.instagram.com/mytabi_travel/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cream-50/10 hover:bg-cream-50/20 rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@mytabi_travel" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cream-50/10 hover:bg-cream-50/20 rounded-full flex items-center justify-center transition-colors" aria-label="TikTok">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.1a8.16 8.16 0 005.58 2.17V11.3a4.85 4.85 0 01-3.77-1.84v-.01l-.23-.2V6.69z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="py-8 bg-forest-900 border-t border-forest-700/30">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-forest-400 text-xs">
          &copy; {new Date().getFullYear()} myTabi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   Main Page
   ============================================================ */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Stats />
      <Divider />
      <Services />
      <Results />
      <Divider />
      <Posts />
      <Faq />
      <Thoughts />
      <Contact />
      <Footer />
    </>
  );
}
