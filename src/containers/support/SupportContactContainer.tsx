import SupportContact from "@/components/support/SupportContact";

interface ISupportContactContainer {}

const SupportContactContainer = (props: ISupportContactContainer) => {
  const teamMembers = [
    {
      name: "이름",
      role: "역할",
      email: "이메일",
      imageUrl: "",
    },
    {
      name: "이름",
      role: "역할",
      email: "이메일",
      imageUrl: "",
    },
    {
      name: "이름",
      role: "역할",
      email: "이메일",
      imageUrl: "",
    },
    {
      name: "이름",
      role: "역할",
      email: "이메일",
      imageUrl: "",
    },
    {
      name: "이름",
      role: "역할",
      email: "이메일",
      imageUrl: "",
    },
  ];

  return <SupportContact teamMembers={teamMembers} />;
};
export default SupportContactContainer;
