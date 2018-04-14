import { Category } from "./category.model";

// Post schema
export class Post{
    _id?: string;
    title: string;
    category: Category;
    body: string;
}