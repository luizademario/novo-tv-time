import { Link } from 'react-router-dom'
import { IMG_BASE } from '../api/tmdb'
import RatingBadge from './RatingBadge'
import './MediaCard.css'

/**
 * @param {{ item: object, mediaType?: 'movie' | 'tv' }} props
 *   `mediaType` é opcional quando `item.media_type` já vem preenchido (ex: /trending, /search).
 */
export default function MediaCard({ item, mediaType }) {
  const type = mediaType ?? item.media_type
  const title = item.title ?? item.name
  const year = (item.release_date ?? item.first_air_date ?? '').slice(0, 4)
  const poster = item.poster_path ? `${IMG_BASE}/w342${item.poster_path}` : null

  return (
    <Link to={`/detalhes/${type}/${item.id}`} className="media-card">
      <div className="media-card-poster">
        {poster ? (
          <img src={poster} alt="" loading="lazy" />
        ) : (
          <div className="media-card-placeholder">{title}</div>
        )}
        <RatingBadge value={item.vote_average} size="sm" />
      </div>
      <p className="media-card-title">{title}</p>
      {year && <p className="media-card-year">{year}</p>}
    </Link>
  )
}
