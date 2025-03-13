const Label = ({ text }: { text: string }) => {
  return (
    <label className="mb-2 text-base dark:text-text-dark block">{text}</label>
  );
};

export default Label;
