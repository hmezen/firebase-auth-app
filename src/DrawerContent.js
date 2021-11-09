import React, { useState, useEffect } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Button,
  Box,
  HamburgerIcon,
  Pressable,
  Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  Stack,
  ZStack,
  Avatar,
  IconButton,
  Image,
  Modal,
  Input,
  TextArea,
  useToast,
} from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../firebase/config";
import { useAuth } from "../firebase/firebaseprovider";

const DrawerContent = (props) => {
  const toast = useToast();
  const { user, setUser } = useAuth();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [updateProfilrIsLoading, setUpdateProfileIsloading] = useState(false);
  const [userDataToUpdate, setUserDataToUpdate] = useState({
    firstName: "",
    lastName: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (user) {
      const { roles, uid, email, ...rest } = user;
      setUserDataToUpdate({
        ...rest,
      });
    }
  }, [user]);

  const updateProfileSubmit = () => {
    setUpdateProfileIsloading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(user.email)
      .set({
        ...user,
        firstName: userDataToUpdate.firstName,
        lastName: userDataToUpdate.lastName,
        avatarUrl: userDataToUpdate.avatarUrl,
      })
      .then(() => {
        setModalIsVisible(false);
        toast.show({
          title: "Done !!",
          status: "success",
          description: "you have update your profile successfully!",
          duration: 4000,
        });
        setUser({
          ...user,
          firstName: userDataToUpdate.firstName,
          lastName: userDataToUpdate.lastName,
          avatarUrl: userDataToUpdate.avatarUrl,
        });
      })
      .catch((error) => {
        toast.show({
          title: "Failed Update user",
          status: "error",
          description: error.message,
          duration: null,
        });
      })
      .finally(() => {
        setUpdateProfileIsloading(false);
      });
  };

  return (
    <>
      {user ? (
        <Box bg="cyan.900" roundedBottomRight="3xl">
          <HStack
            h="110"
            space={3}
            alignItems="center"
            justifyContent="flex-start"
          >
            <ImageBackground
              imageStyle={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "white",
              }}
              style={{
                marginLeft: 5,
                width: 80,
                height: 80,
              }}
              source={{
                uri: user.avatarUrl
                  ? user.avatarUrl
                  : "https://gravatar.com/avatar/19aab877af27b7152fda303f7e5c1634?s=400&d=mp&r=x",
              }}
            >
              <IconButton
                position="absolute"
                right={"-10"}
                bottom={"50px"}
                bg="white"
                icon={<Entypo name="pencil" size={16} color="black" />}
                borderRadius="full"
                onPress={() => setModalIsVisible(true)}
              />
            </ImageBackground>
            <Box rounded="md">
              <Text fontWeight="bold" fontSize="lg" color="white">
                {user.firstName + " " + user.lastName}
              </Text>
              <Text color="white" fontSize="xs">
                {user.email}
              </Text>
            </Box>
          </HStack>
        </Box>
      ) : null}

      <DrawerContentScrollView {...props} safeArea>
        <VStack space="6" my="2" mx="1">
          <VStack divider={<Divider />} space="4">
            <VStack space="3">
              {props.state.routeNames.map((name, index) => (
                <Pressable
                  px="5"
                  py="3"
                  rounded="md"
                  bg={
                    index === props.state.index
                      ? "rgba(6, 182, 212, 0.1)"
                      : "transparent"
                  }
                  key={index}
                  onPress={(event) => {
                    props.navigation.navigate(name);
                    props.navigation.closeDrawer();
                  }}
                >
                  {({ isPressed }) => {
                    return (
                      <HStack
                        space="7"
                        alignItems="center"
                        style={{
                          // color: isPressed ? "primary.500" : "gray.500",
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                      >
                        {name.includes("Home") ? (
                          <FontAwesome
                            name="home"
                            color={
                              index === props.state.index
                                ? "#0e7490"
                                : isPressed
                                ? "#0e7490"
                                : "#71717a"
                            }
                            size={25}
                          />
                        ) : (
                          <MaterialIcons
                            name="add-to-home-screen"
                            color={
                              index === props.state.index
                                ? "#0e7490"
                                : isPressed
                                ? "#0e7490"
                                : "#71717a"
                            }
                            size={25}
                          />
                        )}

                        <Text
                          fontWeight="500"
                          color={
                            index === props.state.index
                              ? "cyan.700"
                              : isPressed
                              ? "#0e7490"
                              : "gray.700"
                          }
                        >
                          {name}
                        </Text>
                      </HStack>
                    );
                  }}
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
      {user ? (
        <>
          <Divider />
          <Box>
            <Pressable
              px="5"
              py="3"
              rounded="md"
              onPress={() => {
                props.navigation.closeDrawer();
                firebase.auth().signOut();
              }}
            >
              {({ isPressed }) => {
                return (
                  <HStack
                    space="7"
                    alignItems="center"
                    style={{
                      // color: isPressed ? "primary.500" : "gray.500",
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}
                  >
                    <Icon
                      color={isPressed ? "cyan.700" : "gray.500"}
                      size="5"
                      as={<Entypo name="log-out" color="black" />}
                    />
                    <Text
                      fontWeight="500"
                      color={isPressed ? "#0e7490" : "#71717a"}

                      // color={index === props.state.index ? "cyan.700" : "gray.700"}
                    >
                      Log Out
                    </Text>
                  </HStack>
                );
              }}
            </Pressable>
          </Box>
        </>
      ) : null}

      <Modal
        isOpen={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        size={"xl"}
      >
        <Modal.Content>
          <Modal.CloseButton />
          {/* <Modal.Header>Return Policy</Modal.Header> */}
          <Modal.Body>
            <VStack justifyContent="center" alignItems="center" space="8">
              <VStack alignItems="center" space="2">
                <Text fontSize="30px" fontWeight="700">
                  My profile
                </Text>
              </VStack>
            </VStack>
            <VStack
              space="2"
              marginLeft="12px"
              marginRight="12px"
              marginTop="25px"
            >
              <VStack>
                <Text color="muted.400" fontSize="12px" fontWeight="500">
                  First name
                </Text>

                <Input
                  size="xs"
                  variant="outline"
                  placeholder="First name"
                  value={userDataToUpdate.firstName}
                  onChangeText={(text) =>
                    setUserDataToUpdate({
                      ...userDataToUpdate,
                      firstName: text,
                    })
                  }
                />
              </VStack>
              <VStack>
                <Text color="muted.400" fontSize="12px" fontWeight="500">
                  Last name
                </Text>

                <Input
                  size="xs"
                  variant="outline"
                  placeholder="Last name"
                  value={userDataToUpdate.lastName}
                  onChangeText={(text) =>
                    setUserDataToUpdate({
                      ...userDataToUpdate,
                      lastName: text,
                    })
                  }
                />
              </VStack>
              <VStack>
                <Text color="muted.400" fontSize="12px" fontWeight="500">
                  Avatar URL
                </Text>
                <TextArea
                  numberOfLines={4}
                  placeholder="Avatar URL"
                  value={userDataToUpdate.avatarUrl}
                  onChangeText={(text) =>
                    setUserDataToUpdate({
                      ...userDataToUpdate,
                      avatarUrl: text,
                    })
                  }
                />
              </VStack>
            </VStack>
            <VStack
              space="8"
              marginLeft="12px"
              marginRight="12px"
              marginTop="25px"
            >
              <Button
                isLoading={updateProfilrIsLoading}
                _loading={{
                  bg: "cyan.900",
                  _text: {
                    color: "white",
                  },
                }}
                _spinner={{
                  color: "white",
                }}
                isLoadingText="pelase wait"
                bg="cyan.900"
                onPress={(e) => updateProfileSubmit()}
              >
                Update profile
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  avatar: {
    width: "80px",
    height: "80px",
  },
});
