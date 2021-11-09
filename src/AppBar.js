import React, { useState } from "react";
import {
  VStack,
  HStack,
  Button,
  IconButton,
  Icon,
  Text,
  Box,
  StatusBar,
  Modal,
  Input,
  useToast,
  Avatar,
} from "native-base";
import { MaterialIcons, Ionicons, Foundation } from "@expo/vector-icons";
import firebase from "../firebase/config";
import { useAuth } from "../firebase/firebaseprovider";

const Appbar = ({ navigation, route }) => {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [loginRegisterIsLoading, setLoginRegisterIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginViewIsSelected, setLoginViewIsSelected] = useState(true);
  const [passwordInpustIsVisible, setPasswordInpustIsVisible] = useState(false);
  const [userLoginData, setuserLoginData] = useState({
    email: "",
    password: "",
  });
  const [userRegisterData, setuserRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSignIn = () => {
    setLoginRegisterIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(userLoginData.email, userLoginData.password)
      .then((responseUser) => {
        toast.show({
          title: "Login successfully ",
          status: "success",
          description: "Welcome back!!.",
          duration: 4000,
        });
        setModalVisible(false);
        setuserLoginData({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        toast.show({
          title: "Failed to login",
          status: "error",
          description: err.message,
          duration: null,
        });
      })
      .finally(() => {
        setLoginRegisterIsLoading(false);
      });
  };

  const handleSignUpUser = () => {
    setLoginRegisterIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        userRegisterData.email,
        userRegisterData.password
      )
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(userRegisterData.email)
          .set({
            firstName: userRegisterData.firstName,
            lastName: userRegisterData.lastName,
            roles: {
              isAdmin: false,
            },
            avatarUrl: "",
            email: res.user.email,
            uid: res.user.uid,
          })
          .then(() => {
            setUser({
              email: res.user.email,
              uid: res.user.uid,
              firstName: userRegisterData.firstName,
              lastName: userRegisterData.lastName,
              roles: {
                isAdmin: false,
              },
              avatarUrl: "",
            });
            setuserRegisterData({
              email: "",
              password: "",
              firstName: "",
              lastName: "",
            });
            setModalVisible(false);
            toast.show({
              title: "Sign up successfully!",
              status: "success",
              description: "Welcome!!.",
              duration: 4000,
            });
          });
      })
      .catch((err) => {
        toast.show({
          title: "Failed to sign up",
          status: "error",
          description: err.message,
          duration: null,
        });
      })
      .finally(() => {
        setLoginRegisterIsLoading(false);
      });
  };

  return (
    <>
      <StatusBar
        //  backgroundColor="#18181b"
        bg="cyan.900"
        barStyle="light-content"
      />
      <Box safeAreaTop backgroundColor="cyan.900" />
      <HStack
        bg="cyan.900"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <IconButton
            onPress={() => {
              navigation.toggleDrawer();
            }}
            icon={
              <Icon
                size="sm"
                as={<MaterialIcons name="menu" />}
                color="white"
              />
            }
          />
        </HStack>
        <Text
          // position="absolute"
          // style={{
          //   left: "44%",
          //   margin: "auto",
          // }}
          color="white"
          fontWeight="900"
        >
          {route.name}
        </Text>
        {!user ? (
          <Button
            _text={{
              color: "white",
            }}
            borderColor="white"
            size="xs"
            variant="outline"
            onPress={() => setModalVisible(true)}
          >
            Sign in
          </Button>
        ) : (
          <Avatar
            bg="cyan.900"
            source={{
              uri: user.avatarUrl
                ? user.avatarUrl
                : "https://gravatar.com/avatar/19aab877af27b7152fda303f7e5c1634?s=400&d=mp&r=x",
            }}
          >
            SS
          </Avatar>
        )}
      </HStack>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        size={"xl"}
      >
        <Modal.Content>
          <Modal.CloseButton />
          {/* <Modal.Header>Return Policy</Modal.Header> */}
          <Modal.Body>
            <VStack justifyContent="center" alignItems="center">
              <HStack
                mt="20px"
                mb="20px"
                bg="muted.200"
                rounded="xl"
                width="150px"
              >
                <Button
                  width="80px"
                  height="35px"
                  rounded="xl"
                  variant="outline"
                  bg={loginViewIsSelected ? "white" : "muted.200"}
                  borderColor="muted.200"
                  borderWidth="2"
                  onPress={() => setLoginViewIsSelected(true)}
                  _text={{
                    color: "cyan.900",
                  }}
                >
                  Log In
                </Button>
                <Button
                  _text={{
                    color: "cyan.900",
                  }}
                  width="80px"
                  height="35px"
                  rounded="xl"
                  variant="outline"
                  bg={!loginViewIsSelected ? "white" : "muted.200"}
                  borderColor="muted.200"
                  borderWidth="2"
                  onPress={() => setLoginViewIsSelected(false)}
                >
                  Register
                </Button>
              </HStack>
            </VStack>
            {loginViewIsSelected ? (
              <>
                <VStack justifyContent="center" alignItems="center" space="8">
                  <VStack alignItems="center" space="2">
                    <Text fontSize="12px" fontWeight="500" color="muted.400">
                      WELCOME BACK!
                    </Text>
                    <Text fontSize="30px" fontWeight="700">
                      Oh hi, Sign in here
                    </Text>

                    <Text
                      color="muted.400"
                      textAlign="center"
                      maxW="210"
                      fontSize="12px"
                      fontWeight="500"
                    >
                      Create an account so you can navigate to private content
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
                      Email address
                    </Text>
                    <Input
                      size="xs"
                      variant="outline"
                      placeholder="email"
                      value={userLoginData.email}
                      onChangeText={(text) =>
                        setuserLoginData({
                          ...userLoginData,
                          email: text,
                        })
                      }
                    />
                  </VStack>
                  <VStack>
                    <Text color="muted.400" fontSize="12px" fontWeight="500">
                      Password
                    </Text>
                    <Input
                      type={passwordInpustIsVisible ? "text" : "password"}
                      size="xs"
                      variant="outline"
                      InputRightElement={
                        <Icon
                          onPress={() =>
                            setPasswordInpustIsVisible(!passwordInpustIsVisible)
                          }
                          as={
                            <MaterialIcons
                              name={
                                passwordInpustIsVisible
                                  ? "visibility"
                                  : "visibility-off"
                              }
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      }
                      placeholder="Password"
                      value={userLoginData.password}
                      onChangeText={(text) =>
                        setuserLoginData({
                          ...userLoginData,
                          password: text,
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
                    isLoading={loginRegisterIsLoading}
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
                    onPress={(e) => handleSignIn(e)}
                  >
                    Log In
                  </Button>
                  <Text
                    color="muted.400"
                    textAlign="center"
                    fontSize="12px"
                    fontWeight="500"
                  >
                    Or continue with social account
                  </Text>
                </VStack>
              </>
            ) : (
              <>
                <VStack justifyContent="center" alignItems="center" space="8">
                  <VStack alignItems="center" space="2">
                    <Text fontSize="12px" fontWeight="500" color="muted.400">
                      NEW USER?
                    </Text>
                    <Text fontSize="30px" fontWeight="700">
                      Create an account
                    </Text>

                    <Text
                      color="muted.400"
                      textAlign="center"
                      maxW="210"
                      fontSize="12px"
                      fontWeight="500"
                    >
                      Create an account so you can navigate to private content
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
                      value={userRegisterData.firstName}
                      onChangeText={(text) =>
                        setuserRegisterData({
                          ...userRegisterData,
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
                      value={userRegisterData.lastName}
                      onChangeText={(text) =>
                        setuserRegisterData({
                          ...userRegisterData,
                          lastName: text,
                        })
                      }
                    />
                  </VStack>
                  <VStack>
                    <Text color="muted.400" fontSize="12px" fontWeight="500">
                      Email address
                    </Text>

                    <Input
                      size="xs"
                      variant="outline"
                      placeholder="Email"
                      value={userRegisterData.email}
                      onChangeText={(text) =>
                        setuserRegisterData({
                          ...userRegisterData,
                          email: text,
                        })
                      }
                    />
                  </VStack>

                  <VStack>
                    <Text color="muted.400" fontSize="12px" fontWeight="500">
                      Password
                    </Text>
                    <Input
                      value={userRegisterData.password}
                      onChangeText={(text) =>
                        setuserRegisterData({
                          ...userRegisterData,
                          password: text,
                        })
                      }
                      type={passwordInpustIsVisible ? "text" : "password"}
                      size="xs"
                      variant="outline"
                      InputRightElement={
                        <Icon
                          onPress={() =>
                            setPasswordInpustIsVisible(!passwordInpustIsVisible)
                          }
                          as={
                            <MaterialIcons
                              name={
                                passwordInpustIsVisible
                                  ? "visibility"
                                  : "visibility-off"
                              }
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      }
                      placeholder="Password"
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
                    isLoading={loginRegisterIsLoading}
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
                    onPress={(e) => handleSignUpUser(e)}
                  >
                    Sign up
                  </Button>
                  <Text
                    color="muted.400"
                    textAlign="center"
                    fontSize="12px"
                    fontWeight="500"
                  >
                    Or continue with social account
                  </Text>
                </VStack>
              </>
            )}
            <Button.Group justifyContent="center" alignItems="center" mt="2">
              <Button
                bg="#4267B2"
                width="120px"
                leftIcon={
                  <Ionicons name="logo-facebook" size={15} color="white" />
                }
              >
                Facebook
              </Button>
              <Button
                bg="#1DA1F2"
                width="120px"
                // _text={{
                //   color: "white",
                // }}
                leftIcon={
                  <Foundation name="social-twitter" size={15} color="white" />
                }
              >
                Twitter
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Appbar;
