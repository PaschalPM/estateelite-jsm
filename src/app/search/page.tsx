import Property from "@/components/Property";
import { Box, Flex, Text } from "@chakra-ui/react";
import noresult from "@/assets/images/noresult.svg";
import Image from "next/image";
import { fetchApi } from "@/utils/fetchApi";
import SearchBox from "@/components/SearchBox";

type Props = {
  searchParams: any;
};
export default async function SearchPage({ searchParams }: Props) {
  const purpose = searchParams.purpose || "for-rent";
  const rentFrequency = searchParams.rentFrequency || "yearly";
  const minPrice = searchParams.minPrice || "0";
  const maxPrice = searchParams.maxPrice || "1000000";
  const roomsMin = searchParams.roomsMin || "0";
  const bathsMin = searchParams.bathsMin || "0";
  const sort = searchParams.sort || "price-desc";
  const areaMax = searchParams.areaMax || "35000";
  const locationExternalIDs = searchParams.locationExternalIDs || "5002";
  const categoryExternalID = searchParams.categoryExternalID || "4";
  // prettier-ignore
  const data = await fetchApi(
    `/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );
  const properties = await data?.hits;

  return (
    <Box>
      <SearchBox />
      <Text fontSize="2xl" p="4" fontWeight={"bold"}>
        Properties {searchParams.purpose}
      </Text>
      <Flex flexWrap={"wrap"} justifyContent={"space-around"}>
        {properties &&
          properties.map((property: any) => (
            <Property property={property} key={property.id} />
          ))}
      </Flex>
      {properties && properties.length === 0 && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          marginTop={"5"}
          marginBottom={"5"}
        >
          <Image
            alt="no result"
            src={noresult}
            priority
            style={{ width: "auto" }}
          />
          <Text fontSize="2xl" marginTop={"3"}>
            {" "}
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
}
