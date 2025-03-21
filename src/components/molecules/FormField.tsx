import { useState } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";

import { useResumeContext, ActionTypes } from "../../contexts/ResumeContext";

export enum InputType {
  Input = "INPUT",
  TextArea = "TEXTAREA",
}

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type: InputType;
}

const FormField = ({ label, placeholder = "", type }: FormFieldProps) => {
  const { state, dispatch } = useResumeContext();
  return (
    <>
      <Label text={label} />
      {type === InputType.Input ? (
        <Input
          placeholder={placeholder}
          value={state.jobDescription}
          onChange={(value) =>
            dispatch({ type: ActionTypes.SET_JOB_DESCRIPTION, payload: value })
          }
        />
      ) : (
        <TextArea
          placeholder={placeholder}
          value={state.jobDescription}
          onChange={(value) =>
            dispatch({ type: ActionTypes.SET_JOB_DESCRIPTION, payload: value })
          }
        />
      )}
    </>
  );
};

export default FormField;
