import { ImageSourcePropType } from "react-native";

export class Article {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly content: string,
    readonly date: string,
    readonly author: Profile, // readonly likes: Like[], // readonly comments: Comment[]
    readonly keywords: string[] // readonly likes: Like[], // readonly comments: Comment[]
  ) {}
}

export class Like {
  constructor(readonly author: Profile) {}
}

export class Comment {
  constructor(
    readonly text: string,
    readonly date: string,
    readonly author: Profile,
    readonly comments: Comment[],
    readonly likes: Like[]
  ) {}
}

export class Profile {
  constructor(
    readonly name: string,
    readonly photo: ImageSourcePropType,
    readonly uri: string
  ) {}

  get fullName(): string {
    return `${this.name}`;
  }
}
