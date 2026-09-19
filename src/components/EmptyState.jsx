import { Link } from 'react-router-dom'
import { Ghost } from 'lucide-react'
import './EmptyState.css'

/**
 * @param {{ title: string, message?: string, actionLabel?: string, actionTo?: string }} props
 */
export default function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <Ghost size={28} strokeWidth={1.6} />
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
