import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { Button, Flex, Stack, Box, Heading, Text } from "@chakra-ui/core";

import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  const [{ data }] = usePostsQuery({ variables: { limit: 25 } });

  return (
    <Layout>
      <Flex pl="4" pr="4" width="100%" justifyContent="flex-end">
        <Button onClick={() => router.push("/create-post")}>
          Create A Post
        </Button>
      </Flex>
      <Stack spacing={8}>
        {data?.posts.map((p) => (
          <Box key={p.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
          </Box>
        ))}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
