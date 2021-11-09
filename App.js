import { decode, encode } from "base-64";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { extendTheme } from "native-base";
import { ProvideAuth } from "./firebase/firebaseprovider";

import NewApp from "./NewApp";

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

export default function App() {
  return (
    <ProvideAuth>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <NewApp />
        </NativeBaseProvider>
      </NavigationContainer>
    </ProvideAuth>
  );
}
