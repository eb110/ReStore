export const getCookie = (key: string): string => {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b[0] : "";
};

export const convertToPounds = (amount: number): string =>
  `${(amount / 100).toFixed(2)} £`;
