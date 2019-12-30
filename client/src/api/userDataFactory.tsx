import axios from 'axios'
import { userProfile } from '../components/Organisms/Header/TopHeader'

interface apiConfig {
    baseURL: string,
    timeout: number
}

interface optionConfig {
    [k : string] : string | object | undefined
}

const DEFAULT_API_CONFIG: apiConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 7000,
};

export const userDataFactory = (optionConfig? : optionConfig) => {
    const token = localStorage.getItem("ticket")
    const config = {
        ...DEFAULT_API_CONFIG,
        ...optionConfig,
        headers: {Authorization: token}
    };

    const instance = axios.create(config);

    const userAxios = async (data: userProfile, url: string) => {
        try {
            const response = await instance.put(`${url}`, data);

            if(response.status !== 200) {
                throw new Error(`Server Error`);
            }
            return response;
        }catch(err) {
            throw err;
        }
    };
    return userAxios
}