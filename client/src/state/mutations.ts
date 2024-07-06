import { useMutation, useQueryClient } from "react-query";
import AxiosClient from "./http";

export const useSendCode = () => {
    const queryClient = useQueryClient();

    const mut = useMutation({
        mutationKey: ["code"],
        mutationFn: (code: string) => AxiosClient.post("/auth/google/callback", {
            code
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });

    return mut;
};
