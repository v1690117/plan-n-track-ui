import styled from "styled-components";

export const TimerContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;

export const Input = styled.input`
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 50px;
`

export const StartButton = styled.button`
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

export const SecondsDisplay = styled.div`
    font-size: 24px;  
    color: #d9534f;  
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    width: 50px;
    text-align: center;
`;

export const StopButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;
