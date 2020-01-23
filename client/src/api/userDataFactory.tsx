import axios, { Method } from 'axios'
import { userProfile } from '../components/Organisms/Header/TopHeader'

interface apiConfig {
    baseURL: string,
    timeout: number
}

interface optionConfig {
    [k : string] : string | object | undefined
}

interface apiOption {
    method: Method,
    url?: string, 
    data?: userProfile | {id: string},
}

const DEFAULT_API_CONFIG: apiConfig = {
    baseURL: 'http://localhost:3001/user',
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

    const userAxios = async (apiOption: apiOption) => {
        try {
            const response = await instance({
                ...apiOption
            });

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