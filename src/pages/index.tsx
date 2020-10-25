import { Button, Flex, Stack } from "@chakra-ui/core";
import { Layout } from "../components/Layout";
import { PostCard } from "../components/PostCard";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Flex direction="column">
          <Flex mb={8} width="100%" justifyContent="flex-end">
            <Button onClick={() => router.push("/create-post")}>
              Create A Post
            </Button>
          </Flex>
          <Stack spacing={8}>
            {data!.posts.posts.map((p) => (!p ? null : <PostCard post={p} />))}
          </Stack>
        </Flex>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
