import Image from "next/image";

interface UserImageProps {
  userImageAddress: string;
  size: number;
}

export const UserImage = ({ userImageAddress, size }: UserImageProps) => {
  return (
    <Image
      className="bg-lightgreen rounded-[50%] border-[0.03125rem] border-[#B8EDD9]"
      src={userImageAddress}
      alt="user-image"
      width={size}
      height={size}
    />
  );
};
