import { useState } from "react";

const useMembers = (initialMembers = []) => {
  const [membersProject, setMembersProject] = useState(initialMembers);

  const handleAddMember = (member) => {
    let findMember = membersProject.find((item) => item === member);
    if (!findMember && member !== "") {
      setMembersProject([...membersProject, member]);
    }
  };

  const handleRemoveMember = (member) => {
    setMembersProject(membersProject.filter((item) => item !== member));
  };

  return { membersProject, handleAddMember, handleRemoveMember };
};

export default useMembers;
