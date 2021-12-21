import { Box,  Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";


interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page:number) => void;
}

const siblingsCount = 2;


export default function Pagination({
  totalCountOfRegisters, 
  registerPerPage = 10, 
  currentPage = 1, 
  onPageChange
}: PaginationProps) {

  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);

  const previousPages = currentPage > 1
    ? [...new Array(siblingsCount)].map((_, index) => currentPage - index - 1).filter(page => page >= 1).sort((a,b) => a - b)
    : [];

  const nextPages = currentPage < lastPage
    ? [...new Array(siblingsCount)].map((_, index) => currentPage + index + 1).filter(page => page <= lastPage)
    : [];

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{(currentPage - 1) * registerPerPage + 1}</strong> - <strong>{currentPage * registerPerPage}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {
          currentPage !== 1 && !previousPages.some(page => page === 1) && (
            <>
              <PaginationItem number={1} onPageChange={onPageChange}/>

              {((currentPage - siblingsCount - 1) > 1) && <Text color="gray.300" width="8" textAlign="center">...</Text>}
            </>
          )
        }


        {
          previousPages.length > 0 && previousPages.map(page => {
            return <PaginationItem key={page} number={page} onPageChange={onPageChange}/>
          })
        }

        <PaginationItem number={currentPage} isCurrent />

        {
          nextPages.length > 0 && nextPages.map(page => {
            return <PaginationItem key={page} number={page} onPageChange={onPageChange}/>
          })
        }

        {
          currentPage !== lastPage && !nextPages.some(page => page === lastPage) && (
            <>
              {(currentPage + siblingsCount + 1 < lastPage) && <Text color="gray.300" width="8" textAlign="center">...</Text>}
              <PaginationItem number={lastPage} onPageChange={onPageChange}/>
            </>
          )
        }
         
      </Stack>  
    </Stack>  
  )
}