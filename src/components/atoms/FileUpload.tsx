import { useState } from "react";
const FileUpload = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files ? files[0] : null;
    setFileName(file ? file.name : "");
  };

  return (
    <div className="flex flex-row">
      <label
        htmlFor="file-input"
        className="bg-primary text-secondary-dark dark:bg-secondary-dark dark:text-accent-dark pl-6 pr-4 py-2 rounded-l-lg cursor-pointer"
      >
        {fileName ? fileName : "Select File"}
      </label>
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="bg-gray-300 dark:bg-primary-dark flex flex-col align-center justify-center rounded-r-lg pl-4 pr-6">
        <span className="text-text dark:text-accent">
          {fileName ? `Selected file: ${fileName}` : "No file selected"}
        </span>
      </div>
    </div>
  );
};

export default FileUpload;
