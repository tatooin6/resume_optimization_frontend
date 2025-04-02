import { MonacoDiffEditor } from "../components/atoms/MonacoDiffEditor/MonacoDiffEditor";
import { ThemeSwitcher } from "../components/atoms/ThemeSwitcher";
import ResumeUploadSection from "../components/organisms/ResumeUploadSection";
import { useResumeContext } from "../contexts/ResumeContext";

const Home = () => {
  const { state } = useResumeContext();
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
          <ResumeUploadSection />
        </div>
        <div className="w-full p-5 h-[600px]">
          <MonacoDiffEditor text={state.outputText} />
        </div>
      </div>
    </div>
  );
};
// <span>{state.outputText}</span>
export default Home;
