import { FunctionComponent } from "react";

type SplitScreenProps = {
  className?: string;
  left?: any;
  right?: any;
  showDivider?: boolean;
};

export const SplitScreen: FunctionComponent<SplitScreenProps> = (props) => {
  return (
    <div className={props.className}>
      <div className="mx-auto max-w-md px-4 sm:px-7 md:max-w-5xl md:px-6">
        <div
          className={`${
            props.showDivider ?? true ? "md:divide-x md:divide-gray-200" : ""
          } md:grid md:grid-cols-2`}
        >
          {props.left}
          {props.right}
        </div>
      </div>
    </div>
  );
};
