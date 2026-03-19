/**
 * Formats a number as a currency string.
 * @param amount The amount to format.
 * @returns A formatted currency string.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('ARS', '$');
};

/**
 * Formats a number with thousands separators.
 * @param value The value to format.
 * @returns A formatted string.
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('es-AR');
};
