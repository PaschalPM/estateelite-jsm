import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ChakraProvider>{children}</ChakraProvider>
    </>
  );
}
