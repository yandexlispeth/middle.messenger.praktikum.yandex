import BaseAPI from "./BaseApi";

export interface IChatInfo {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string
        },
        time:string,
        content: string
    }
}
export default class ChatApi extends BaseAPI {
    constructor() {
        super("/chats");
    }

    create(title:string) {
        return this.http.post("/", {title});
    }

    delete(id:number): Promise<unknown> {
        return this.http.delete("/", { chatId: id });
    }

    read(): Promise<IChatInfo[]> {
        return this.http.get("/");
    }

    async getToken(id:number): Promise<string> {
        const response = await this.http.post<{token:string}>(`/token/${id}/`);
        return response.token;
    }

    update = undefined;

}
