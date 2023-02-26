import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { TextFieldWithLabel } from "../general/TextFieldWithLabel";

type ContactInputSectionProps = {
  className?: string;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
};

export const ContactInputSection: FunctionComponent<
  ContactInputSectionProps
> = (props) => {
  return (
    <div className={props.className}>
      <TextFieldWithLabel
        value={props.firstName}
        changeValue={props.setFirstName}
        className="pb-3"
        label={"Vorname"}
        type={"text"}
        autoComplete={"given-name"}
      ></TextFieldWithLabel>
      <TextFieldWithLabel
        value={props.lastName}
        changeValue={props.setLastName}
        className="pb-3"
        label={"Nachname"}
        type={"text"}
        autoComplete={"family-name"}
      ></TextFieldWithLabel>
      <TextFieldWithLabel
        value={props.email}
        changeValue={props.setEmail}
        className="pb-3"
        label={"E-Mail"}
        type={"email"}
        autoComplete={"email"}
      ></TextFieldWithLabel>
      <TextFieldWithLabel
        value={props.phone}
        changeValue={props.setPhone}
        label={"Telefonnummer"}
        type={"tel"}
        autoComplete={"tel"}
      ></TextFieldWithLabel>
    </div>
  );
};
