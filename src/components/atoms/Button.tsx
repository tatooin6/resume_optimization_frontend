import { IconType } from "react-icons";

interface ButtonProps {
  action: () => void;
  label: string;
  alternativeLabel?: string;
  isDisabled?: boolean;
  icon?: IconType;
  type?: ButtonType;
}

export enum ButtonType {
  Primary,
  Secondary,
  Accent,
  Warning,
  Error,
}

const Button = ({
  action,
  label,
  isDisabled = false,
  icon: IconComponent,
  type = ButtonType.Primary,
}: ButtonProps) => {
  const buttonType: Record<ButtonType, string> = {
    [ButtonType.Primary]:
      "bg-primary text-secondary-dark dark:bg-primary-dark dark:text-accent",
    [ButtonType.Secondary]:
      "bg-secondary dark:bg-accent text-primary-dark dark:text-secondary-dark",
    [ButtonType.Accent]:
      "bg-accent text-primary-dark dark:bg-accent-dark dark:text-secondary-dark",
    [ButtonType.Warning]: "bg-warning dark:bg-warning-dark text-white",
    [ButtonType.Error]: "bg-error dark:bg-error-dark text-white",
  };
  const buttonStyles = isDisabled
    ? "bg-disabled dark:bg-disabled-dark text-gray-100 dark:text-primary-dark"
    : `${buttonType[type]} cursor-pointer`;
  return (
    <button
      className={`px-4 py-2 rounded font-mono flex items-center space-x-2 ${buttonStyles}`}
      disabled={isDisabled}
      onClick={() => action()}
    >
      {IconComponent && <IconComponent className="text-2xl" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
