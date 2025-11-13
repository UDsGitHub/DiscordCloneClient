import { formStateType } from "../Modals/CreateServerModal";

type Props = {
  onClose: () => void;
  changeFormState: (formState: formStateType) => void;
};

const JoinServerForm = ({ onClose, changeFormState }: Props) => {
  if (true) {
    changeFormState("customize");
    onClose();
  }

  return <div>JoinServerForm</div>;
};

export default JoinServerForm;
