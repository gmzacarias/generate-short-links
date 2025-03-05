export interface Database {
    public: {
        Tables: {
            urls: {
                Row: {
                    id: number;
                    url: string;
                    shortUrl: string;
                    code:string;
                    createdAt: Date
                }
                Insert: {
                    id: never;
                    url: string;
                    shortUrl: string;
                    code:string;
                    createdAt: never;
                }
            }
        }
    }
}
