import React, { useState } from "react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../../components/Wrapper";
import { InputField } from "../../components/InputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          const errors = response.data?.changePassword.errors;
          if (errors) {
            const errorMap = toErrorMap(errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
        initialValues={{ newPassword: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
            />
            {tokenError && (
              <Box>
                <Text color="hotpink">{tokenError}</Text>
              </Box>
            )}
            <Flex mt={6} justifyContent="flex-end">
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="twitter"
              >
                Reset Password
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
