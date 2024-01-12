import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { fetchApi } from "@/utils/fetchApi";
import Property from "@/components/Property";

type BannerProps = {
  purpose: string;
  imageUrl: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
  linkName: string;
  buttonText: string;
};
const Banner = ({
  purpose,
  imageUrl,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
}: BannerProps) => (
  <Flex
    flexWrap={"wrap"}
    justifyContent={"center"}
    alignItems={"center"}
    m={"10"}
  >
    <Image src={imageUrl} width={500} height={300} alt="banner" priority/>
    <Box p={"5"}>
      <Text color="gray.500" fontSize={"sm"} fontWeight={"medium"}>
        {purpose}
      </Text>
      <Text fontSize={"3xl"} fontWeight={"bold"}>
        {title1} <br />
        {title2}
      </Text>
      <Text
        color="gray.700"
        fontSize={"lg"}
        paddingBlock={"3"}
        fontWeight={"medium"}
      >
        {desc1} <br /> {desc2}
      </Text>
      <Button fontSize={"xl"} >
        <Link href={linkName}> {buttonText} </Link>
      </Button>
    </Box>
  </Flex>
);
export default async function Home() {
  const propertyForSaleData: any = await fetchApi('/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6')
  const propertyForRentData: any = await fetchApi('/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6')

  const [propertyForSale, propertyForRent] = await Promise.all([propertyForSaleData, propertyForRentData])

  return (
    <>
      <Box>

        <Banner
          purpose="RENT A HOME"
          title1="Rental Homes for"
          title2="Everyone"
          desc1="Explore Apartments, Villas, Homes"
          desc2="and more"
          buttonText="Explore Renting"
          linkName="/search?purpose=for-rent"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        />
        <Flex flexWrap={'wrap'} justifyContent={"space-around"}>
          {
            propertyForRent.hits.map((property: any) => <Property property={property} key={property.id} />)
          }
        </Flex>
        <Banner
          purpose="BUY A HOME"
          title1="Find, Buy & Own Your"
          title2="Dream Home"
          desc1="Explore Apartments, Villas, Homes"
          desc2="and more"
          buttonText="Explore Buying"
          linkName="/search?purpose=for-sale"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        />
      </Box>
      <Flex flexWrap={'wrap'} justifyContent={"space-around"}>
        {
          propertyForSale.hits.map((property: any) => <Property property={property} key={property.id} />)
        }
      </Flex>
    </>
  );
}