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
      {condition ? (
        <button className={`${className}`} type="button" onClick={onClick}>
          {children}
        </button>
      ) : (
        <div
          className={`${className} cursor-default select-none bg-opacity-50`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
