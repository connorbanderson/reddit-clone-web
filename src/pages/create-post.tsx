import React from "react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { useCreatePostMutation } from "../generated/graphql";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [{}, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          !error && router.push("/");
        }}
        initialValues={{ title: "", text: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="test..."
                label="Body"
              />
            </Box>
            <Box mt={6}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="twitter"
              >
                Create Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
