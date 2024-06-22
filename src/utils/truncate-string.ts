export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  }
  const ellipsis = "...";
  const truncatedLength = maxLength - ellipsis.length;
  return str.slice(0, truncatedLength) + ellipsis;
}
