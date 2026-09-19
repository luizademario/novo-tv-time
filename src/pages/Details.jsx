import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Heart } from 'lucide-react'
import { getDetails, IMG_BASE } from '../api/tmdb'
import { useMyList } from '../hooks/useMyList'
import RatingBadge from '../components/RatingBadge'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import './Details.css'

export default function Details() {
  const { media_type: mediaType, id } = useParams()
  const [item, setItem] = useState(null)
  const [status, setStatus] = useState('loading')
  const { getEntry, toggleFavorito, toggleAssistido } = useMyList()

  useEffect(() => {
    setStatus('loading')
    getDetails(mediaType, id)
      .then((data) => {
        setItem(data)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [mediaType, id])

  if (status === 'loading') {
    return (
      <div className="container">
        <LoadingState message="Carregando detalhes…" />
      </div>
    )
  }

  if (status === 'error' || !item) {
    return (
      <div className="container">
        <EmptyState
          title="Não foi possível carregar este título"
          message="Ele pode não existir mais, ou houve uma falha de conexão."
          actionLabel="Voltar para a Home"
          actionTo="/"
        />
      </div>
    )
  }

  const title = item.title ?? item.name
  const year = (item.release_date ?? item.first_air_date ?? '').slice(0, 4)
  const runtime = item.runtime
    ? `${item.runtime} min`
    : item.episode_run_time?.[0]
      ? `${item.episode_run_time[0]} min/ep`
      : null
  const poster = item.poster_path ? `${IMG_BASE}/w500${item.poster_path}` : null

  const entry = getEntry(mediaType, Number(id))
  const media = { id: Number(id), media_type: mediaType, title, poster_path: item.poster_path, vote_average: item.vote_average }

  return (
    <div className="container details">
      <Link to="/" className="details-back">
        <ArrowLeft size={16} />
        Voltar
      </Link>

      <div className="details-grid">
        <div className="details-poster">
          {poster ? (
            <img src={poster} alt={`Pôster de ${title}`} />
          ) : (
            <div className="details-poster-placeholder">{title}</div>
          )}
        </div>

        <div className="details-info">
          <h1>{title}</h1>

          <div className="details-meta">
            <RatingBadge value={item.vote_average} />
            {year && <span className="pill">{year}</span>}
            {runtime && <span className="pill">{runtime}</span>}
            <span className="pill">{mediaType === 'tv' ? 'Série' : 'Filme'}</span>
          </div>

          {item.genres?.length > 0 && (
            <div className="details-genres">
              {item.genres.map((genre) => (
                <span key={genre.id} className="pill">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="details-actions">
            <button
              type="button"
              className={`btn ${entry?.favorito ? 'btn-active-heart' : ''}`}
              onClick={() => toggleFavorito(media)}
              aria-pressed={Boolean(entry?.favorito)}
            >
              <Heart size={16} fill={entry?.favorito ? 'currentColor' : 'none'} />
              {entry?.favorito ? 'Nos favoritos' : 'Adicionar aos Favoritos'}
            </button>

            <button
              type="button"
              className={`btn ${entry?.assistido ? 'btn-active-check' : ''}`}
              onClick={() => toggleAssistido(media)}
              aria-pressed={Boolean(entry?.assistido)}
            >
              <Check size={16} />
              {entry?.assistido ? 'Assistido' : 'Marcar como Assistido'}
            </button>
          </div>

          <h2 className="details-overview-title">Sinopse</h2>
          <p className="details-overview">{item.overview || 'Sinopse não disponível.'}</p>
        </div>
      </div>
    </div>
  )
}
