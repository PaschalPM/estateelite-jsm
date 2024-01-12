"use client";
import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";
import getBase64 from "@/utils/getLocalBase64";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} mr={"1"}>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor={"pointer"}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} mr={"1"}>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor={"pointer"}
      />
    </Flex>
  );
};

type Props = {
  data: any[];
};
export default function ImageScrollbar({ data }: Props) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((image) => (
        <Box
          key={image.id}
          width={"910px"}
          itemID={image.id}
          overflow={"hidden"}
          p="1"
        >
          <Image
            placeholder="blur"
            blurDataURL={image.url}
            src={image.url}
            width={1000}
            height={500}
            alt="property"
            sizes="(max-width:500px) 100px, (max-width:1023px) 400px, 1000px "
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
