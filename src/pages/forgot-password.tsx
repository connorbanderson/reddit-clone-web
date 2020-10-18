import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { Box, Button, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
          setComplete(true);
        }}
        initialValues={{ email: "" }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if and account with that email exists, we sent you an email
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
              <Box mt={6}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="twitter"
                >
                  Forgot Password
                </Button>
              </Box>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
