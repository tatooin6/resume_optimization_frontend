import { useReducer, createContext, ReactNode, useContext } from "react";

interface State {
  selectedFile: File | null;
  markdownText: string;
  jobDescription: string;
  outputText: string;
}

export enum ActionTypes {
  SET_SELECTED_FILE = "SET_SELECTED_FILE",
  SET_MARKDOWN_TEXT = "SET_MARKDOWN_TEXT",
  SET_JOB_DESCRIPTION = "SET_JOB_DESCRIPTION",
  SET_OUTPUT_TEXT = "SET_OUTPUT_TEXT",
}

type Action =
  | { type: ActionTypes.SET_SELECTED_FILE; payload: File }
  | { type: ActionTypes.SET_MARKDOWN_TEXT; payload: string }
  | { type: ActionTypes.SET_JOB_DESCRIPTION; payload: string }
  | { type: ActionTypes.SET_OUTPUT_TEXT; payload: string };

const initialState: State = {
  selectedFile: null,
  markdownText: "",
  jobDescription: "",
  outputText: "",
};

const resumeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_SELECTED_FILE:
      return { ...state, selectedFile: action.payload };
    case ActionTypes.SET_MARKDOWN_TEXT:
      return { ...state, markdownText: action.payload };
    case ActionTypes.SET_JOB_DESCRIPTION:
      return { ...state, jobDescription: action.payload };
    case ActionTypes.SET_OUTPUT_TEXT:
      return { ...state, outputText: action.payload };

    default:
      return state;
  }
};

const ResumeContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider.");
  }
  return context;
};

export default ResumeContext;
