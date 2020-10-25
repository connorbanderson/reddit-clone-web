import { Flex, Heading, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Post, useMeQuery } from "../../generated/graphql";
import { UpdootSection } from "./UpdootSection";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { id, title, creator, textSnippet } = post;
  const [{ data }] = useMeQuery();
  return (
    <Flex key={id} p={5} mb={3} shadow="md" borderWidth="1px">
      <UpdootSection post={post} />
      <Flex
        width="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <NextLink href={`/post/${id}`}>
            <Link>
              <Heading fontSize="xl">{title}</Heading>
            </Link>
          </NextLink>
          <Flex>
            <EditDeletePostButtons id={id} creatorId={creator.id} />
          </Flex>
        </Flex>
        <Text fontSize={12}>posted by: {creator.username}</Text>
        <Text mt={4}>{textSnippet}</Text>
      </Flex>
    </Flex>
  );
};

export { PostCard };
