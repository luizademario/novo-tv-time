import { createContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'novo-tv-time:minha-lista'

export const MyListContext = createContext(null)

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Monta a chave única de um item combinando media_type + id. */
function itemKey(mediaType, id) {
  return `${mediaType}:${id}`
}

export function MyListProvider({ children }) {
  const [items, setItems] = useState(loadInitialItems)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  /** Retorna o registro salvo de um item, ou null se ele não está na lista. */
  function getEntry(mediaType, id) {
    return items.find((entry) => entry.media_type === mediaType && entry.id === id) ?? null
  }

  /**
   * Garante que um item exista na lista com os dados básicos necessários para renderizar
   * cards (título, pôster, nota), sem alterar seus flags de favorito/assistido.
   */
  function ensureEntry(media) {
    const key = itemKey(media.media_type, media.id)
    setItems((prev) => {
      if (prev.some((entry) => itemKey(entry.media_type, entry.id) === key)) return prev
      return [
        ...prev,
        {
          id: media.id,
          media_type: media.media_type,
          title: media.title ?? media.name,
          poster_path: media.poster_path ?? null,
          vote_average: media.vote_average ?? 0,
          favorito: false,
          assistido: false,
        },
      ]
    })
  }

  function toggleFlag(media, flag) {
    // ensureEntry e o setItems abaixo usam updates funcionais, então o React os aplica em
    // sequência sobre o estado mais recente, mesmo estando no mesmo evento/batch.
    ensureEntry(media)
    setItems((prev) => {
      const key = itemKey(media.media_type, media.id)
      return prev.map((entry) =>
        itemKey(entry.media_type, entry.id) === key ? { ...entry, [flag]: !entry[flag] } : entry,
      )
    })
  }

  const toggleFavorito = (media) => toggleFlag(media, 'favorito')
  const toggleAssistido = (media) => toggleFlag(media, 'assistido')

  function removeEntry(mediaType, id) {
    setItems((prev) => prev.filter((entry) => itemKey(entry.media_type, entry.id) !== itemKey(mediaType, id)))
  }

  const value = { items, getEntry, toggleFavorito, toggleAssistido, removeEntry }

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
}
