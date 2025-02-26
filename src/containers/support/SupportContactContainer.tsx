import SupportContact from "@/components/support/SupportContact";

const SupportContactContainer = () => {
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
