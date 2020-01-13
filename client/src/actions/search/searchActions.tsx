import * as ActionType from './searchConstants'

export const searchSelect = (url: string) => ({
    type: ActionType.SEARCH_MEMBERS_SELECT as typeof ActionType.SEARCH_MEMBERS_SELECT,
    payload: {
        url
    }
})

export const searchWord = (word: string) => ({
    type: ActionType.SEARCH_MEMBERS_WORD as typeof ActionType.SEARCH_MEMBERS_WORD,
    payload: {
        word
    }
})

export type SearchAction = 
    |ReturnType<typeof searchSelect>
    |ReturnType<typeof searchWord>