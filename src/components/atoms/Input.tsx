interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
}
const Input = ({ placeholder = "", value }: InputProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2.5 text-primary rounded-md bg-gray-300 text-secondary-dark dark:bg-secondary-dark dark:text-text-dark border border-primary w-full outline-blue-500"
        value={value}
      />
    </div>
  );
};

export default Input;
