import { Box, Flex, Spinner } from "@chakra-ui/react";

export default function loading() {
  return (
    <Flex w={"100%"} top={"0"} justifyContent={"center"} p="2">
      <Spinner />
    </Flex>
  );
}
