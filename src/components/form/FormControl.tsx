import React from "react";
import Input from "./Input";
import { formProps } from "./type";
import DatePick from "./DatePick";

const FormControl: React.FC<formProps> = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "date":
      return <DatePick {...rest} />;

    default:
      return null;
  }
};

export default FormControl;
