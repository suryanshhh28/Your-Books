import React, { useState } from "react";
import {
  Box,
  HStack,
  Heading,
  Image,
  VStack,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "./Card";
import Error from "./Error";

const Main = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyCHdOMklzkytRHtpLrnJt3Kyt6pQLG6TEw`
      );
      setBooks(data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  if (error) return <Error message={"Error while fetching books"} />;

  return (
    <div>
      <Box width={"100%"} height={"80vh"} bgColor={"black"}>
        <Stack
          direction={["column", "row"]}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          height={"100%"}
          fontFamily={"Signika Negative"}
        >
          <Image
            width={["80%", "50%"]}
            src={
              "https://purepng.com/public/uploads/large/purepng.com-opened-bookobjectsopened-bookbook-open-object-old-note-magazine-631522325964a0mqp.png"
            }
            alt="Books"
          />
          <VStack alignItems={"center"} paddingX={"4"}>
            <Heading fontFamily={"Signika Negative"} letterSpacing={"wide"} color={"white"}>
              Search Your Favourite Book📖
            </Heading>
            <HStack width={"100%"} paddingY={"4"}>
              <Input
                type="text"
                placeholder="Enter your book name..."
                border={"none"}
                borderBottom={"2px solid white"}
                borderRadius={"0"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                type={"button"}
                padding={"4"}
                transition={"all 0.5s"}
                color={"black"}
                bgColor={"white"}
                borderRadius={"8"}
                css={{
                  "&:hover": {
                    filter: "invert(1)",
                  },
                }}
                onClick={fetchBooks}
              >
                Search
              </Button>
            </HStack>
          </VStack>
        </Stack>
        <HStack
          wrap={"wrap"}
          justifyContent={"space-evenly"}
          bgColor={"black"}
          align={"flex-start"}
          paddingX={"4"}
        >
          {loading ? (
            <Box bgColor={"black"} height={"20vh"}></Box>
          ) : (
            books.map((index) => (
              <Card
                title={index.volumeInfo.title}
                author={
                  index.volumeInfo.authors
                    ? index.volumeInfo.authors[0]
                    : "Unknown"
                }
                infoLink={index.volumeInfo.previewLink}
              />
            ))
          )}
        </HStack>
      </Box>
    </div>
  );
};

export default Main;
