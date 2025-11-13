import AddServerBaseForm from "./AddServerBaseForm";
import { formStateType } from "../Modals/CreateServerModal";

interface AddServerTemplateFormProps {
  onClose: () => void;
  changeFormState: (formState: formStateType) => void;
}

const AddServerTemplateForm = ({
  onClose,
  changeFormState,
}: AddServerTemplateFormProps) => {
  return (
    <AddServerBaseForm
      title="Create Your Server"
      subtitle="Your server is where you and your friends hang out. Make yours and start talking."
      footer={
        <div className="text-center py-4 bg-grey-700 px-4">
          <p className="text-grey-300 text-xl font-semibold mb-2">
            Have an Invite already?
          </p>
          <button className="bg-grey-400/40 hover:bg-grey-400/60 duration-300 w-full rounded-sm h-[38px] text-grey-300 font-semibold text-sm">
            Join a Server
          </button>
        </div>
      }
      onClose={onClose}
      onSubmit={() => {}}
    >
      <button
        className="h-16 flex items-center justify-between px-4 border-[1px] border-grey-400/25 text-grey-300 rounded-md w-full hover:bg-grey-400/10 duration-300"
        onClick={() => changeFormState("customize")}
      >
        <p className="font-bold">Create My Own</p>
        <svg
          className="w-8 h-8 text-grey-400/25"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m10 16 4-4-4-4"
          />
        </svg>
      </button>
    </AddServerBaseForm>
  );
};

export default AddServerTemplateForm;
