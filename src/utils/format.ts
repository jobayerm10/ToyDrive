export const formatPrice = (amount: number): string =>
  `৳${amount.toLocaleString('en-US')}`

export const formatStock = (stock: number): { label: string; tone: 'low' | 'ok' | 'out' } => {
  if (stock <= 0) return { label: 'Out of stock', tone: 'out' }
  if (stock <= 5) return { label: `Only ${stock} left`, tone: 'low' }
  return { label: 'In stock', tone: 'ok' }
}
