import { useState } from "react";
import AddServerCustomizeForm from "./AddServerCustomizeForm";
import JoinServerForm from "./JoinServerForm";
import AddServerTemplateForm from "./AddServerTemplateForm";
import { useModalContext } from "context";

export type formStateType = "template" | "customize" | "join";

const CreateServerModal = () => {
  const { isCreateServerModalOpen: isOpen, closeCreateServerModal: onClose } =
    useModalContext();
  const [formState, setFormState] = useState<formStateType>("template");

  const handleClose = () => {
    onClose();
    setFormState("template");
  };

  const getFormContent = () => {
    switch (formState) {
      case "customize":
        return (
          <AddServerCustomizeForm
            onClose={handleClose}
            changeFormState={setFormState}
          />
        );
      case "join":
        return (
          <JoinServerForm
            onClose={handleClose}
            changeFormState={setFormState}
          />
        );
      case "template":
      default:
        return (
          <AddServerTemplateForm
            onClose={handleClose}
            changeFormState={setFormState}
          />
        );
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-grey-500 rounded-sm max-w-[440px]`}
      >
        {getFormContent()}
      </div>
    </div>
  );
};

export default CreateServerModal;
