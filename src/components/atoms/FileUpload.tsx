import { useState } from "react";
import { useResumeContext, ActionTypes } from "../../contexts/ResumeContext";

const FileUpload = () => {
  const [fileName, setFileName] = useState("");
  const { state, dispatch } = useResumeContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files ? files[0] : null;
    if (file) {
      setFileName(file ? file.name : "");
      dispatch({ type: ActionTypes.SET_SELECTED_FILE, payload: file });
    }
  };

  return (
    <div className="flex flex-row">
      <label
        htmlFor="file-input"
        className="border-1 bg-primary text-secondary-dark dark:bg-secondary-dark dark:text-accent-dark pl-6 pr-4 py-2 rounded-l-lg cursor-pointer"
      >
        {fileName ? fileName : "Select File"}
      </label>
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="border-1 border-primary-text dark:border-accent bg-gray-300 dark:bg-primary-dark flex flex-col align-center justify-center rounded-r-lg pl-4 pr-6">
        <span className="text-text dark:text-accent">
          {fileName ? `Selected file: ${fileName}` : "No file selected"}
        </span>
      </div>
    </div>
  );
};

export default FileUpload;
