import { createGlobalStyle } from 'styled-components';



export default createGlobalStyle `
    *{
        margin:0;
        padding:0;
        outline:0;
        border-sizing:border-box;
    }
    html, body, #root{
        min-height: 100%;
    }
    body{
        background:#8A2BE2;
        font-size:14px;
        -webkit-font-smoothing: antialiased !important;
    }
    body, input, button{
        font-size:14px;
        font-family: sans-serif;
    }
    button {
        cursor:pinter;
    }
`; 