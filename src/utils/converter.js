const FORMTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})

export default function formatCurrency(currency) {
  return FORMTER.format(currency)
}
