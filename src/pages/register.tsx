import { useRegisterUserMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { Button, Stack } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import type { NextPage } from "next";
import Head from "next/head";

const Register: NextPage = () => {
  const router = useRouter();
  const [_, register] = useRegisterUserMutation();

  return (
    <>
      <Head>
        <title>Lireddit | Register</title>
      </Head>

      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async ({ username, password }, { setErrors }) => {
            const registerUserCredentials = {
              username,
              password,
            };

            const { data } = await register({ registerUserCredentials });

            if (!!data?.registerUser.errors) {
              setErrors(toErrorMap(data.registerUser.errors));
            } else if (data?.registerUser.user) {
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
