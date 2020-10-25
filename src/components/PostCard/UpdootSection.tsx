import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { Post, useVoteMutation } from "../../generated/graphql";

interface UpdootSectionProps {
  post: Post;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const handleVote = async (value: number) => {
    setLoadingState(value === -1 ? "downdoot-loading" : "updoot-loading");
    await vote({ postId: post.id, value });
    setLoadingState("not-loading");
  };
  const hasUpvoted = post.voteStatus === 1;
  const hasDownvoted = post.voteStatus === -1;
  return (
    <Flex direction="column" alignItems="center" mr={6}>
      <IconButton
        isDisabled={hasUpvoted}
        variantColor={hasUpvoted ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
        onClick={() => !handleVote(1)}
        aria-label="up-vote post"
        icon="chevron-up"
        size="xs"
      />
      {post.points}
      <IconButton
        isDisabled={hasDownvoted}
        variantColor={hasDownvoted ? "red" : undefined}
        isLoading={loadingState === "downdoot-loading"}
        onClick={() => handleVote(-1)}
        aria-label="down-vote post"
        icon="chevron-down"
        size="xs"
      />
    </Flex>
  );
};

export { UpdootSection };
