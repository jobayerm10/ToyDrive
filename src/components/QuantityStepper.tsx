import { Minus, Plus, Trash2 } from 'lucide-react'

interface QuantityStepperProps {
  quantity: number
  onChange: (next: number) => void
  onRemove?: () => void
  max?: number
  compact?: boolean
}

export function QuantityStepper({
  quantity,
  onChange,
  onRemove,
  max = 99,
  compact = false,
}: QuantityStepperProps) {
  const sizeClass = compact ? 'h-8 w-8' : 'h-10 w-10'

  return (
    <div className="inline-flex items-center border border-slate-line">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className={`${sizeClass} flex items-center justify-center text-soft transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-soft`}
      >
        <Minus aria-hidden="true" className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      </button>
      <span
        aria-live="polite"
        className={`${compact ? 'w-8' : 'w-10'} text-center text-sm font-semibold text-offwhite`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(quantity + 1, max))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`${sizeClass} flex items-center justify-center text-soft transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-soft`}
      >
        <Plus aria-hidden="true" className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      </button>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove item"
          className={`${sizeClass} ml-1 flex items-center justify-center border border-slate-line text-soft transition-colors hover:border-accent hover:text-accent`}
        >
          <Trash2 aria-hidden="true" className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        </button>
      ) : null}
    </div>
  )
}
