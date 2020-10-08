import React from "react";
import { Text } from "@chakra-ui/core";

export const Word = ({ children, isWrong = false, color = "black" }) => (
  <Text
    display="inline"
    mx={1}
    mb={1}
    fontSize={18}
    color={color}
    bg={isWrong ? "red.10" : "none"}
    borderRadius={4}
    lineHeight={1.2}
    px={.75}
  >
    {children}
  </Text>
);
