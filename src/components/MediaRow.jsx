import MediaCard from './MediaCard'
import LoadingState from './LoadingState'
import EmptyState from './EmptyState'
import './MediaRow.css'

/**
 * @param {{ title: string, items: object[], mediaType?: 'movie'|'tv', status: 'loading'|'error'|'success' }} props
 */
export default function MediaRow({ title, items, mediaType, status }) {
  return (
    <section>
      <h2 className="section-title">{title}</h2>

      {status === 'loading' && <LoadingState message={`Carregando ${title.toLowerCase()}…`} />}

      {status === 'error' && (
        <EmptyState
          title="Não foi possível carregar esta seção"
          message="Verifique sua conexão ou tente novamente em instantes."
        />
      )}

      {status === 'success' && items.length === 0 && (
        <EmptyState title="Nada por aqui ainda" message="Volte mais tarde para novidades." />
      )}

      {status === 'success' && items.length > 0 && (
        <div className="media-row">
          {items.map((item) => (
            <MediaCard key={item.id} item={item} mediaType={mediaType} />
          ))}
        </div>
      )}
    </section>
  )
}
