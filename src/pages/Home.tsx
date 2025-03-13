import { ThemeSwitcher } from "../components/atoms/ThemeSwitcher";
import FileUpload from "../components/atoms/FileUpload";
import FormField, { InputType } from "../components/molecules/FormField";
import Button, { ButtonType } from "../components/atoms/Button";

const Home = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="flex flex-row text-3xl font-sans font-thin text-text dark:text-secondary">
          <img src="logo.svg" className="pr-3" alt="logo" />
          Resume Optimizer
        </h1>
        <ThemeSwitcher />
      </div>

      <div className="flex md:flex-row flex-col h-dvh flex-1 items-center justify-between">
        <div className="flex flex-col justify-center items-start h-fit my-8 p-6 md:w-1/3 md-full bg-gray-400 dark:bg-primary-dark rounded-lg">
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

        <div className="bg-accent md:w-2/3 w-full flex-grow flex items-center justify-center h-full">
          <span>output</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
