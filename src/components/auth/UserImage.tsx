import Image from "next/image";

interface IUserImage {
  userImageAddress: string,
  userSex: string,
  size: number,
  addressStyle: string,
  defaultStyle: string,
}
const UserImage = ({
  userImageAddress,
  userSex,
  size,
  addressStyle = "rounded-[50%]",
  defaultStyle = "rounded-[50%] border-[0.03125rem] border-[#B8EDD9] bg-[#F2FAF7]",
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
      ) : userSex == "MALE" ? (
        <Image
          src={"/user_sex_man_default_image.svg"}
          alt={"user_image"}
          width={size}
          height={size}
          className={`${defaultStyle}`}
        />
      ) : (
        <Image
          src={"/user_sex_woman_default_image.svg"}
          alt={"user_image"}
          width={size}
          height={size}
          className={`${defaultStyle}`}
        />
      )}
    </>
  );
};
export default UserImage