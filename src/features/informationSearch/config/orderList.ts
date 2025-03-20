export const ORDER_LIST: {
  title: string;
  href: "latest" | "likes" | "views";
}[] = [
  { title: "최신순", href: "latest" },
  { title: "좋아요순", href: "likes" },
  { title: "최신순", href: "views" },
] as const;
