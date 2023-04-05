import styled from 'styled-components'; 

export const Modal = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.80);
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 420px){
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
    }

`;

export const Container = styled.div`
    width: 30%;
    height: 30%;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-size: 16px;
        img{
            height: 40px;
            width: 40px;
        }
    }
    .close{
        width: auto;
        height: auto;
    }
    button{
        height: 40px;
        width: 40px;
        border: none; 
        border-radius: 0 10px 0 10px;
    }
    button:hover{
        cursor: pointer;
        background-color: red;
        border: none;
    }
`;