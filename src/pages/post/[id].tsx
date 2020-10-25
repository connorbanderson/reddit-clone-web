import { Heading, Flex } from "@chakra-ui/core";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";

const Post: NextPage<{}> = () => {
  const router = useRouter();
  const postId = router.query.id;
  const intId = typeof postId === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <Flex>loading...</Flex>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Flex>could not find post</Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Heading mb={4}>{data.post.title}</Heading>
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Flex>
      <span>{data.post.text}</span>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
