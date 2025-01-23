import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-start; 
    margin-bottom: 10px;
    flex-direction: column;
`;
export const SetRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;     
    width: 100%;
`;
export const Checkbox = styled.input`
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`
export const Input = styled.input`
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 30%;
`
export const Button = styled.button`
    padding: 5px 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #004085;
    }
`;

