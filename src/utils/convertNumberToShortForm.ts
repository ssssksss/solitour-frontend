export function convertNumberToShortForm(num: number) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + "B"; // 십억 단위
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + "M"; // 백만 단위
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + "K"; // 천 단위
  } else {
    return num.toString(); // 천 단위 미만은 그대로 반환
  }
}
