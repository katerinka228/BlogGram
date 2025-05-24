import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import AuthButton from "@/components/AuthButton";

export default async function AccountPage() {
    const session = await getServerSession(authConfig);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
            {session ? (
                <div>
                    <p>Привет, {session.user?.name}!</p>
                    <AuthButton />
                </div>
            ) : (
                <p>Войдите, чтобы увидеть эту страницу</p>
            )}
        </div>
    );
}