import React, { useState, useEffect } from "react";

const Modal = ({
  btnActive: btnActive,
  stateOpen: stateOpen,
  data: data,
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
              data={data != null ? data : ""}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
