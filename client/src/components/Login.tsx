import { useSendCode } from "@/state/mutations"
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button";

const Login = () => {
    const sendCode = useSendCode();
    const login = useGoogleLogin({
        onSuccess: async ({ code }) => {
            await sendCode.mutate(code);
        },
        flow: "auth-code",
        scope: "email profile openid",
    });
    
    return (
        <Button
        onClick={() => {
            login();
        }}
        >
            Sign in with google
        </Button>
    );
}

export default Login
