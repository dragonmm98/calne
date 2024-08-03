import { Member } from "./user";

export interface Comment {
    _id: string;
    comment_types: string;
    comment_description:string;
    comment_status:string;
    mb_id: string;
    createdAt:Date;
    members_data: Member;
}

export interface SearchCommentObj {
    page: number;
    limit: number;
    comment_types: string;
}

export interface CommentInput {
    comment_types:string;
    comment_description: string;
}