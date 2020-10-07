import React from "react";
import { Flex } from "@chakra-ui/core";

export const WordsContainer = ({ children }) => (
  <Flex background="gray.100" p={6} borderRadius={4} flexWrap="wrap" letterSpacing={1}>
    {children}
  </Flex>
);
