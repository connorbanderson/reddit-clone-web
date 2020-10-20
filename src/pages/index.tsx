import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const router = useRouter();
  const [{ data, fetching }] = usePostsQuery({ variables: { limit: 25 } });
  return (
    <Layout>
      <Flex mb={8} width="100%" justifyContent="space-between">
        <Heading>Reddit Clone</Heading>
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
      {data && (
        <Flex m={8} width="100%" justifyContent="center">
          <Button isLoading={fetching}>Load More</Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
