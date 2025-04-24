export const formatDiscountValue = (
  type: 'amount' | 'percentage',
  value: number
): string => (type === 'amount' ? `${value.toLocaleString()}원` : `${value}%`);
