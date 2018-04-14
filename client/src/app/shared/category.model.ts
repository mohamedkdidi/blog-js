// Category schema
export class Category
{
    _id?: string;
    title: string;

    constructor(id:string, title:string) {
        this._id=id;
        this.title=title;
    }
}