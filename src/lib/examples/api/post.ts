/*
import { PostBody } from "@/constants/Post";

export const write = ({ category, title, body }: PostBody) => {
  return fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: category, title: title, body: body }),
    cache: "no-store",
  });
};

export const getPostList = (page: number, order: string, title?: string) => {
  return fetch(
    `${process.env.API_BASE_URL}/api/post?page=${page}&order=${order}&title=${
      title ?? ""
    }`,
    {
      method: "GET",
      next: { revalidate: 60, tags: ["getPostList"] },
    }
  );
};

export const getPost = (id: number) => {
  return fetch(`${process.env.API_BASE_URL}/api/post/${id}`, {
    method: "GET",
    cache: "no-store",
  });
};

export const remove = (id: number) => {
  return fetch(`/api/post/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
};
*/
