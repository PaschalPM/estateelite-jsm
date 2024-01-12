"use client"

import { useState } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import SearchFilters from "@/components/SearchFilters";
import { BsFilter } from "react-icons/bs";


export default function SearchBox() {
    const [searchFilters, setSearchFilters] = useState(false);

    return (
        <>
            <Flex
                cursor={"pointer"}
                bg={"gray.100"}
                borderBottom={"1px"}
                borderColor={"gray.200"}
                p="2"
                fontWeight={"black"}
                fontSize={"lg"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text> Search Property By Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter}></Icon>
            </Flex>
            {searchFilters && <SearchFilters />}
        </>
    )
}
