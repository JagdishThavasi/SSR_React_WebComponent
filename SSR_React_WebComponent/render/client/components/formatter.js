export const formatter = (number, cur) => new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, minimumFractionDigits: 2}).format(number)
