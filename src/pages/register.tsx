import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper>
      <Formik
        onSubmit={(e) => console.log("onSubmit", e)}
        initialValues={{ userName: "", password: "" }}
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
