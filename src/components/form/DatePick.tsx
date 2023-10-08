import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextError from "./TextError";
import { fieldProps } from "./type";

const DatePick = ({
  label,
  name,
  more,
  placeholder,
  required,
  ...rest
}: fieldProps) => {
  // const {label, name, ...rest} = props
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const currentDateTime = dayjs();
  //   console.log(currentDateTime)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-bold" htmlFor={name}>
          {label}
          {required && <span className="text-red-500 pl-1.5 text-lg">*</span>}
        </label>
      </div>
      <div className="flex flex-grow w-full justify-center items-center">
        <Field name={name}>
          {({ form, field }: { form: any; field: any }) => {
            const { setFieldValue } = form;
            const { value } = field;
            if (!value) {
              const defaultDate = dayjs();
              setFieldValue(name, defaultDate);
            }
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  id={name}
                  {...field}
                  {...rest}
                  label="Select end date"
                  className=" border-active rounded-full"
                  // ampm={false}
                  value={value}
                  onChange={(val: any) => setFieldValue(name, val)}
                  minDateTime={currentDateTime}
                  format="DD MMM YYYY hh:mm a"
                  slotProps={{
                    toolbar: {
                      sx: {
                        "& .MuiPickersToolbarText-root.Mui-selected": {
                          color: "#4355b6 !important",
                        },
                        "& .css-ollblj-MuiDateTimePickerToolbar-amPmSelection .MuiDateTimePickerToolbar-ampmLabel":
                          {
                            fontSize: "18px",
                          },
                      },
                    },
                    day: {
                      sx: {
                        color: "#4355b6 ",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            );
          }}
        </Field>
      </div>
      <ErrorMessage name={name}>
        {(errorMsg: any) => <TextError>{errorMsg}</TextError>}
      </ErrorMessage>
    </div>
  );
};

export default DatePick;
