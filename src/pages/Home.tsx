import { ThemeSwitcher } from "../components/atoms/ThemeSwitcher";
import FileUpload from "../components/atoms/FileUpload";
import FormField, { InputType } from "../components/molecules/FormField";
import Button, { ButtonType } from "../components/atoms/Button";

const Home = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-sans font-thin text-text dark:text-secondary">
          Resume Optimizer
        </h1>
        <ThemeSwitcher />
      </div>
      <div className="mb-6">
        <div className="my-8 p-6 w-1/3 bg-gray-400 dark:bg-primary-dark rounded-lg">
          <div className="my-4">
            <FileUpload />
          </div>

          <div className="my-4">
            <Button
              action={() => alert("Secondary")}
              label="Convert to .md"
              isDisabled={false}
              type={ButtonType.Accent}
            />
          </div>
          <div>
            <FormField
              label="Job Description"
              placeholder="Insert Job Description"
              type={InputType.TextArea}
            />
          </div>
          <div className="mt-6">
            <Button
              action={() => alert("Accent")}
              label="Optimize"
              isDisabled={false}
              type={ButtonType.Secondary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
