import axios from 'axios'
import {DataType} from '../actions/login/loginActions'

interface apiConfig {
    baseURL: string,
    timeout: number
}

interface optionConfig {
    [k : string] : string | object | undefined
}

const DEFAULT_API_CONFIG: apiConfig = {
    baseURL: 'http://localhost:3001',
    timeout: 7000,
};

export const loginUserFactory = (optionConfig? : optionConfig) => {
    const config = {
        ...DEFAULT_API_CONFIG,
        ...optionConfig,
    };

    const instance = axios.create(config);

    const loginUser = async (data: DataType, url: string) => {
        try {
            const response = await instance.post(`${url}`, data);

            if(response.status !== 200) {
                throw new Error(`Server Error`);
            }
            return response;
        }catch(err) {
            throw err;
        }
    };
    return loginUser
}