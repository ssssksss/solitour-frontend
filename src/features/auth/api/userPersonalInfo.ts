import { fetchWithAuth } from "@/shared/api";

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
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/info/agree`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}

export async function disagree(requestData: DisagreeRequestData) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/info/disagree`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
}
