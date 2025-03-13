interface TextAreaProps {
  placeholder: string;
}

const TextArea = ({ placeholder = "" }: TextAreaProps) => {
  return (
    <textarea
      className="text-base w-full h-32 p-2 rounded-md border border-primary focus:outline-none focus:border-blue-500 bg-gray-300 dark:bg-secondary-dark dark:text-text-dark"
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
