import React, { useState } from "react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Text, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Wrapper } from "../../components/Wrapper";
import { InputField } from "../../components/InputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage<{}> = ({}) => {
  const router = useRouter();
  const token = router.query?.token;
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof token === "string" ? token : "",
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
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
            />
            {tokenError && (
              <Flex>
                <Text mr={2} color="hotpink">
                  {tokenError}
                </Text>
                <NextLink href="/forgot-password">
                  <Link>click here get a new one</Link>
                </NextLink>
              </Flex>
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

export default withUrqlClient(createUrqlClient)(ChangePassword);
