import Image from "next/image";

interface ITeamMember {
  name: string;
  role: string;
  email: string;
  imageUrl: string;
}

interface ISupportContact {
  teamMembers: ITeamMember[];
}

const SupportContact = (props: ISupportContact) => {
  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="grid max-[806px]:grid-cols-1 min-[807px]:grid-cols-2  gap-4">
        {props.teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex w-80 flex-col items-center rounded bg-white p-4 shadow-lg gap-2"
          >
            <div className="relative flex aspect-square w-full items-center justify-center rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
              <Image
                src={"/Solitour-logo.svg"}
                alt={member.name}
                fill={true}
              />
            </div>
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <p
              className="text-blue-500 hover:underline"
            >
              {member.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportContact;
