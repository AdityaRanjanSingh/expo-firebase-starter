import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreen,HomeDrawer } from "../screens";

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ gestureEnabled: false }}
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
