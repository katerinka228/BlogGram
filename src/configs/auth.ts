import type { AuthOptions} from "next-auth";
import GoggleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex'

export const authConfig: AuthOptions = {
    providers: [
        GoggleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID!,
            clientSecret: process.env.YANDEX_SECRET!
        })
    ]
}