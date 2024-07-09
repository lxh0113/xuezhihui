
export type Nav={
    path:string;
    icon:string;
    text:string;
}

export interface NavList extends Array<Nav>{}

export type course={
    id:number,
    courseName:string;
    createTime:string;
    userId:number;
    image:string
}

export interface courseList extends Array<course>{}

export type Book={
    id:number;
    url:string;
    title:string;
    author:string;
    authorAvatar:string;
    rate:number
}

export interface BooksList extends Array<Book>{}

export type User={
    id:number;
    roleId:number;
    account:string;
    email:string;
    name:string;
    avatar:string;
    identity:number
}