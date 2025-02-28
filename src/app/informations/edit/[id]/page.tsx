import Breadcrumbs from "@/components/common/Breadcrumb";
import InformationUpdateEditor from "@/components/informations/edit/InformationUpdateEditor";
import { InformationDetailDto } from "@/types/InformationDto";
import { cookies } from "next/headers";

async function getInformation(id: number) {
  const cookie = (await cookies()).get("access_token");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/informations/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      next: { revalidate: 60, tags: [`getInformation/${id}`] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<InformationDetailDto>;
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { id } = params;
  const informationId = Number(id);

  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    throw new Error("Not Found");
  }

  return {
    title: `정보 수정하기 - ${informationId}`,
    description: "Solitour의 정보 수정하기 페이지",
  };
}

export default async function page(props: Props) {
  const params = await props.params;
  const { id } = params;
  const informationId = Number(id);

  if (informationId <= 0 || !Number.isSafeInteger(informationId)) {
    throw Error("Not Found");
  }

  const data = await getInformation(informationId);

  return (
    <div className="flex w-full flex-col items-center">
      <Breadcrumbs
        categories={[
          {
            label: "정보",
            href: "/informations/list?page=1&parentCategoryId=1",
          },
          { label: "정보 수정하기", href: "" },
        ]}
      />
      <InformationUpdateEditor informationId={informationId} data={data} />
    </div>
  );
}
