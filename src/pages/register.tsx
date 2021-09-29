import { useRegisterUserMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { Button, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import type { NextPage } from "next";
import Head from "next/head";

const Register: NextPage = () => {
  const [_, register] = useRegisterUserMutation();

  return (
    <>
      <Head>
        <title>Lireddit | Register</title>
      </Head>

      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async ({ username, password }) => {
            const registerUserCredentials = {
              username,
              password,
            };

            const { data } = await register({ registerUserCredentials });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4}>
                <InputField
                  label="Username:"
                  name="username"
                  placeholder="Enter your username"
                />

                <InputField
                  label="Password:"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />

                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Register;
