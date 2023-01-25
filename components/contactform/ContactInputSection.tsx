import { FunctionComponent, useState } from "react";
import { TextFieldWithLabel } from "../general/TextFieldWithLabel";

type ContactInputSectionProps = {
  className?: string;
};

export const ContactInputSection: FunctionComponent<
  ContactInputSectionProps
> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className={props.className}>
      <TextFieldWithLabel
        value={firstName}
        changeValue={setFirstName}
        className="pb-3"
        label={"Vorname"}
        type={"text"}
        autoComplete={"given-name"}
      ></TextFieldWithLabel>
      <TextFieldWithLabel
        value={lastName}
        changeValue={setLastName}
        className="pb-3"
        label={"Nachname"}
        type={"text"}
        autoComplete={"family-name"}
      ></TextFieldWithLabel>
      <TextFieldWithLabel
        value={email}
        changeValue={setEmail}
        className="pb-3"
        label={"E-Mail"}
        type={"email"}
        autoComplete={"email"}
      ></TextFieldWithLabel>
      <TextFieldWithLabel
        value={phone}
        changeValue={setPhone}
        label={"Telefonnummer"}
        type={"tel"}
        autoComplete={"tel"}
      ></TextFieldWithLabel>
    </div>
  );
};
