import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    ${reset}
    html{
        font-family: sans-serif;
        font-size: 62.5%;
    }
    html * {
        box-sizing: border-box;
    }
    a:hover, button:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    a, button, input {
        outline: none;
    }
`