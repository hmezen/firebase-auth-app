import React from "react";
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  VStack,
  Container,
  ScrollView,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import WelcomeImage from "../../assets/welcome_my_app.png";

const HomeScreen = () => {
  return (
    <ScrollView bg="white">
      <Box>
        {/* <Box w="100px" h="100px">
         
          <Image src={{ uri: WelcomeImage }} alt="image" />
        </Box> */}

        <Image
          alt="hello"
          width="100%"
          height="350px"
          // resizeMode="cover"
          source={WelcomeImage}
        />

        <Box marginLeft="2" marginRight="2" bg="gray.100" borderRadius="3xl">
          <Stack space="2" p="4">
            <Box justifyContent="center" alignItems="center">
              <Heading fontWeight="medium">
                Welcome to {""}
                <Text color="cyan.900" fontSize="3xl" fontWeight="bold">
                  my app!!
                </Text>
              </Heading>
            </Box>
            <Text fontSize="xl">
              Hi there, this is a react native app that will work as a template
              for my feature projects. the core feature of this app is the
              login/register/update profile system. this system is using
              Firebase SDK to manage the users' authentication, permissions, and
              profile data.
            </Text>
          </Stack>
        </Box>
      </Box>
    </ScrollView>

    // <Center>
    //   <Box marginTop="5" rounded="lg" overflow="hidden" width="sm" shadow={3}>
    //     <Box>
    //       <AspectRatio
    //       // ratio={16 / 9}
    //       >
    //         <Image
    //           source={{
    //             uri: WelcomeImage,
    //           }}
    //           alt="image"
    //         />
    //       </AspectRatio>
    //       {/* <Center
    //         bg="violet.500"
    //         _text={{ color: "white", fontWeight: "700", fontSize: "xs" }}
    //         position="absolute"
    //         bottom={0}
    //         px="3"
    //         py="1.5"
    //       >
    //         PHOTOS
    //       </Center> */}
    //     </Box>
    //     <Stack p="4" space={3}>
    //       <Stack space={2}>
    //         <Heading size="md" ml="-1">
    //           The Garden City
    //         </Heading>
    //         <Text
    //           fontSize="xs"
    //           _light={{ color: "violet.500" }}
    //           _dark={{ color: "violet.300" }}
    //           fontWeight="500"
    //           ml="-0.5"
    //           mt="-1"
    //         >
    //           The Silicon Valley of India.
    //         </Text>
    //       </Stack>
    //       <Text fontWeight="400">
    //         Bengaluru (also called Bangalore) is the center of India's high-tech
    //         industry. The city is also known for its parks and nightlife.
    //       </Text>
    //       <HStack alignItems="center" space={4} justifyContent="space-between">
    //         <HStack alignItems="center">
    //           <Text color="gray.500" fontWeight="400">
    //             6 mins ago
    //           </Text>
    //         </HStack>
    //       </HStack>
    //     </Stack>
    //   </Box>
    // </Center>
  );
};

export default HomeScreen;
