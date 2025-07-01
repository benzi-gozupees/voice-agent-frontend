import { Checkbox, Form } from "@nextui-org/react";
import { Field, Formik } from "formik";
import { Link } from "react-router-dom";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
import PasswordInput from "@components/atomic/PasswordInput";

import { loginSchema } from "../../schema";
import { useLogin } from "../../hooks/useLogin";

function LoginForm() {
  const { handleLogin } = useLogin();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: "",
        password: "",
        remember: true,
      }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="mt-4 pt-2">
          <div className="flex flex-col gap-4 w-full">
            <h4 className="text-xl font-medium pb-2 font-inter text-center">
              Login
            </h4>
            <Input name="email" placeholder="Email" type="email" />
            <PasswordInput
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button
              color="primary"
              // disabled={!isValid}
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
            <div className="flex justify-between my-2 mb-5">
              <Field name="remember">
                {({ field }: any) => (
                  <Checkbox
                    {...field}
                    classNames={{
                      icon: "text-light",
                      label: "text-sm whitespace-nowrap font-roboto font-light",
                    }}
                    isSelected={field.value}
                  >
                    Keep us logged in
                  </Checkbox>
                )}
              </Field>
              <Link
                className="text-sm font-roboto font-normal text-primary ml-1"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
