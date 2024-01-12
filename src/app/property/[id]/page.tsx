import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { fetchApi } from "@/utils/fetchApi";

import React from "react";
import ImageScrollbar from "@/components/ImageScrollbar";

type Props = {
  params: {
    id: string;
  };
};
export default async function PropertyDetailsPage({ params }: Props) {
  const property = await fetchApi(`/properties/detail?externalID=${params.id}`);
  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  } = property;

  console.log(amenities);
  return (
    <Box maxWidth={"1000px"} margin={"auto"} p={"4"}>
      {photos && <ImageScrollbar data={photos} />}
      <Box w="full" p="6">
        <Flex
          paddingTop={"2"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex alignItems={"center"}>
            <Box paddingRight={"3"} color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight={"bold"} fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems={"center"}
          p="1"
          justifyContent={"space-between"}
          w={"250px"}
          color={"blue.400"}
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft
          <BsGridFill />
        </Flex>
        <Box marginTop={"2"}>
          <Text fontSize={"lg"} marginBottom={"2"} fontWeight={"bold"}>
            {title}
          </Text>
          <Text lineHeight={"2"} color="gray.600">
            {description}
          </Text>
        </Box>
        <Flex
          flexWrap={"wrap"}
          textTransform={"uppercase"}
          justifyContent={"space-between"}
        >
          <Flex
            justifyContent={"space-between"}
            w="400px"
            borderBottom={"1px"}
            borderColor={"gray.100"}
            p="3"
          >
            <Text> Type </Text>
            <Text fontWeight={"bold"}> {type} </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            w="400px"
            borderBottom={"1px"}
            borderColor={"gray.100"}
            p="3"
          >
            <Text> Purpose </Text>
            <Text fontWeight={"bold"}> {purpose} </Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent={"space-between"}
              w="400px"
              borderBottom={"1px"}
              borderColor={"gray.100"}
              p="3"
            >
              <Text> Furninshing State </Text>
              <Text fontWeight={"bold"}> {furnishingStatus} </Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length && (
            <>
              <Text fontSize={"2xl"} fontWeight={"black"} marginTop={"5"}>
                Amenities
              </Text>
              <Flex flexWrap={"wrap"}>
                {amenities.map((item: any) => {
                  return item.amenities.map((amenity: any) => (
                    <Text
                      key={amenity.text}
                      fontWeight={"bold"}
                      color="blue.400"
                      fontSize={"l"}
                      p="2"
                      bg="gray.200"
                      m="1"
                      borderRadius={"5"}
                    >
                      {amenity.text}
                    </Text>
                  ));
                })}
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export async function generateStaticParams() {
  const propertyForSaleData: any = await fetchApi(
    "/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6"
  );
  const propertyForRentData: any = await fetchApi(
    "/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6"
  );

  const [propertyForSale, propertyForRent] = await Promise.all([
    propertyForSaleData,
    propertyForRentData,
  ]);
  const properties = [...propertyForRent.hits, ...propertyForSale.hits];
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}