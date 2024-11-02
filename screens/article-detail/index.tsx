import React from "react";
import { ImageBackground, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  IconElement,
  Layout,
  StyleService,
  Text,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import { ClockIcon, HeartIcon, MessageCircleIcon } from "./extra/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Article } from "../extra/data";
import { TouchableWebElement } from "@ui-kitten/components/devsupport";
const MenuIcon = (props): IconElement => (
  <Icon {...props} name="arrow-back-outline" />
);
export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<{ params: { item: Article } }>>();
  const data = params.item;
  const renderBackAction = (): TouchableWebElement => (
    <Button
      appearance="ghost"
      status="primary"
      size="medium"
      onPress={() => navigation.goBack()}
      accessoryLeft={MenuIcon}
    >
      Back
    </Button>
  );
  return (
    // <SafeAreaView style={styles.container}>
      // {/* <TopNavigation
      //   alignment="center"
      //   accessoryLeft={renderBackAction}
      //   // accessoryRight={renderRightAction}
      //   style={{}}
      // /> */}
      <Layout style={styles.container} level="1">
        <ImageBackground
          style={styles.headerContainer}
          source={{ uri: "https://picsum.photos/150/150" }}
        >
          <Avatar
            style={styles.authorPhoto}
            size="large"
            source={data.author.photo}
          />
        </ImageBackground>
        <Layout style={styles.contentContainer} level="1">
          <Text style={styles.titleLabel} category="h5">
            {data.title}
          </Text>
          <Text>{data.content}</Text>
        </Layout>
        <Divider />
        <View style={styles.activityContainer}>
          <ClockIcon />
          <Text style={styles.dateLabel} appearance="hint" category="c1">
            {data.date}
          </Text>
          {
            <Button
              style={styles.reactionButton}
              appearance="ghost"
              status="basic"
              accessoryLeft={MessageCircleIcon}
            >
             TEsts
            </Button>
            /*
          <Button
            style={styles.reactionButton}
            appearance="ghost"
            status="danger"
            accessoryLeft={HeartIcon}
          >
            {`${data.likes.length}`}
          </Button> */
          }
        </View>
      </Layout>
    // </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 250,
    zIndex: 1,
  },
  authorPhoto: {
    position: "absolute",
    left: 24,
    bottom: -24,
    borderWidth: 2,
    borderColor: "border-basic-color-2",
  },
  titleLabel: {
    marginTop: 48,
    marginBottom: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  dateIcon: {
    width: 24,
    height: 24,
    tintColor: "text-hint-color",
  },
  dateLabel: {
    flex: 1,
    marginHorizontal: 8,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reactionButton: {
    paddingHorizontal: 0,
  },
});
