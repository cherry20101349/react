export interface User {
    username: string,
    cover: string,
    avator: string,
    desc: string,
    age: number,
    sex: string,
    hobby: Array<string>
}
export interface articleDetail {
    title: string,
    content: string,
    author: string,
    cover: string
}
export interface ServerResponse {
    success: string,
    data: any
}
declare module 'global' {
    type ns = Number | string
}