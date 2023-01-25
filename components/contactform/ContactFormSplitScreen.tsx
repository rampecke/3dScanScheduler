import { FunctionComponent, useState } from "react";
import { ConditionalLinkButton } from "../general";
import { SplitScreen } from "../general/SplitScreen";
import { CheckDateSection } from "./CheckDateSection";
import { ContactInputSection } from "./ContactInputSection";

type ContactFormFormSplitScreenProps = {
  className?: string;
  startDate?: Date;
  endDate?: Date;
};

export const ContactFormSplitScreen: FunctionComponent<
  ContactFormFormSplitScreenProps
> = (props) => {
  return (
    <div>
      <SplitScreen
        className={props.className}
        left={<ContactInputSection className="md:pr-14"></ContactInputSection>}
        right={
          <CheckDateSection
            className="mt-12 md:mt-0 md:pl-14"
            startDate={props.startDate}
            endDate={props.endDate}
          ></CheckDateSection>
        }
      ></SplitScreen>

      <ConditionalLinkButton href={"/"} condition={true}>
        True
      </ConditionalLinkButton>
    </div>
  );
};
