import MediaCard from './MediaCard'
import LoadingState from './LoadingState'
import EmptyState from './EmptyState'
import './MediaGrid.css'

/**
 * @param {{ items: object[], status: 'loading'|'error'|'success', emptyTitle: string, emptyMessage?: string }} props
 */
export default function MediaGrid({ items, status, emptyTitle, emptyMessage }) {
  if (status === 'loading') return <LoadingState message="Carregando…" />

  if (status === 'error') {
    return (
      <EmptyState
        title="Algo deu errado"
        message="Não foi possível carregar esses conteúdos agora. Tente novamente."
      />
    )
  }

  if (items.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} actionLabel="Explorar Home" actionTo="/" />
  }

  return (
    <div className="media-grid">
      {items.map((item) => (
        <MediaCard key={`${item.media_type ?? 'item'}-${item.id}`} item={item} />
      ))}
    </div>
  )
}
