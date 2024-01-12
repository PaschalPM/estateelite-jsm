"use client";

import { Box, Text } from "@chakra-ui/react";

type Props = {
  error: Error;
};
export default function ErrorBoundary({ error }: Props) {
  return (
    <Box>
      <Text textAlign={"center"} fontSize={"3xl"} p={"3"}>
        Oops!!! Something went wrong.
      </Text>
    </Box>
  );
}
