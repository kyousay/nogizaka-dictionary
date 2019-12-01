import axios from 'axios'
import {DataType} from '../actions/login/loginActions'

interface ApiConfig {
    baseURL: string,
    timeout: number
}

const DEFAULT_API_CONFIG: ApiConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 7000,
};

export const loginUserFactory = (optionConfig? : ApiConfig) => {
    const config = {
        ...DEFAULT_API_CONFIG,
        ...optionConfig
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