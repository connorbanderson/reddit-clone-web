import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [{}, register] = useRegisterMutation();
  return (
    <Wrapper>
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          const errors = response.data?.register.errors;
          if (errors) {
            setErrors(toErrorMap(errors));
          }
        }}
        initialValues={{ username: "", password: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={6}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="twitter"
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
