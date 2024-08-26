import Link from "next/link";

interface ISupportNotice {
  data: {
    id: number;
    title: string;
    createdAt: string;
    content: string;
  }[];
}

const SupportNotice = ({ data }: ISupportNotice) => {
  return (
    <div className="flex w-full flex-col space-y-4 pb-8">
      {data.map((notice) => (
        <Link
          href={`support/notice/${notice.id}`}
          key={notice.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <h2 className="mb-2 text-xl font-semibold">{notice.title}</h2>
          <p className="mb-2 text-sm text-gray-500">
            {new Date(notice.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700">{notice.content}</p>
        </Link>
      ))}
    </div>
  );
};

export default SupportNotice;
