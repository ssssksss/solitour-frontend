import Image from "next/image";

interface IUserImage {
  userImageAddress: string;
  userSex?: string;
  size: number;
  addressStyle?: string;
  defaultStyle?: string;
}
const UserImage = ({
  userImageAddress,
  size,
  addressStyle = "rounded-[50%] border-[0.03125rem] border-[#B8EDD9] bg-[#F2FAF7]",
}: IUserImage) => {
  return (
    <>
      {userImageAddress ? (
        <Image
          src={userImageAddress}
          alt={"user_image"}
          width={size}
          height={size}
          className={`${addressStyle}`}
        />
      ) : (
        <div> null </div>
      )}
    </>
  );
};
export default UserImage;
