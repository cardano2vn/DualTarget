import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL!,
});

export const get = async function (path: string, config = {}) {
    const response = await instance.get(path, config);
    return response.data;
};

export const post = async function (path: string, config = {}) {
    const response = await instance.post(path, config);
    return response.data;
};

export const patch = async function (path: string, config = {}) {
    const response = await instance.patch(path, config);
    return response.data;
};

export const del = async function (path: string, config = {}) {
    const response = await instance.delete(path, config);
    return response.data;
};

export default instance;
