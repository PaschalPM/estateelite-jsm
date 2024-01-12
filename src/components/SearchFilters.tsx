"use client";
import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "@/utils/filterData";

export default function SearchFilters() {
  const [filters, setFilters] = useState(filterData);
  const activeFilters = useRef({} as Record<string, string>);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchProperties = (filterValues: any) => {
    const values = getFilterValues(filterValues);
    const params = new URLSearchParams(searchParams);
    values.forEach((item) => {
      if (item.value) {
        activeFilters.current[item.name] = item.value;
      }
    });
    for (let x in activeFilters.current) {
      params.set(x, activeFilters.current[x]);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Flex bg={"gray.100"} p="4" justifyContent={"center"} flexWrap={"wrap"}>
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w={"fit-content"}
            p={"2"}
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
}
