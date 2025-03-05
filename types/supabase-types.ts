export interface Database {
    public: {
        Tables: {
            urls: {
                Row: {
                    id: number;
                    url: string;
                    shortUrl: string;
                    createdAt: Date
                }
                Insert: {
                    id: never;
                    url: string;
                    shortUrl: never;
                    createdAt: never;
                }
            }
        }
    }
}
