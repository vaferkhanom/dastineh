export interface Product {
  id: string
  name: string
  category: string
  style: string
  color: string
  material: string
  price: number
  image: string
  seller: string
  score: number
  tags: string[]
}

export interface QuizAnswers {
  [key: string]: string
}

export interface StyleResult {
  primary: string
  secondary: string
  score: number
}

export const STYLE_WEIGHTS: Record<string, { style: number; color: number; budget: number; material: number; pattern: number }> = {
  // weights from the project brief: style 30%, color 30%, budget 20%, material 15%, pattern 10%
  modern: { style: 0.3, color: 0.3, budget: 0.2, material: 0.15, pattern: 0.1 },
  scandinavian: { style: 0.3, color: 0.3, budget: 0.2, material: 0.15, pattern: 0.1 },
  industrial: { style: 0.3, color: 0.3, budget: 0.2, material: 0.15, pattern: 0.1 },
  classic: { style: 0.3, color: 0.3, budget: 0.2, material: 0.15, pattern: 0.1 },
  minimalist: { style: 0.3, color: 0.3, budget: 0.2, material: 0.15, pattern: 0.1 },
}

export const STYLES: Record<string, { label: string; colors: string[]; materials: string[]; patterns: string[] }> = {
  modern: { label: 'مدرن', colors: ['نوترال', 'مشکی', 'سفید'], materials: ['فلز', 'شیشه', 'چوب'], patterns: ['ساده'] },
  scandinavian: { label: 'اسکاندیناوی', colors: ['کرم', 'پاستلی', 'سفید'], materials: ['چوب روشن', 'پارچه'], patterns: ['الگوهای ظریف'] },
  industrial: { label: 'صنعتی', colors: ['تیره', 'خاکستری'], materials: ['فلز', 'بتن', 'چرم'], patterns: ['بافت خام'] },
  classic: { label: 'کلاسیک', colors: ['طلایی', 'سبز تیره', 'بورگوندی'], materials: ['چوب تیره', 'مخمل', 'برنج'], patterns: ['نقشهای کلاسیک'] },
  minimalist: { label: 'مینیمال', colors: ['سفید', 'خاکستری'], materials: ['چوب روشن', 'سنگ'], patterns: ['ساده'] },
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'مبل سه نفره مدل نوا', category: 'مبل و نشیمن', style: 'scandinavian', color: 'کرم', material: 'پارچه', price: 28900000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=70&auto=format&fit=crop', seller: 'مبلمان نوا', score: 0, tags: ['نشیمن', 'پارچهای'] },
  { id: 'p2', name: 'میز ناهارخوری مدرن', category: 'میز', style: 'modern', color: 'مشکی', material: 'فلز', price: 18500000, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=70&auto=format&fit=crop', seller: 'چوب و فلز', score: 0, tags: ['میز', 'فلزی'] },
  { id: 'p3', name: 'مبل راحتی اسکاندیناوی پارچه‌ای', category: 'مبل و نشیمن', style: 'scandinavian', color: 'سفید', material: 'پارچه', price: 23400000, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=70&auto=format&fit=crop', seller: 'وینا هوم', score: 0, tags: ['نشیمن', 'روشن'] },
  { id: 'p4', name: 'صندلی ناهارخوری فلزی صنعتی', category: 'صندلی', style: 'industrial', color: 'خاکستری', material: 'فلز', price: 8900000, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=70&auto=format&fit=crop', seller: 'صنایع رِکس', score: 0, tags: ['صندلی', 'فلزی'] },
  { id: 'p5', name: 'میز کنسول چوبی کلاسیک', category: 'کنسول', style: 'classic', color: 'طلایی', material: 'چوب تیره', price: 15200000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=70&auto=format&fit=crop', seller: 'آثار چوب', score: 0, tags: ['کنسول', 'کلاسیک'] },
  { id: 'p6', name: 'مبل تخت‌خوابشو مینیمال', category: 'مبل و نشیمن', style: 'minimalist', color: 'خاکستری', material: 'چوب روشن', price: 19800000, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=70&auto=format&fit=crop', seller: 'ستا لایف', score: 0, tags: ['نشیمن', 'مینیمال'] },
  { id: 'p7', name: 'میز جلومبلی شیشه‌ای مدرن', category: 'میز جلومبلی', style: 'modern', color: 'سفید', material: 'شیشه', price: 12400000, image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800&q=70&auto=format&fit=crop', seller: 'متا فورنیچر', score: 0, tags: ['میز', 'شیشهای'] },
  { id: 'p8', name: 'صندلی راحتی پارچه‌ای', category: 'صندلی', style: 'scandinavian', color: 'کرم', material: 'پارچه', price: 13500000, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=70&auto=format&fit=crop', seller: 'اورا هوم', score: 0, tags: ['صندلی', 'راحتی'] },
  { id: 'p9', name: 'کتابخانه فلزی صنعتی', category: 'قفسه', style: 'industrial', color: 'مشکی', material: 'فلز', price: 16800000, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=70&auto=format&fit=crop', seller: 'بلک استیل', score: 0, tags: ['قفسه', 'فلزی'] },
]

export const ROOM_NAMES: Record<string, string> = {
  living: 'نشیمن',
  bedroom: 'خواب',
  dining: 'ناهارخوری',
  office: 'مطالعه و کار',
}

export const STYLE_NAMES: Record<string, string> = {
  modern: 'مدرن',
  scandinavian: 'اسکاندیناوی',
  industrial: 'صنعتی',
  classic: 'کلاسیک',
  minimalist: 'مینیمال',
}