import { VStack, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Card = ({title, author, infoLink }) => {
  return (
    <a href={infoLink} target="blank">
      <VStack
        width={"100"}
        bgColor={"whiteAlpha.500"}
        shadow={"lg"}
        padding={"8"}
        borderRadius={"lg"}
        transition={"all 0.5s"}
        margin={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: "rgba(210,128,53,0.8)",
          },
        }}
      >
        <Heading size={"md"} noOfLines={"1"} color={"white"}>
          {title}
        </Heading>
        <Text noOfLines={1} color={"white"}>
          ~{author}
        </Text>
      </VStack>
    </a>
  );
};

export default Card;
