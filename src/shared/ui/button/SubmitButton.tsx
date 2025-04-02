import Image from "next/image";

interface SubmitButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const SubmitButton = ({
  text,
  className,
  disabled,
  loading,
  onClick,
}: SubmitButtonProps) => {
  return (
    <button
      className={[
        className,
        "bg-main mb-20 flex h-10.5 w-38 items-center justify-center self-end rounded-full text-white hover:scale-105",
      ].join(" ")}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="flex flex-row items-center gap-3">
          <Image
            className="animate-spin"
            src="/images/loading.webp"
            alt="loading"
            width={20}
            height={20}
          />
          <p>{`${text} 중...`}</p>
        </div>
      ) : (
        <p>{`${text}하기`}</p>
      )}
    </button>
  );
};
