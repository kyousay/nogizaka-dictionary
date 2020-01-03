import axios, { AxiosRequestConfig, Method } from 'axios'
import {MemberState} from '../components/Organisms/Form/AdminForm'

interface optionConfig {
    [k : string] : string | object | undefined
}

type HTTPMethods = Pick<AxiosRequestConfig, 'method'>

const DEFAULT_API_CONFIG = {
    baseURL: 'http://localhost:3000',
    timeout: 7000,
};

export const MemberApiFactory = (optionConfig? : optionConfig) => {
    const token = localStorage.getItem("ticket")
    const config = {
        ...DEFAULT_API_CONFIG,
        ...optionConfig,
        headers: {Authorization: token}
    }

    const instance = axios.create(config);

    const MemberApiConnector = async (method : Method ,data: MemberState, url: string) => {
        try {
            const response = await instance({
                method: method,
                url: `${url}`, 
                data: data,
            });

            if(response.status !== 200) {
                throw new Error(`Server Error`);
            }
            return response;
        }catch(err) {
            throw err;
        }
    };
    return MemberApiConnector
}