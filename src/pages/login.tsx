import { useLoginMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { Button, Stack } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import type { NextPage } from "next";
import Head from "next/head";

const Login: NextPage = () => {
  const router = useRouter();
  const [_, login] = useLoginMutation();

  return (
    <>
      <Head>
        <title>Lireddit | Login</title>
      </Head>

      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async ({ username, password }, { setErrors }) => {
            const loginCredentials = {
              username,
              password,
            };

            const { data } = await login({ loginCredentials });

            if (!!data?.login.errors) {
              setErrors(toErrorMap(data.login.errors));
            } else if (data?.login.user) {
              router.push("/");
            }
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
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Login;
