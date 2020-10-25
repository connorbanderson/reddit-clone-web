import { Box, Link, Flex, Button, Heading } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { isSsr } from "../utils/isSsr";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isSsr(),
  });
  let body = null;
  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box color="white" mr={4}>
          {data.me.username}
        </Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          bg="#6C5B7B"
          color="white"
          size="xs"
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={1}
      bg="#355C7D"
      p={4}
      align="center"
    >
      <Flex
        width="100%"
        maxW={800}
        justifyContent="space-between"
        alignItems="center"
      >
        <NextLink href="/">
          <Link>
            <Heading color="white">RedditClone</Heading>
          </Link>
        </NextLink>
        <Box>{body}</Box>
      </Flex>
    </Flex>
  );
};

export { NavBar };
