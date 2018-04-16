import { ICategory } from "./category.model";

// Post schema
export interface IPost{
    _id?: string;
    title: string;
    category: ICategory;
    body: string;
}