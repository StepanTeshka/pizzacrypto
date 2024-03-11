import { PropsWithChildren, SyntheticEvent } from "react";

const buttonClassesByVariant = {
  primary: `bg-[#FF7400] text-white px-4 py-2 rounded-lg`,
};

type TButtonProps = PropsWithChildren<{
  variant?: keyof typeof buttonClassesByVariant;
  className?: string;
  type?: `button` | `submit`;
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  disabled?: boolean;
  dataTestId?: string;
  tabIndex?: 0 | -1;
  name?: string;
}>;

const Button = ({
  variant = `primary`,
  children,
  className = ``,
  type = `button`,
  onClick,
  ariaLabel,
  disabled,
  dataTestId,
  tabIndex,
  name,
}: TButtonProps) => {
  return (
    <button
      type={type}
      className={
        variant ? `${className} ${buttonClassesByVariant[variant]}` : className
      }
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      data-testid={dataTestId}
      tabIndex={tabIndex}
      name={name}
    >
      {children}
    </button>
  );
};

export default Button;

type TSubmitLoadingButtonProps = Pick<
  TButtonProps,
  `children` | `type` | `variant` | `onClick` | `className` | `disabled`
> & { isLoading?: boolean };

export const SubmitLoadingButton = ({
  isLoading,
  children,
  type = `submit`,
  variant = `primary`,
  onClick,
  className = ``,
  disabled,
}: TSubmitLoadingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      type={type}
      disabled={isLoading || disabled}
      className={`flex-center ${className}`}
      dataTestId="submit-button"
    >
      {isLoading ? `` : children}
    </Button>
  );
};
