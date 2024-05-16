
export type Nav={
    path:string;
    icon:string;
    text:string;
}

export interface NavList extends Array<Nav>{}

export type course={
    id:number,
    url:string;
    course:string;
    school:string;
    status:number;
    object:string;
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