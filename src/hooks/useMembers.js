import { useState } from "react";

/**
 * The `useMembers` function is a custom hook in JavaScript that manages a list of project members and
 * provides functions to add and remove members from the list.
 * @param [initialMembers] - The initialMembers parameter is an optional array that represents the
 * initial list of members for a project. If no initial members are provided, an empty array will be
 * used as the default value.
 * @returns The `useMembers` function returns an object with three properties: `membersProject`,
 * `handleAddMember`, and `handleRemoveMember`.
 */
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
