import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      {
        showProfileData &&  (
          <Box mr="4" textAlign="right">
            <Text>Cauê Nishijima</Text>
            <Text color="gray.300" fontSize="small">caue1987@gmail.com</Text>
          </Box>
        )      
      }

      <Avatar size="md" name="Cauê Nishijima" src="https://github.com/cauenishijima.png"></Avatar>
    </Flex>  
  )
}