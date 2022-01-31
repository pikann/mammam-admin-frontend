export interface IAuthor {
  _id: string;
  avatar: string;
  username: string;
  bio: string;
}

export interface IPost {
  _id: string;
  createdAt: number;
  restaurant: string;
  author: IAuthor;
  url: string;
  thumbnail: string;
  type: string;
  description: string;
  likeTotal: number;
  commentTotal: number;
  viewTotal: number;
  shareTotal: number;
  isLiked: boolean;
  loading: boolean;
}
