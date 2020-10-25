import { IconButton, Box } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtons {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtons> = ({
  id,
  creatorId,
}) => {
  const router = useRouter();
  const [, deletePost] = useDeletePostMutation();
  const [{ data }] = useMeQuery();
  if (data?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <IconButton
        mr={4}
        size="xs"
        icon="edit"
        aria-label="Edit Post"
        onClick={() => router.push(`/post/edit/${id}`)}
      />
      <IconButton
        size="xs"
        icon="delete"
        aria-label="Delete Post"
        onClick={() => deletePost({ id })}
      />
    </Box>
  );
};

export { EditDeletePostButtons };
