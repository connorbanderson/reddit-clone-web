import React from "react";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Heading } from "@chakra-ui/core";

import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import {
  useUpdatePostMutation,
  useMeQuery,
  usePostQuery,
} from "../../../generated/graphql";
import { useRouter } from "next/router";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const postId = useGetIntId();
  const [{ data: meData, fetching: meQueryFetching }] = useMeQuery();
  const [{ data: postData, fetching: postQueryFetching }] = usePostQuery({
    pause: postId === -1,
    variables: {
      id: postId,
    },
  });
  const [{}, updatePost] = useUpdatePostMutation();

  if (meQueryFetching || postQueryFetching) {
    return (
      <Layout>
        <Flex>loading...</Flex>
      </Layout>
    );
  }

  if (!postData?.post) {
    return (
      <Layout>
        <Flex>could not find post</Flex>
      </Layout>
    );
  }

  if (postData?.post.creator.id !== meData?.me?.id) {
    return (
      <Layout>
        <Heading>👀 I SEE YOU 👀</Heading>
        <Flex>You can't edit this post.</Flex>
      </Layout>
    );
  }
  return (
    <Layout variant="small">
      <Formik
        onSubmit={async (values) => {
          const { error } = await updatePost({
            id: postId,
            ...values,
          });
          !error && router.back();
        }}
        initialValues={{ title: postData.post.title, text: postData.post.text }}
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
                Update Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
