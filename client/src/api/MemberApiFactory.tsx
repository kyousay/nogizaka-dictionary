import axios, { Method } from 'axios'
import {MemberState} from '../components/Organisms/Form/AdminForm'

interface optionConfig {
    [k : string] : string | object | undefined
}

interface apiOption {
    method: Method,
    url: string, 
    data?: MemberState | {memberId: string},
}

const DEFAULT_API_CONFIG = {
    baseURL: 'http://localhost:3001/member',
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

    const MemberApiConnector = async (apiOption: apiOption) => {
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
    return MemberApiConnector
}