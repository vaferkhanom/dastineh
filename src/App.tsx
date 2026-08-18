import { useState } from 'react'
import { ArrowLeft, Home, Palette, PenTool, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react'
import Quiz from './Quiz'

const FEATURES = [
  { icon: <Palette size={22} />, title: 'سبک‌سنج هوشمند', desc: 'با یک پرسشنامه کوتاه، سبک دکوراسیون مورد علاقه‌ات رو دقیق شناسایی می‌کنیم.' },
  { icon: <ShoppingBag size={22} />, title: 'پیشنهاد محصولات', desc: '۳ تا ۵ محصول رتبه‌بندی‌شده در هر دسته، بر اساس سبک، رنگ، بودجه و متریال.' },
  { icon: <Home size={22} />, title: 'مودبورد منعطف', desc: 'فضای دلخواهت رو بساز، ویرایش کن و با خانواده یا طراحت به اشتراک بذار.' },
]

const STEPS = [
  { icon: <PenTool size={22} />, title: 'پرسشنامه', desc: '۵ سوال کوتاه درباره فضا، سبک، رنگ، بودجه و متریال.' },
  { icon: <Sparkles size={22} />, title: 'تحلیل هوشمند', desc: 'موتور پیشنهاد با وزن‌دهی سبک، رنگ و بودجه، نمایه‌ی سلیقه‌ات رو می‌سازه.' },
  { icon: <ShoppingBag size={22} />, title: 'خرید از فروشنده', desc: 'با قیمت و لینک مستقیم، مستقیم از فروشنده سفارش بده.' },
]

const HERO_IMG = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=70&auto=format&fit=crop'

export default function App() {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <>
      <div className="bg-aura" />
      <div className="bg-grain" />
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="brand">
            <span className="brand-mark"><Home size={18} /></span>
            دستینه
          </a>
          <div className="nav-links">
            <a href="#features">امکانات</a>
            <a href="#how">چطور کار می‌کنه</a>
            <a href="#quiz">سبک‌سنج</a>
          </div>
          <button className="nav-cta" onClick={() => setShowQuiz(true)}>
            شروع سبک‌سنجی
          </button>
        </div>
      </nav>

      {showQuiz ? (
        <main className="container" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <Quiz />
        </main>
      ) : (
        <main>
          {/* Hero */}
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <div className="hero-badge"><Sparkles size={14} /> پیشنهاد هوشمند دکوراسیون</div>
                <h1>
                  خونه‌ات رو با <span className="hint">سلیقه‌ی خودت</span> بچین
                </h1>
                <p className="hero-sub">
                  با یک پرسشنامه‌ی کوتاه، سبک دکوراسیون و محصولات مناسب فضای تو رو پیدا کن؛ از مبل و میز تا جزئیات — با پیشنهادهای رتبه‌بندی‌شده و لینک خرید مستقیم.
                </p>
                <div className="hero-actions">
                  <button className="btn btn-primary btn-lg" onClick={() => setShowQuiz(true)}>
                    شروع سبک‌سنجی <ArrowLeft size={18} />
                  </button>
                  <a href="#how" className="btn btn-ghost btn-lg">چطور کار می‌کنه؟</a>
                </div>
                <div className="hero-stats">
                  <div className="stat"><b>۳–۵</b><span>پیشنهاد در هر دسته</span></div>
                  <div className="stat"><b>٪۸۰+</b><span>دقت تشخیص سبک</span></div>
                  <div className="stat"><b>٪۳۰</b><span>وزن سبک در رتبه‌بندی</span></div>
                </div>
              </div>
              <div className="hero-visual">
                <div className="room-card">
                  <img className="room-img" src={HERO_IMG} alt="فضای نشیمن مدرن با دکوراسیون شیک" />
                  <span className="room-tag">نشیمن · سبک مدرن</span>
                  <div className="float-chip chip-1"><span className="chip-dot" /> تحلیل سلیقه انجام شد</div>
                  <div className="float-chip chip-2"><TrendingUp size={15} color="var(--accent-2)" /> ٪۹۴ مطابقت با نمایه‌ی تو</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="section" id="features">
            <div className="container">
              <div className="section-head">
                <div className="eyebrow">چرا دستینه؟</div>
                <h2>دکوراسیونی که با تو هم‌خوانی داره</h2>
                <p>ترکیب سبک‌سنجی دقیق، موتور پیشنهاد هوشمند و خرید مستقیم — برای اینکه خونه‌ات آینه‌ی سلیقه‌ات باشه.</p>
              </div>
              <div className="feature-grid">
                {FEATURES.map((f) => (
                  <div className="feature" key={f.title}>
                    <div className="feature-icon">{f.icon}</div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="section" id="how" style={{ background: 'var(--bg-soft)' }}>
            <div className="container">
              <div className="section-head">
                <div className="eyebrow">چطور کار می‌کنه</div>
                <h2>از سلیقه تا خرید، در ۳ قدم</h2>
              </div>
              <div className="steps">
                {STEPS.map((s, i) => (
                  <div className="step" key={s.title}>
                    <div className="step-num">{i + 1}</div>
                    <div className="feature-icon">{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quiz CTA */}
          <section className="section" id="quiz">
            <div className="container">
              <div className="cta-band">
                <h2>همین حالا سبک خونه‌ات رو پیدا کن</h2>
                <p>۵ سوال کوتاه — کمتر از یک دقیقه. بدون ثبت‌نام، نتیجه رو ببین.</p>
                <button className="btn btn-primary btn-lg" onClick={() => setShowQuiz(true)}>
                  شروع سبک‌سنجی <ArrowLeft size={18} />
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand"><span className="brand-mark"><Home size={16} /></span> دستینه</div>
          <small>نمونه‌کار آزمایشی — پیشنهاد هوشمند دکوراسیون داخلی (MVP)</small>
        </div>
      </footer>
    </>
  )
}