import EmptyState from '../components/EmptyState'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="container not-found">
      <EmptyState
        title="Página não encontrada"
        message="O endereço que você tentou acessar não existe."
        actionLabel="Voltar para a Home"
        actionTo="/"
      />
    </div>
  )
}
