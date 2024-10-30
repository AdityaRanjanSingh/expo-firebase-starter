import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen, HomeDrawer } from "../screens";
import ArticleDetail from "../screens/article-detail";
import { Icon } from "@ui-kitten/components";
import { HomeBottomNavigation } from "../components/home-bottom-navigation.component";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const ROOT_ROUTES: string[] = ["Home", "Layouts", "Components", "Themes"];
const MenuIcon = (props): IconElement => (
  <Icon {...props} name="menu-outline" />
);
const TabBarVisibilityOptions = ({ route }): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);

  return { tabBarVisible: isRootRoute && !isNestedRoute };
};
const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={"Layouts"}
    tabBar={(props) => <HomeBottomNavigation {...props} />}
  >
    <BottomTab.Screen name="Layouts" component={HomeScreen} />
    <BottomTab.Screen name="Components" component={ArticleDetail} />
    <BottomTab.Screen name="Themes" component={ArticleDetail} />
  </BottomTab.Navigator>
);
export const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeTabsNavigator} />
      <Drawer.Screen name="ArticleDetail" component={ArticleDetail} />
    </Drawer.Navigator>
  );
};
