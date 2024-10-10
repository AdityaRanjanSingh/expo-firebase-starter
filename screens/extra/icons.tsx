import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement } from "@ui-kitten/components";

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="arrowhead-down-outline" />
);

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="arrowhead-up-outline" />
);

export const GithubIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="github" />
);

export const LogOutIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="log-out-outline" />
);
