import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen, HomeDrawer } from "../screens";
import ArticleDetail from "../screens/article-detail";
import {
  Icon,
  IconElement,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { HomeBottomNavigation } from "../components/home-bottom-navigation.component";
import { Button } from "../components";
import { TouchableWebElement } from "@ui-kitten/components/devsupport";
import { TopNavigationImageTitleShowcase } from "../components/home.top-navigation.component";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

const ROOT_ROUTES: string[] = ["Home", "Layouts", "Components", "Themes"];
const MenuIcon = (props): IconElement => (
  <Icon {...props} name="menu-outline" />
);
const TabBarVisibilityOptions = ({ route }): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);

  return { tabBarVisible: isRootRoute && !isNestedRoute, headerShown: false };
};
const SearchIcon = (props): IconElement => (
  <Icon {...props} name="search-outline" />
);

const renderRightAction = (): TouchableWebElement => (
  <React.View style={{ flexDirection: "row" }}>
    <Button
      appearance="ghost"
      status="danger"
      size="giant"
      accessoryLeft={SearchIcon}
    />
    <Button
      appearance="ghost"
      status="danger"
      size="giant"
      accessoryLeft={SearchIcon}
    />
  </React.View>
);
const HomeStackNavigator = (): React.ReactElement => (
  <StackNavigator.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={"ArticleFeed"}
    tabBar={(props) => <HomeBottomNavigation {...props} />}
  >
    <StackNavigator.Screen name="ArticleFeed" component={HomeScreen} />
    <StackNavigator.Screen name="ArticleDetail" component={ArticleDetail} />
    <StackNavigator.Screen name="Themes" component={ArticleDetail} />
  </StackNavigator.Navigator>
);
const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={"Feeds"}
    tabBar={(props) => <HomeBottomNavigation {...props} />}
  >
    <BottomTab.Screen name="Layouts" component={HomeStackNavigator} />
    <BottomTab.Screen name="Components" component={ArticleDetail} />
    <BottomTab.Screen name="Themes" component={ArticleDetail} />
  </BottomTab.Navigator>
);
export const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerLeft: (props) => <Button {...props}>{Button}</Button>,
        headerShown: false,
      }}
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
    </Drawer.Navigator>
  );
};
