"use server";

import { fetchWithAuth } from "@/shared/api";
import { LOCATION_ID } from "@/shared/config";
import { cookies } from "next/headers";
import { InformationList } from "../model/informationList";

export async function getInformationList(
  page: number,
  parentCategoryId: number,
  childCategoryId: number,
  place?: string,
  order?: string,
  tagName?: string,
  search?: string,
) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    [
      `${process.env.BACKEND_URL}`,
      "/api/informations",
      `${tagName !== undefined ? "/tag/search" : ""}`,
      `?page=${page - 1}`,
      `&parentCategoryId=${parentCategoryId}`,
      `${childCategoryId > 0 ? `&childCategoryId=${childCategoryId}` : ""}`,
      `${place !== undefined ? `&zoneCategoryId=${LOCATION_ID[place]}` : ""}`,
      `${order !== undefined && order !== "latest" ? `&sort=${order}` : ""}`,
      `${tagName !== undefined ? `&tagName=${encodeURIComponent(tagName)}` : ""}`,
      `${search !== undefined ? `&search=${search}` : ""}`,
    ].join(""),
    {
      method: "GET",
      headers: { Cookie: `${accessToken?.name}=${accessToken?.value}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<InformationList>;
}
