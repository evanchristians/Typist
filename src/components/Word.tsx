import React from "react";
import { Text } from "@chakra-ui/core";

export const Word = ({ children, props = {} }) => (
  <Text display="inline" mr={3} fontSize={18} {...props}>
    {children}
  </Text>
);
