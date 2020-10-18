import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";

import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isSsr } from "../utils/isSsr";
import { useRouter } from "next/router";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
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
    <Flex
      position="sticky"
      top={0}
      zIndex={1}
      bg="#355C7D"
      p={4}
      justifyContent="flex-end"
    >
      <Box>{body}</Box>
    </Flex>
  );
};

export { NavBar };
