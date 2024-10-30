import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ListRenderItemInfo,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { TouchableWebElement } from "@ui-kitten/components/devsupport";

import { signOut } from "firebase/auth";
import {} from "firebase/firestore";
import {
  Avatar,
  Button,
  Card,
  Layout,
  List,
  Text,
  IconElement,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Image,
} from "@ui-kitten/components";
import { HeartIcon, MessageCircleIcon } from "./extra/icons";
import { Article, Profile } from "./extra/data";
import { app } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerToggleButton } from "@react-navigation/drawer";

// export const HomeScreen = () => {
//   const handleLogout = () => {
//     signOut(auth).catch((error) => console.log("Error logging out: ", error));
//   };
//   return (
//     <View style={styles.container}>
//       <Button title="Sign Out" onPress={handleLogout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// Get a list of feed from your database
const StarIcon = (props): IconElement => <Icon {...props} name="star" />;
const MenuIcon = (props): IconElement => (
  <Icon {...props} name="menu-outline" />
);
const SearchIcon = (props): IconElement => (
  <Icon {...props} name="search-outline" />
);

export const HomeScreen = ({ navigation }) => {
  const db = getFirestore(app);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    async function getFeed() {
      const feedCol = collection(db, "feeds");
      const feedSnapshot = await getDocs(feedCol);
      const feedList = feedSnapshot.docs.map((doc) => doc.data());
      console.log({ feedList });
      const articles = feedList.map(
        (feed) =>
          new Article(
            feed.title,
            feed.description,
            feed.content,
            feed.date,
            new Profile(feed.author, { uri: "https://i.pravatar.cc/300" }),
            feed.keywords
          )
      );
      setFeeds([
        ...articles,
        ...articles,
        ...articles,
        ...articles,
        ...articles,
      ]);
      return feedList;
    }
    getFeed();
  }, []);

  const onItemPress = (index) => {
    navigation && navigation.navigate("Article1");
  };

  const renderItemFooter = (info) => (
    <View style={styles.itemFooter}>
      <Avatar source={info.item.author.photo} />
      <View style={styles.itemAuthoringContainer}>
        <Text category="s2">{info.item.author.fullName}</Text>
        <Text appearance="hint" category="c1">
          {info.item.date}
        </Text>
      </View>
      {/* <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={MessageCircleIcon}
      >
        {`${info.item.comments.length}`}
      </Button>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="danger"
        accessoryLeft={HeartIcon}
      >
        {`${info.item.likes.length}`}
      </Button> */}
    </View>
  );
  const renderItem = (info) => (
    <Card
      style={styles.item}
      // footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info)}
    >
      <View style={{ flexDirection: "row" }}>
        <ImageBackground
          src={"https://picsum.photos/150/150"}
          style={{
            width: 150,
            marginRight: 16,
          }}
        ></ImageBackground>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {info.item.keywords.map((word) => (
            <Text
              style={{ marginHorizontal: 4 }}
              category="c1"
              appearance="hint"
            >
              {word.toUpperCase()}
            </Text>
          ))}

          <Text style={{ marginVertical: 8 }} category="h6">
            {info.item.title}
          </Text>
          {/* <Text style={styles.itemContent} appearance="hint" category="s1">
            {`${info.item.content.substring(0, 82)}...`}
          </Text> */}
          <Avatar source={info.item.author.photo} />
          <View style={styles.itemAuthoringContainer}>
            <Text category="s2">{info.item.author.fullName}</Text>
            <Text appearance="hint" category="c1">
              {info.item.date}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
  const renderBackAction = (): TouchableWebElement => (
    <Button
      style={styles.button}
      appearance="outline"
      status="primary"
      size="small"
      onPress={() => navigation.openDrawer()}
      accessoryLeft={MenuIcon}
    />
  );
  const renderRightAction = (): TouchableWebElement => (
    <View style={{ flexDirection: "row" }}>
      <Button
        style={styles.button}
        appearance="ghost"
        status="danger"
        size="giant"
        accessoryLeft={SearchIcon}
      />
      <Button
        style={styles.button}
        appearance="ghost"
        status="danger"
        size="giant"
        accessoryLeft={SearchIcon}
      />
    </View>
  );
  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container} level="1">
        {/* <TopNavigation
          alignment="center"
          accessoryLeft={renderBackAction}
          // accessoryRight={renderRightAction}
          style={{  }}
        /> */}

        <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={feeds}
          renderItem={renderItem}
        />
      </Layout>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
  },
  listContent: {
    paddingVertical: 8,
    border: "none",
  },
  item: {
    marginVertical: 8,
    borderColor: "transparent",
  },
  itemHeader: {
    height: 220,
  },
  itemContent: {
    marginVertical: 8,
  },
  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
});
