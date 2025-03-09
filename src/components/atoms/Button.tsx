interface ButtonProps {
  action: () => void;
  label: string;
  alternativeLabel?: string;
  isDisabled?: boolean;
  icon?: string; // TODO: develop
  type?: ButtonType;
}

export enum ButtonType {
  Primary,
  Secondary,
  Accent,
  Warning,
  Error,
  Disabled,
}

const Button = ({
  action,
  label,
  isDisabled = false,
  type = ButtonType.Primary,
}: ButtonProps) => {
  const buttonType: Record<ButtonType, string> = {
    [ButtonType.Primary]:
      "bg-accent text-secondary-dark dark:bg-primary-dark dark:text-accent",
    [ButtonType.Secondary]:
      "bg-secondary dark:bg-accent text-primary-dark dark:text-secondary-dark",
    [ButtonType.Accent]:
      "bg-primary text-secondary dark:bg-accent-dark dark:text-secondary-dark",
    [ButtonType.Warning]: "bg-warning dark:bg-warning-dark text-white",
    [ButtonType.Error]: "bg-error dark:bg-error-dark text-white",
    [ButtonType.Disabled]:
      "bg-gray-300 dark:bg-secondary-dark text-gray-100 dark:text-primary-dark",
  };
  return (
    <button
      className={`px-4 py-2 rounded font-mono ${buttonType[type]}`}
      disabled={isDisabled}
      onClick={() => action()}
    >
      count is {label}
    </button>
  );
};

export default Button;
