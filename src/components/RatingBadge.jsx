import { Star } from 'lucide-react'
import './RatingBadge.css'

/**
 * Exibe a nota (0–10) da TMDb formatada com uma casa decimal.
 * @param {{ value: number, size?: 'sm' | 'md' }} props
 */
export default function RatingBadge({ value, size = 'md' }) {
  const hasRating = typeof value === 'number' && value > 0
  const formatted = hasRating ? value.toFixed(1) : '—'

  return (
    <span className={`rating-badge rating-badge--${size}`}>
      <Star size={size === 'sm' ? 12 : 14} fill="currentColor" strokeWidth={0} />
      {formatted}
    </span>
  )
}
