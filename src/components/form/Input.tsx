import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { fieldProps } from "./type";
import TextError from "./TextError";

const Input = ({ label, name, more, required, ...rest }: fieldProps) => {
  return (
    <div className="flex flex-col  gap-2">
      <div className="flex items-center gap-2">
        <label
          className="text-sm font-bold"
          style={{ whiteSpace: "nowrap" }}
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-500 pl-1.5 text-lg">*</span>}
        </label>
      </div>
      <div className="px-4">
        <Field
          id={name}
          name={name}
          {...rest}
          className="outline-none border border-inactive w-full focus:border-active py-3.5 spin-button-none  bg-input px-4 rounded-xl"
        />
        <ErrorMessage name={name}>
          {(errorMsg: any) => <TextError>{errorMsg}</TextError>}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default Input;
