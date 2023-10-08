"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import FormControl from "@/components/form/FormControl";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import * as Yup from "yup";

export default function Home() {
  const { data: session } = useSession();
  // console.log(session?.user.accessToken);
  const initialValues = {
    summary: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  const validationSchema = Yup.object({
    summary: Yup.string().required("Enter your summary/title"),
    description: Yup.string().required("Enter your Description"),
    startDate: Yup.string().required("Schedule start time"),
    endDate: Yup.string().required("Schedule end time"),
  });

  const onSubmit = async (values: any) => {
    // console.log(values);

    await fetch("/api/calendar  ", {
      method: "POST",
      headers: {
        ContentType: "application/x-www-form-urlencoded",
        Authorization: `Bearer  ${session?.user.accessToken}`,
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        console.log("error", data);
      });
  };
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className="flex flex-col gap-4">
            <FormControl
              control="input"
              name="summary"
              label="Summary"
              placeholder="Summary"
            />
            <FormControl
              control="input"
              name="description"
              label="Description"
              type="text"
              placeholder="Description"
            />
            <FormControl
              control="date"
              name="startDate"
              label="Start Date"
              type="text"
              placeholder="Choose Start Date"
            />
            <FormControl
              control="date"
              name="endDate"
              label="End Date"
              type="text"
              placeholder="Choose End Date"
            />

            <div className="flex flex-grow items-center py-2 justify-center w-full">
              <button
                disabled={!formik.isValid || formik.isSubmitting}
                className="btn btn-info  disabled:btn-disabled uppercase text-sm bg-primary rounded px-4 py-2 max-w-max "
                type="submit"
              >
                {formik.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <ButtonSpinner />
                    processing..
                  </span>
                ) : (
                  "schedule Meeting"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
