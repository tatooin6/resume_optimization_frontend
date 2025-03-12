import { useState } from "react";
import Button, { ButtonType } from "../components/atoms/Button";
import { ThemeSwitcher } from "../components/atoms/ThemeSwitcher";
import {
  FaCannabis,
  FaCarrot,
  FaCodepen,
  FaFistRaised,
  FaSignature,
} from "react-icons/fa";
import FileUpload from "../components/atoms/FileUpload";

const ComponentGallery = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ThemeSwitcher />
      <div className="">
        <div className="mb-6">
          <h1 className="text-3xl font-sans font-thin text-text dark:text-secondary">
            Welcome to the Dark Mode Demo
          </h1>
          <div className="mb-6">
            <FileUpload />
          </div>
          <p className="mt-4 text-text dark:text-text-dark">
            This is an example of text with the primary color in both light and
            dark modes.
          </p>
          <p className="mt-4 text-accent dark:text-accent-dark">
            This is an example of text with the accent color in both light and
            dark modes.
          </p>
        </div>

        <div className="mt-6">
          <Button
            action={() => setCount(count + 1)}
            label={`Clicked ${count} times`}
            isDisabled={false}
          />
        </div>

        <div className="mt-4">
          <Button
            action={() => alert("Secondary")}
            label="Secondary Button"
            isDisabled={false}
            icon={FaCannabis}
            type={ButtonType.Secondary}
          />
        </div>

        <div className="mt-4">
          <Button
            action={() => alert("Accent")}
            label="Accent Button"
            isDisabled={false}
            icon={FaCarrot}
            type={ButtonType.Accent}
          />
        </div>

        <div className="mt-4">
          <Button
            action={() => alert("Warning")}
            label="Warning Button"
            isDisabled={false}
            icon={FaCodepen}
            type={ButtonType.Warning}
          />
        </div>

        <div className="mt-4">
          <Button
            action={() => alert("Error")}
            label="Error Button"
            isDisabled={false}
            icon={FaFistRaised}
            type={ButtonType.Error}
          />
        </div>

        <div className="mt-4">
          <Button
            action={() => alert("disabled")}
            label="Disabled Button"
            isDisabled={true}
            icon={FaSignature}
            type={ButtonType.Primary}
          />
        </div>

        <p className="mt-6 text-disabled dark:text-disabled-dark">
          This is a disabled text example with the disabled color.
        </p>

        <div className="mt-8 p-4 bg-gray-300 dark:bg-secondary-dark rounded-lg">
          <p className="text-text dark:text-text-dark">
            This section has a background that changes with the theme.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentGallery;
