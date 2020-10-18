import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { Button, Flex } from "@chakra-ui/core";

import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      <Flex pl="4" pr="4" width="100%" justifyContent="flex-end">
        <Button onClick={() => router.push("/create-post")}>
          Create A Post
        </Button>
      </Flex>
      {data?.posts.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
