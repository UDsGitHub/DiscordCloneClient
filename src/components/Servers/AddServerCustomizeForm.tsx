import { formStateType } from "./AddServerModal";
import AddServerBaseForm from "./AddServerBaseForm";
import { useContext, useState } from "react";
import { ToastContext, UserContext } from "context";
import { MAX_IMAGE_FILE_SIZE } from "model";
import { UploadProfilePicture } from "components";
import { useCreateServerMutation } from "api";
import { BeatLoader } from "react-spinners";

type Props = {
  onClose: () => void;
  changeFormState: (formState: formStateType) => void;
};

const AddServerCustomizeForm = ({ onClose, changeFormState }: Props) => {
  const { user } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);
  const [serverName, setServerName] = useState(
    user ? `${user.username}'s server` : ""
  );
  const [serverDisplayPicture, setServerDisplayPicture] = useState<
    File | undefined
  >(undefined);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [createServer, { isLoading }] = useCreateServerMutation();

  const handleServerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerName(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const inputFile = files && files[0];
    if (inputFile && inputFile.size < MAX_IMAGE_FILE_SIZE) {
      // Prepare preview image from blob
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(inputFile);

      setServerDisplayPicture(inputFile);
    } else if (inputFile) {
      setPreviewImage(undefined);
      setServerDisplayPicture(undefined);
      showToast(
        "Image size is too large.\n Please upload an image less than 10MB"
      );
    }
  };

  const handleFormSubmit = () => {
    // Submit the form
    if (serverName !== "") {
      const formData = new FormData();
      formData.append("serverName", serverName);
      if (serverDisplayPicture)
        formData.append("serverDisplayPicture", serverDisplayPicture);
      createServer(formData)
        .unwrap()
        .then(() => {
          resetForm();
          onClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const resetForm = () => {
    setPreviewImage(undefined);
    setServerDisplayPicture(undefined);
    setServerName("");
  };

  const handleBackClick = () => {
    changeFormState("template");
    resetForm();
  };

  return (
    <AddServerBaseForm
      title="Customize Your Server"
      subtitle="Give your new server a personality with a name and an icon. You can always change it later."
      footer={
        <div className="bg-grey-700 flex justify-between p-4">
          <button className="text-grey-300" onClick={handleBackClick}>
            Back
          </button>
          <button
            className="w-[96px] h-[38px] bg-purple-500 hover:bg-purple-500/75 duration-300 rounded-sm text-grey-300 font-semibold text-sm"
            onClick={handleFormSubmit}
            disabled={isLoading}
          >
            {!isLoading ? "Create" : <BeatLoader size={8} color="#D1D5DB" />}
          </button>
        </div>
      }
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <div>
        <UploadProfilePicture
          picturePreview={previewImage}
          onChange={handleFileChange}
        />
        <p className="text-grey-400 font-bold text-xs tracking-wider mb-2">
          SERVER NAME
        </p>
        <input
          className="w-full h-10 bg-grey-800 text-grey-300 p-2 rounded-sm outline-none mb-2"
          type="text"
          value={serverName}
          onChange={handleServerNameChange}
          maxLength={100}
          required
        />
        <p className="text-grey-400/50 text-xs">
          By creating a server, you agree to Discord's{" "}
          <a className="text-blue-400 hover:underline cursor-pointer">
            Community Guidelines
          </a>
        </p>
      </div>
    </AddServerBaseForm>
  );
};

export default AddServerCustomizeForm;
