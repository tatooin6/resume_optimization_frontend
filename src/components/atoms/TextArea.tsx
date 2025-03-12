const TextArea = () => {
  return (
    <textarea
      className="text-base w-full h-32 p-2 rounded-md border border-primary focus:outline-none focus:border-blue-500 dark:bg-secondary-dark dark:text-text-dark"
      placeholder="Insert your text here"
      id="textarea"
    ></textarea>
  );
};

export default TextArea;
