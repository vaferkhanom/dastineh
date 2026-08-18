import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { STYLES, ROOM_NAMES, STYLE_NAMES } from './data'
import { scoreStyles, rankProducts, fmt } from './scoring'
import type { QuizAnswers } from './data'
import type { StyleScore } from './scoring'

const QUESTIONS = [
  {
    id: 'room',
    q: 'برای کدوم فضا می‌خوای؟',
    sub: 'اول بگو این اتاق کجاست تا دقیق‌تر پیشنهاد بدیم.',
    options: [
      { v: 'living', label: 'نشیمن' },
      { v: 'bedroom', label: 'خواب' },
      { v: 'dining', label: 'ناهارخوری' },
      { v: 'office', label: 'مطالعه و کار' },
    ],
    grid: 'quiz-2',
  },
  {
    id: 'style',
    q: 'کدوم سبک به دلت نزدیک‌تره؟',
    sub: 'احساس کلی فضایی که می‌پسندی رو انتخاب کن.',
    options: [
      { v: 'modern', label: 'مدرن' },
      { v: 'scandinavian', label: 'اسکاندیناوی' },
      { v: 'industrial', label: 'صنعتی' },
      { v: 'classic', label: 'کلاسیک' },
      { v: 'minimalist', label: 'مینیمال' },
    ],
    grid: 'quiz-2',
  },
  {
    id: 'color',
    q: 'رنگ‌های غالب فضات چی باشه؟',
    sub: 'پالت رنگی که توی خونه‌ات حس خوبی بهت می‌ده.',
    options: [
      { v: 'نوترال', label: 'نوترال (سفید/خاکستری/کرم)' },
      { v: 'تیره', label: 'تیره (مشکی/طوسی عمیق)' },
      { v: 'چوبی', label: 'چوبی گرم' },
      { v: 'پاستلی', label: 'پاستلی ملایم' },
      { v: 'رنگی', label: 'رنگی جسورانه' },
    ],
    grid: 'quiz-2',
  },
  {
    id: 'budget',
    q: 'بودجه‌ات چقدره؟',
    sub: 'برای فیلتر کردن پیشنهادها بهمون کمک می‌کنه.',
    options: [
      { v: 'کمتر از ۵۰', label: 'کمتر از ۵۰ میلیون' },
      { v: '۵۰ تا ۱۰۰', label: '۵۰ تا ۱۰۰ میلیون' },
      { v: '۱۰۰ تا ۲۰۰', label: '۱۰۰ تا ۲۰۰ میلیون' },
      { v: 'بیشتر از ۲۰۰', label: 'بیشتر از ۲۰۰ میلیون' },
    ],
    grid: 'quiz-2',
  },
  {
    id: 'material',
    q: 'به چه متریالی علاقه داری؟',
    sub: 'جنس وسایلی که ترجیح می‌دی.',
    options: [
      { v: 'چوب طبیعی', label: 'چوب طبیعی' },
      { v: 'فلز', label: 'فلز' },
      { v: 'پارچه و مخمل', label: 'پارچه و مخمل' },
      { v: 'شیشه', label: 'شیشه' },
    ],
    grid: 'quiz-2',
  },
]

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [done, setDone] = useState(false)
  const [scores, setScores] = useState<StyleScore | null>(null)

  const total = QUESTIONS.length
  const progress = ((step + (done ? 1 : 0)) / (total + 1)) * 100

  const setAnswer = (id: string, v: string) => setAnswers((a) => ({ ...a, [id]: v }))

  const next = () => {
    if (step < total - 1) { setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    else {
      setScores(scoreStyles(answers))
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const prev = () => (step > 0 ? setStep(step - 1) : null)
  const restart = () => { setStep(0); setAnswers({}); setDone(false); setScores(null) }

  if (done && scores) {
    return <Results scores={scores} answers={answers} onRestart={restart} />
  }

  const q = QUESTIONS[step]
  const chosen = answers[q.id]

  return (
    <div className="quiz-card enter">
      <div className="quiz-progress">
        <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${progress}%` }} /></div>
        <span className="quiz-progress-label">{step + 1} از {total}</span>
      </div>
      <span className="eyebrow">پرسشنامه سبک‌سنج</span>
      <h3 className="quiz-q">{q.q}</h3>
      <p style={{ color: 'var(--text-2)', marginBottom: 22 }}>{q.sub}</p>
      <div className={`quiz-grid ${q.grid}`} role="radiogroup" aria-label={q.q}>
        {q.options.map((o) => (
          <button
            key={o.v}
            className={`quiz-opt ${chosen === o.v ? 'selected' : ''}`}
            role="radio"
            aria-checked={chosen === o.v}
            onClick={() => setAnswer(q.id, o.v)}
          >
            {chosen === o.v && <Check size={16} color="var(--accent-2)" />}
            {o.label}
          </button>
        ))}
      </div>
      <div className="quiz-actions">
        <button className="quiz-nav" onClick={prev} disabled={step === 0}>
          <ArrowRight size={16} /> قبلی
        </button>
        <button className="btn btn-primary" onClick={next} disabled={!chosen}>
          {step < total - 1 ? 'بعدی' : 'مشاهده پیشنهادها'} <ArrowLeft size={16} />
        </button>
      </div>
    </div>
  )
}

function Results({ scores, answers, onRestart }: { scores: StyleScore; answers: QuizAnswers; onRestart: () => void }) {
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const primary = top[0]?.[0] ?? 'modern'
  const secondary = top[1]?.[0] ?? 'scandinavian'
  const products = rankProducts(answers, scores).slice(0, 6)
  const styleInfo = STYLES[primary]
  const roomName = answers.room ? ROOM_NAMES[answers.room] : 'نشیمن'

  return (
    <div className="enter">
      <div className="result-head">
        <div className="score-chip"><Sparkles size={15} /> نتیجه سبک‌سنجی تو آماده‌ست</div>
        <h2>
          فضای {roomName} با سبک <span style={{ color: 'var(--accent)' }}>{STYLE_NAMES[primary]}</span>
        </h2>
        <p>
          پیشنهاد هوشمند بر اساس سلیقه، رنگ و بودجه‌ی تو. امتیاز: <b>{Math.round(scores[primary])}٪</b>
        </p>
      </div>

      <div className="style-chips">
        <span className="style-chip">سبک اصلی: {STYLE_NAMES[primary]}</span>
        <span className="style-chip">سبک دوم: {STYLE_NAMES[secondary]}</span>
        {styleInfo && styleInfo.colors.length > 0 && <span className="style-chip">رنگ‌ها: {styleInfo.colors.join('، ')}</span>}
        {answers.budget && <span className="style-chip">بودجه: {answers.budget}</span>}
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <button className="btn btn-ghost" onClick={onRestart}><RotateCcw size={16} /> شروع دوباره</button>
      </div>
    </div>
  )
}

function ProductCard({ p }: { p: { id: string; name: string; category: string; image: string; price: number; seller: string; score: number; tags: string[] } }) {
  return (
    <div className="product">
      <div className="product-img-wrap">
        <img src={p.image} alt={p.name} className="product-img" loading="lazy" width={400} height={400}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        {false && null}
        <span className="product-score">٪{Math.round(p.score)} مطابقت</span>
      </div>
      <div className="product-body">
        <h4>{p.name}</h4>
        <div className="product-tags">
          {p.tags.slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="product-price">
          <b>{fmt(p.price)} <span className="unit">تومان</span></b>
          <button className="cta-mini">مشاهده</button>
        </div>
      </div>
    </div>
  )
}