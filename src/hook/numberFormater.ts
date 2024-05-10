export const useNumberFormater = (number: number) => {
  const trillion = number / 1000000000000;
  const billion = number / 1000000000;
  const million = number / 1000000;
  const thousand = number / 1000;

  if (trillion > 1) {
    return `$${trillion.toFixed(2)}t`;
  }
  if (billion > 1) {
    return `$${billion.toFixed(2)}b`;
  }
  if (million > 1) {
    return `$${million.toFixed(2)}m`;
  } else if (thousand > 1) {
    return `$${thousand.toFixed(2)}k`;
  } else {
    return `$${number.toFixed(2)}`;
  }
};
