import Image from "next/image";

interface UserImageProps {
  userImageAddress: string;
  size: number;
  addressStyle?: string;
}

export const UserImage = ({
  userImageAddress,
  size,
  addressStyle = "rounded-[50%] border-[0.03125rem] border-[#B8EDD9] bg-lightgreen",
}: UserImageProps) => {
  return (
    <Image
      className={addressStyle}
      src={userImageAddress}
      alt="user_image"
      width={size}
      height={size}
    />
  );
};
