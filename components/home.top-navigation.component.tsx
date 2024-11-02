import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Icon,
  IconElement,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { BellIcon, SearchIcon } from "./icons.component";

const MenuIcon = (props): IconElement => (
  <Icon {...props} name="more-vertical" />
);

const InfoIcon = (props): IconElement => <Icon {...props} name="info" />;

const LogoutIcon = (props): IconElement => <Icon {...props} name="log-out" />;

export const TopNavigationImageTitleShowcase = (): React.ReactElement => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = (): React.ReactElement => (
    <View style={{ flexDirection: "row" }}>
      <Button appearance="ghost" size="medium" accessoryLeft={SearchIcon} />
      <Button appearance="ghost" size="medium" accessoryLeft={BellIcon} />
    </View>
  );

  const renderTitle = (props): React.ReactElement => (
    <View style={styles.titleContainer}>
      <Avatar style={styles.logo} source={require("../assets/icon.png")} />
      <Text {...props}>Dora AI</Text>
    </View>
  );

  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
});
