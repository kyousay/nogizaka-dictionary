import * as ActionType from './searchConstants'

export const searchSelect = (url: string) => ({
    type: ActionType.MEMBERS_SEARCH_SELECT as typeof ActionType.MEMBERS_SEARCH_SELECT,
    payload: {
        url
    }
})

export type SearchAction = 
    ReturnType<typeof searchSelect>