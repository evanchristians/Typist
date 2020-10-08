import React from "react";
import { Flex } from "@chakra-ui/core";

export const InfoBox = ({ children, minWidth = 0, bg = "grey.100", color="black" }) => {
  return (
    <Flex
      height={46}
      my={4}
      px={4}
      justifyContent="center"
      alignItems="center"
      borderRadius={12}
      bg={bg}
      minWidth={minWidth}
      display="inline-flex"
      color={color}
    >
      {children}
    </Flex>
  );
};
