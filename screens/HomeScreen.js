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

import { signOut } from "firebase/auth";
import {} from "firebase/firestore";
import {
  Avatar,
  Button,
  Card,
  Layout,
  List,
  Text,
} from "@ui-kitten/components";
import { HeartIcon, MessageCircleIcon } from "./extra/icons";
import { Article, Profile } from "./extra/data";
import { app } from "../config/firebase";

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
            new Profile(feed.author, { uri: "https://i.pravatar.cc/300" })
          )
      );
      setFeeds(articles);
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
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info.index)}
    >
      <Text category="h5">{info.item.title}</Text>
      <Text style={styles.itemContent} appearance="hint" category="s1">
        {`${info.item.content.substring(0, 82)}...`}
      </Text>
    </Card>
  );

  return (
    <Layout style={styles.container} level="2">
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={feeds}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
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
