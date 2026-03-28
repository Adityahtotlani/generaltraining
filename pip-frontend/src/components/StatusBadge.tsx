interface Props {
  status: string
  size?: 'sm' | 'md'
}

const config: Record<string, string> = {
  compliant:     'bg-emerald-100 text-emerald-800',
  warnings:      'bg-amber-100 text-amber-800',
  non_compliant: 'bg-red-100 text-red-800',
  restricted:    'bg-amber-100 text-amber-800',
  banned:        'bg-red-100 text-red-800',
  under_review:  'bg-blue-100 text-blue-800',
  critical:      'bg-red-100 text-red-800',
  warning:       'bg-amber-100 text-amber-800',
  info:          'bg-blue-100 text-blue-800',
}

export default function StatusBadge({ status, size = 'sm' }: Props) {
  const cls = config[status] ?? 'bg-stone-100 text-stone-800'
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
  return (
    <span className={`inline-flex rounded-full font-medium ${cls} ${sizeClass}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
