import Input from "../atoms/Input";
import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";

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
  return (
    <>
      <Label text={label} />
      {type === InputType.Input ? (
        <Input placeholder={placeholder} />
      ) : (
        <TextArea placeholder={placeholder} />
      )}
    </>
  );
};

export default FormField;
