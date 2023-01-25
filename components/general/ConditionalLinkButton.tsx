import { FunctionComponent } from "react";
import Link from "next/link";

type ConditionalLinkButtonProps = {
  className?: string;
  href: string;
  condition: boolean;
  children: any;
  query?: any;
};

export const ConditionalLinkButton: FunctionComponent<
  ConditionalLinkButtonProps
> = ({ className, href, condition, children, query }) => {
  return (
    <div>
      {condition ? (
        <Link
          href={{
            pathname: href,
            query,
          }}
        >
          <div className={`${className}`}>{children}</div>
        </Link>
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
