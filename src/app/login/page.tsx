import AuthButton from "@/components/AuthButton";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Войдите в блог</h1>
                <AuthButton />
            </div>
        </div>
    );
}