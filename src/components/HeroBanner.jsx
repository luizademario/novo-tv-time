import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import { IMG_BASE } from '../api/tmdb'
import RatingBadge from './RatingBadge'
import './HeroBanner.css'

/**
 * @param {{ item: object }} props — item precisa trazer `media_type` (vem assim em /trending).
 */
export default function HeroBanner({ item }) {
  const title = item.title ?? item.name
  const year = (item.release_date ?? item.first_air_date ?? '').slice(0, 4)
  const backdrop = item.backdrop_path ? `${IMG_BASE}/w1280${item.backdrop_path}` : null

  return (
    <section className="hero-banner" style={backdrop ? { '--hero-bg': `url(${backdrop})` } : undefined}>
      <div className="hero-banner-overlay">
        <span className="hero-banner-eyebrow">Em alta esta semana</span>
        <h1 className="hero-banner-title">{title}</h1>
        <div className="hero-banner-meta">
          <RatingBadge value={item.vote_average} />
          {year && <span className="pill">{year}</span>}
          <span className="pill">{item.media_type === 'tv' ? 'Série' : 'Filme'}</span>
        </div>
        <p className="hero-banner-overview">{item.overview}</p>
        <Link to={`/detalhes/${item.media_type}/${item.id}`} className="btn btn-primary">
          <Info size={16} />
          Ver detalhes
        </Link>
      </div>
    </section>
  )
}
