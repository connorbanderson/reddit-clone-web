import React from "react";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { Box, Button, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { createUrqlClient } from "../utils/createUrqlClient";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [{}, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          const errors = response.data?.login.errors;
          if (errors) {
            setErrors(toErrorMap(errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
        initialValues={{ usernameOrEmail: "", password: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Eail"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={2}>
              <NextLink href="/forgot-password">
                <Link>Forgot Password?</Link>
              </NextLink>
            </Box>

            <Box mt={6}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="twitter"
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
