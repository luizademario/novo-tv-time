import { useState } from 'react'
import { useMyList } from '../hooks/useMyList'
import MediaGrid from '../components/MediaGrid'
import './MyList.css'

const FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'favoritos', label: 'Favoritos' },
  { key: 'assistidos', label: 'Assistidos' },
]

export default function MyList() {
  const { items } = useMyList()
  const [filter, setFilter] = useState('todos')

  const filtered = items.filter((item) => {
    if (filter === 'favoritos') return item.favorito
    if (filter === 'assistidos') return item.assistido
    return true
  })

  return (
    <div className="container">
      <h1 className="section-title" style={{ marginTop: 40 }}>
        Minha Lista
      </h1>

      <div className="my-list-filters">
        {FILTERS.map((option) => (
          <button
            key={option.key}
            type="button"
            className={`btn ${filter === option.key ? 'btn-primary' : ''}`}
            onClick={() => setFilter(option.key)}
            aria-pressed={filter === option.key}
          >
            {option.label}
          </button>
        ))}
      </div>

      <MediaGrid
        items={filtered}
        status="success"
        emptyTitle={filter === 'todos' ? 'Sua lista está vazia' : `Nenhum item em "${FILTERS.find((f) => f.key === filter).label}"`}
        emptyMessage="Adicione filmes e séries aos favoritos ou marque como assistido na página de detalhes."
      />
    </div>
  )
}
