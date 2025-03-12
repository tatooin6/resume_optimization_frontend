const Input = () => {
  return (
    <div>
      <label className="mb-2 text-base dark:text-text-dark block">
        Input Label
      </label>
      <input
        type="text"
        placeholder="Medium Input"
        className="px-4 py-2.5 text-primary rounded-md bg-gray-300 text-secondary-dark dark:bg-secondary-dark dark:text-text-dark border border-primary w-full outline-blue-500"
      />
    </div>
  );
};

export default Input;
