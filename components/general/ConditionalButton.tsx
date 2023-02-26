import { FunctionComponent } from "react";
import Link from "next/link";

type ConditionalButtonProps = {
  className?: string;
  condition: boolean;
  children: any;
  onClick?: () => void;
};

export const ConditionalButton: FunctionComponent<ConditionalButtonProps> = ({
  className,
  condition,
  children,
  onClick,
}) => {
  return (
    <div>
      <button
        className={
          condition
            ? `${className}`
            : `${className} cursor-default select-none bg-opacity-50`
        }
        type="button"
        onClick={onClick}
        disabled={!condition}
      >
        {children}
      </button>
    </div>
  );
};
