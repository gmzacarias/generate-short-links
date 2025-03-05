export interface Database {
    public: {
        Tables: {
            urls: {
                Row: {
                    id: number;
                    url: string;
                    short_url: string;
                    code:string;
                    created_at: Date
                }
                Insert: {
                    id: never;
                    url: string;
                    short_url: string;
                    code:string;
                    created_at: never;
                }
            }
        }
    }
}
