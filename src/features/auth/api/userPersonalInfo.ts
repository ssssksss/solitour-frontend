"use server";

import { fetchWithAuth } from "@/shared/api";
import { cookies } from "next/headers";

export interface AgreeRequestData {
  name: string;
  age: number;
  sex: string;
  termConditionAgreement: boolean;
  privacyPolicyAgreement: boolean;
}

export interface DisagreeRequestData {
  termConditionAgreement: boolean;
  privacyPolicyAgreement: boolean;
}

export async function agree(requestData: AgreeRequestData) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/users/info/agree`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify(requestData),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function disagree(requestData: DisagreeRequestData) {
  const accessToken = (await cookies()).get("access_token");
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/api/users/info/disagree`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify(requestData),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}
