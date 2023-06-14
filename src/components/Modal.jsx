import React from "react";

const Modal = ({
  buttonComponent: ButtonComponent,
  contentComponent: ContentComponent,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ButtonComponent onClick={toggleModal} />
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <ContentComponent onClose={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
