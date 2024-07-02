import { TaskRaw } from "../types/task-types"
import axiosInstance from "./axios-instance";

const getTaskList = async () => {
    const resp = await axiosInstance.get<TaskRaw[]>(
        `/data`,
    );
    return resp.data;
}

const getTask = async (id?: string) => {
    const resp = await axiosInstance.get<TaskRaw>(
        `/data/${id}`,
    );
    return resp.data;
}

const postTask = async (payload?: TaskRaw) => {
    const resp = await axiosInstance.post<TaskRaw>(
        `/data/`,
        payload

    );
    return resp.data;
}

const updateTask = async (payload?: TaskRaw) => {
    console.log(payload)
    const resp = await axiosInstance.put<TaskRaw>(
        `/data/${payload?.id}`,
        payload

    );
    return resp.data;
}

const deleteTask = async (id?: string) => {
    const resp = await axiosInstance.delete<null>(
        `/data/${id}`,
    );
    return resp;
}

export default {
    getTaskList,
    getTask,
    deleteTask,
    postTask,
    updateTask
};