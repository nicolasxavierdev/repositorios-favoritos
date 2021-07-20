import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const animate = keyframes `
    from{
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`;

export const Loading = styled.div `
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    svg {
        animation: ${animate} 2s linear infinite;
    }
`;

export const Container = styled.div `
    max-width: 700px;
    background:#fff;
    border-radius:4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding:30px;
    margin:80px auto;
`;


export const Owner = styled.header `
    display:flex;
    flex-direction:column;
    align-items:center;
    img {
        width: 150px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border-radius:20px;
        margin: 20px 0;
        padding:5px;
    }
    h1 {
        font-size:30px;
        color:rgb(85, 26, 139);;
    }
    p{
        font-size:15px;
        margin-top:10px;
        color:#4F4F4F;
        text-align:center;
        line-height:1.4;
        max-width: 400px;
    }
`;


export const BackButtom = styled(Link)
`
    border:0;
    background:transparent;
    outline:0;
`;

export const IssuesList = styled.ul `
    margin-top:30px;
    padding-top:30px;
    border-top:1px solid #C0C0C0;
    list-style:none;
    li{
        display:flex;
        padding:15px 10px;
        & + li {
            margin-top:12px;
        }
        img {
            width:36px;
            height:36px;
            border-radius:50%;
            border: 2px solid #C0C0C0;
            
        }
        div {
            flex:1;
            margin-left:12px;
            p{
                margin-top:10px;
                font-size:12px;
                color:#4682B4;
            }
        }
        strong{
            font-size:15px;
            a {
                text-decoration:none;
                color:#696969;
                transform: 0.3s;
            }
            a:hover {
                color:#4B0082;
            }
            span {
                background:#4B0082;
                color:#fff;
                border-radius:4px;
                font-size:12px;
                font-weight:600;
                padding:5px 7px;
                margin-left:10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                display: inline-flex;
            }
        }
    }
`;

export const PageActions = styled.div `
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top: 15px;
    border-top:1px solid #C0C0C0;
    padding-top:15px;
    button{      
    background:#8B008B;
    color:#fff;
    border:0px;
    border-radius:4px;
    font-size:12px;
    font-weight:600;
    padding:5px 7px;
    margin-left:10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    cursor:pointer;
    outiline:0;
        &:disabled{
            cursor:not-allowed;
            opacity:0.5;
        }
    }
`;




export const FilterList = styled.div `
margin-top: 15px;
padding-top:15px;
button{      
    background:#C0C0C0;
    color:#4B0082;
    border:0px;
    border-radius:4px;
    font-size:12px;
    font-weight:600;
    padding:8px;
    margin-left:5px;
    cursor:pointer;
    outiline:0;
        &:nth-child(${props => props.active + 1}){
            background:#00FF7F;
        }
    }
`; 