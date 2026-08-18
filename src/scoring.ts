import { useEffect, useState } from 'react'
import { STYLES, PRODUCTS, type QuizAnswers } from './data'

export interface StyleScore {
  [style: string]: number
}

/**
 * Scoring engine — mirrors the project brief's weighted model:
 * style 30%, color 30%, budget 20%, material 15%, pattern 10%.
 */
export function scoreStyles(answers: QuizAnswers): StyleScore {
  const scores: StyleScore = {}
  for (const s of Object.keys(STYLES)) scores[s] = 0

  // 1. Style preference (30%)
  const pref = answers.style
  if (pref) {
    for (const s of Object.keys(STYLES)) {
      if (s === pref) scores[s] += 30
    }
    if (answers.vibe) {
      const vibeMap: Record<string, string[]> = {
        'minimal-clean': ['minimalist', 'modern', 'scandinavian'],
        'warm-cozy': ['scandinavian', 'classic'],
        bold: ['industrial', 'modern'],
        elegant: ['classic', 'modern'],
      }
      for (const s of vibeMap[answers.vibe] ?? []) scores[s] += 12
    }
  }

  // 2. Color match (30%) — against the palette of the preferred style
  if (answers.color && pref) {
    for (const s of Object.keys(STYLES)) {
      const palette = STYLES[s].colors
      if (palette.some((c) => c.includes(answers.color))) scores[s] += 30
      else if (answers.color === 'خنثی (سفید/خاکستری/کرم)' && s !== 'industrial') scores[s] += 15
    }
  }
  if (answers.contrast === 'high') scores.industrial += 8
  if (answers.contrast === 'soft') { scores.scandinavian += 8; scores.minimalist += 8 }

  // 3. Budget fit (20%)
  const budgetKey = answers.budget ?? ''
  const budgetMap: Record<string, string[]> = {
    'کمتر از ۵۰': ['minimalist', 'scandinavian'],
    '۵۰ تا ۱۰۰': ['scandinavian', 'modern', 'minimalist'],
    '۱۰۰ تا ۲۰۰': ['modern', 'industrial', 'classic'],
    'بیشتر از ۲۰۰': ['classic', 'industrial', 'modern'],
  }
  for (const s of budgetMap[budgetKey] ?? []) scores[s] += 20

  // 4. Material preference (15%)
  if (answers.material) {
    const materialMap: Record<string, string[]> = {
      'چوب طبیعی': ['scandinavian', 'classic', 'minimalist'],
      فلز: ['industrial', 'modern'],
      'پارچه و مخمل': ['scandinavian', 'classic'],
      شیشه: ['modern'],
    }
    for (const s of materialMap[answers.material] ?? []) scores[s] += 15
  }

  // 5. Pattern/decoration density (10%)
  if (answers.decor) {
    const decorMap: Record<string, string[]> = {
      'ساده و خلوت': ['minimalist', 'modern', 'scandinavian'],
      'چند تکه': ['scandinavian', 'modern'],
      'پر و شلوغ': ['classic', 'industrial'],
    }
    for (const s of decorMap[answers.decor] ?? []) scores[s] += 10
  }

  return scores
}

/**
 * Distributed recommendation — returns all products, ranked by a blended
 * score of (style match, room match, budget match).
 */
export function rankProducts(answers: QuizAnswers, scores: StyleScore) {
  const pref = answers.style
  const room = answers.room
  const budgetKey = answers.budget ?? ''
  const budgetFits: Record<string, (price: number) => boolean> = {
    'کمتر از ۵۰': (p) => p < 50_000_000,
    '۵۰ تا ۱۰۰': (p) => p >= 50_000_000 && p < 100_000_000,
    '۱۰۰ تا ۲۰۰': (p) => p >= 100_000_000 && p < 200_000_000,
    'بیشتر از ۲۰۰': (p) => p >= 200_000_000,
  }
  const roomMatch: Record<string, string[]> = {
    living: ['مبل و نشیمن', 'میز جلومبلی'],
    bedroom: ['مبل و نشیمن', 'صندلی'],
    dining: ['میز', 'صندلی'],
    office: ['میز', 'قفسه', 'صندلی'],
  }
    const roomCats = roomMatch[room] ?? []
  return PRODUCTS.map((p) => {
    let score = scores[p.style] ?? 30
    if (roomCats.includes(p.category)) score += 20
    if (budgetFits[budgetKey]?.(p.price)) score += 15
    if (p.style === pref) score += 10
    score = Math.min(score, 100)
    return { ...p, score }
  }).sort((a, b) => b.score - a.score)
}

/** Format prices in Persian digits. */
export function fmt(price: number): string {
  const fa = '۰۱۲۳۴۵۶۷۸۹'
  return String(price).replace(/[0-9]/g, (d) => fa[Number(d)])
}

export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const [visible, setVisible] = useState(false)
  const ref = { current: null as T | null }
  useEffect(() => {
    if (!ref.current) return
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setVisible(true), obs.disconnect())),
      { threshold },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}