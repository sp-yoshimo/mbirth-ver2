import { Comment, Post, User } from "@prisma/client";

export type SafePost = Post & {
    user: User
}

export type SafeComment = Comment & {
    user: User | null;
}