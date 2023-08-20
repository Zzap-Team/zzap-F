export function formatDate(date: Date) {
  const yyyy = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${yyyy}년 ${m}월 ${d}일`;
}
