import React, { useState, useEffect } from "react";

const Modal = ({
  btnActive: btnActive,
  stateOpen: stateOpen,
  task: task,
  members: members,
  buttonComponent: ButtonComponent,
  contentComponent: ContentComponent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(stateOpen);
  }, [stateOpen]);

  return (
    <>
      {btnActive && <ButtonComponent onClick={toggleModal} />}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <ContentComponent
              onClose={toggleModal}
              data={task != null ? task : ""}
              members={members != null ? members : ""}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
