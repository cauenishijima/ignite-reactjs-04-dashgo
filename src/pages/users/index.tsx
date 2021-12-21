import { Link as ChakraLink, Box, IconButton, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

import { RiAddLine, RiPencilLine, RiRefreshFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import Pagination from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const {data, isLoading, isFetching, refetch, error} = useUsers(currentPage);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(idUser: string) {
    await queryClient.prefetchQuery(['user', idUser], async () => {
      const response = await api.get(`users/${idUser}`)

      return response.data;
    },{
      staleTime: 1000 * 60 * 10 //10 minutes
    })
  }

  return (
    <Box> 
      <Header />
      <Flex w="100%" my={["4", "6"]} maxWidth={1480} mx="auto" px={["4", "6"]}>
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p={["6", "8"]}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {(!isLoading && isFetching) && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>
            <div>
              <IconButton
                as="button"
                aria-label="Refresh data users"
                icon={<Icon as={RiRefreshFill} fontSize="2xl" color="teal.600" />}
                size="xl"
                onClick={() => refetch()}
                color="teal.600"
                mr="4"
              />


              <Link href='/users/create' passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </Link>
            </div>

          </Flex>

          {
            isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                Erro no carregamento das informações
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">

                  <Thead>
                    <Tr>
                      <Th px={["4", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>

                      <Th>
                        Usuário
                      </Th>

                      {isWideVersion && 
                        <Th>
                          Data de cadastro
                        </Th>
                      }

                      <Th width={["6", "8"]}>
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                  {
                    data.users.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "6"]} >
                          <Checkbox colorScheme="pink" /> 
                        </Td>

                        <Td>
                          <Box>
                            <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold">{user.name}</Text> 
                            </ChakraLink>
                            <Text fontSize="small" color="gray.300">{user.email}</Text> 
                          </Box>  
                        </Td>
        
                        {
                          isWideVersion && 
                            <Td>
                              <Text>{user.createdAt}</Text>
                            </Td> 
                        }
        
                        <Td>
                          {
                            isWideVersion ? 
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="teal"          
                                bg="teal.300"    
                                leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                              >
                                Editar
                              </Button>
                              :
                              <IconButton 
                                aria-label="Edit user"
                                as="a"
                                size="sm"
                                fontSize="sm"         
                                bg="teal.300"    
                                icon={<Icon as={RiPencilLine} fontSize="16"/>}
                              />
                          }
                        </Td>
                      </Tr>  
                    ))
                  }
                  </Tbody>
              
                </Table>
                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  registerPerPage={10}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </>
            )
          }
        </Box>
      </Flex>
    </Box>  
  )
}