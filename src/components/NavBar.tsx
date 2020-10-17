import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";

import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isSsr } from "../utils/isSsr";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: isLogoutMutationFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isSsr(),
  });
  let body = null;
  if (fetching) {
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
          onClick={() => {
            logout();
          }}
          isLoading={isLogoutMutationFetching}
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
    <Flex bg="#355C7D" p={4} justifyContent="flex-end">
      <Box>{body}</Box>
    </Flex>
  );
};

const WrappedNavBar = withUrqlClient(createUrqlClient)(NavBar);

export { WrappedNavBar as NavBar };
