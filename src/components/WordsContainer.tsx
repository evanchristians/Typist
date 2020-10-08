import React from "react";
import { Flex } from "@chakra-ui/core";

export const WordsContainer = ({ children }) => (
  <Flex
    background="grey.100"
    p={6}
    borderRadius={12}
    flexWrap="wrap"
    letterSpacing={1}
    maxW={768}
    mx="auto"
  >
    {children}
  </Flex>
);
