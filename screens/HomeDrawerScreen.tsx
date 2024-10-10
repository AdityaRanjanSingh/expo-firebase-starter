import React, { useState, ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import {
  Divider,
  Drawer,
  DrawerElement,
  IndexPath,
  LayoutProps,
  StyledComponentProps,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { Avatar, DrawerItem, Layout } from "@ui-kitten/components";
import { LogOutIcon, GithubIcon } from "./extra/icons";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type Inset = "top" | "bottom";

export interface SafeAreaLayoutProps extends StyledComponentProps, LayoutProps {
  insets?: Inset;
  children?: React.ReactNode;
}
export const SafeAreaLayout: React.FC<SafeAreaLayoutProps> = ({
  insets,
  ...props
}) => {
  const theme = useTheme();
  const insetsConfig = useSafeAreaInsets();

  const backgroundColor: string =
    theme[`background-basic-color-${props.level}`];

  return (
    <Layout
      {...props}
      style={[
        props.style,
        backgroundColor && { backgroundColor },
        {
          paddingTop: insets === "top" ? insetsConfig.top : 0,
          paddingBottom: insets === "bottom" ? insetsConfig.bottom : 0,
        },
      ]}
    />
  );
};

export const HomeDrawer = ({ navigation }): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(null);

  const DATA = [
    {
      title: "Signout",
      icon: LogOutIcon,
      onPress: () => {
        navigation.toggleDrawer();
      },
    },
  ];

  const renderHeader = (): ReactElement => (
    <SafeAreaLayout insets="top" level="2">
      <Layout style={styles.header} level="2">
        <View style={styles.profileContainer}>
          <Avatar size="giant" source={{ uri: "https://i.pravatar.cc/300" }} />
          <Text style={styles.profileName} category="h6">
            Kitten Tricks
          </Text>
        </View>
      </Layout>
    </SafeAreaLayout>
  );

  const renderFooter = () => (
    <SafeAreaLayout insets="bottom">
      <React.Fragment>
        <Divider />
        <View style={styles.footer}>
          <Text>{`Version ${Constants.expoVersion}`}</Text>
        </View>
      </React.Fragment>
    </SafeAreaLayout>
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {DATA.map((el, index) => (
        <DrawerItem
          key={index}
          title={el.title}
          onPress={el.onPress}
          accessoryLeft={el.icon}
        />
      ))}
    </Drawer>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },
});
