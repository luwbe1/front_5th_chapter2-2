import { formatCurrency } from './format';

export const formatDiscountValue = (
  type: 'amount' | 'percentage',
  value: number
): string => (type === 'amount' ? `${formatCurrency(value)}원` : `${value}%`);
