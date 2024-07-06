import { useQuery } from "react-query";
import AxiosClient from "./http";
import { User } from "@/types/User";
import { AxiosError } from "axios";

type UserResponse = {
    result: User;
}

export const useGetUser = () => {
    const query = useQuery<User, AxiosError>({
        queryKey: ["user"],
        queryFn: () => AxiosClient.get<UserResponse>("/user").then((data) => data.data.result),
        retry: 1,
    });
    return query;
}
