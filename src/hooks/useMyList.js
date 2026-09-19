import { useContext } from 'react'
import { MyListContext } from '../context/MyListContext'

/**
 * Acesso à lista pessoal (favoritos/assistidos). Deve ser usado dentro de <MyListProvider>.
 */
export function useMyList() {
  const context = useContext(MyListContext)
  if (!context) {
    throw new Error('useMyList precisa ser usado dentro de <MyListProvider>')
  }
  return context
}
