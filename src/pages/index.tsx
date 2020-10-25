import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useState } from "react";
import { PostCard } from "../components/PostCard";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const router = useRouter();
  const [{ data, fetching }] = usePostsQuery({ variables });

  return (
    <Layout>
      <Flex mb={8} width="100%" justifyContent="flex-end">
        <Button onClick={() => router.push("/create-post")}>
          Create A Post
        </Button>
      </Flex>
      <Stack spacing={8}>
        {data?.posts.posts?.map((post) =>
          !post ? null : <PostCard post={post} />
        )}
      </Stack>
      {data && data.posts.hasMore && (
        <Flex m={8} width="100%" justifyContent="center">
          <Button
            onClick={() => {
              setVariables({
                ...variables,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
