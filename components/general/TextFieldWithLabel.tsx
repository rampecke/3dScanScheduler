import { Dispatch, FunctionComponent, SetStateAction } from "react";

type TextFieldWithLabelProps = {
  className?: string;
  label: string;
  type: string;
  autoComplete?: string;
  value: string;
  changeValue: Dispatch<SetStateAction<string>>;
};

export const TextFieldWithLabel: FunctionComponent<TextFieldWithLabelProps> = (
  props
) => {
  const createId = props.label.replace(/\s/g, "-").toLowerCase();

  return (
    <div className={props.className}>
      <label
        htmlFor={createId}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1">
        <input
          value={props.value}
          onChange={(e) => props.changeValue(e.target.value)}
          type={props.type}
          name={createId}
          id={createId}
          autoComplete={props.autoComplete}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
        />
      </div>
    </div>
  );
};
