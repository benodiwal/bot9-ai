import { useGetUser } from "@/state/queries";
import { FC, ReactNode } from "react"
import { Progress } from "@/components/ui/progress";
import Login from "@/components/Login";

const AuthContext: FC<{ children: ReactNode }> = ({ children }) => {
    const { isLoading, isError, data, error } = useGetUser();
    if (isLoading) return <Progress />;

    if (isError && (!error.response || error.response.status !== 401)) return <p>Smth went wrong</p>;

    if (!isLoading && !data) return <Login />;
    return <>{children}</>;
}

export default AuthContext
