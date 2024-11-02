import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement } from "@ui-kitten/components";

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="bookmark" />
);

export const HyperlinkIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="link-2" />
);

export const GithubIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="github" />
);

export const LogOutIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="log-out-outline" />
);
