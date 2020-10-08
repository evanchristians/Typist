import React from "react";
import { Flex } from "@chakra-ui/core";

const Wrapper = ({ children }) => {
  return (
    <Flex
      minHeight="100vh"
      p={16}
      justifyContent="center"
      alignItems="stretch"
      flexDirection="column"
    >
      {children}
    </Flex>
  );
};

export default Wrapper;
