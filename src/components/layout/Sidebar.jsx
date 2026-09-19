import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Compass, Film, Search, Bookmark } from 'lucide-react'
import './Sidebar.css'

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const term = searchTerm.trim()
    if (!term) return
    navigate(`/buscar?q=${encodeURIComponent(term)}`)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Film size={22} strokeWidth={2.2} />
        <span>Novo TV Time</span>
      </div>

      <form className="sidebar-search" onSubmit={handleSubmit} role="search">
        <Search size={16} />
        <input
          type="search"
          placeholder="Buscar filmes ou séries"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Buscar filmes ou séries"
        />
      </form>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          <Compass size={19} />
          <span>Descobrir</span>
        </NavLink>
        <NavLink to="/minha-lista" className="sidebar-link">
          <Bookmark size={19} />
          <span>Minha Lista</span>
        </NavLink>
      </nav>
    </aside>
  )
}
