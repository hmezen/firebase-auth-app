import { decode, encode } from "base-64";
import AppBar from "./src/AppBar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
} from "native-base";
import DrawerContent from "./src/DrawerContent";
import { extendTheme } from "native-base";
import { ProvideAuth } from "./firebase/firebaseprovider";
import HomeScreen from "./src/screens/HomeScreen";
import AnotherScreen from "./src/screens/AnotherScreen";
import { useAuth } from "./firebase/firebaseprovider";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const theme = extendTheme({
  colors: {
    primary: {
      50: "#0891b2",
      100: "#0891b2",
      200: "#0891b2",
      300: "#0891b2",
      400: "#0891b2",
      500: "#164e63",
      600: "#164e63",
      700: "#164e63",
      800: "#164e63",
      900: "#164e63",
    },
  },
});

export default function NewApp() {
  const Drawer = createDrawerNavigator();
  const { loading } = useAuth();

  if (loading) {
    return <Text>loading ...</Text>;
  }

  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        initialRouteName="HomeScreen"
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerStyle: {},
          header: (props) => <AppBar {...props} />,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Another page" component={AnotherScreen} />
      </Drawer.Navigator>
    </Box>
  );
}
