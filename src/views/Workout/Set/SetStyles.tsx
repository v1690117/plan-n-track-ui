import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;

    &:not(:last-child) {
        padding-bottom: 10px;
        border-bottom: 1px solid #d1e7dd;
        margin-bottom: 10px;
    }
`;

export const SetRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

export const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    accent-color: #0d9488;
    cursor: pointer;
    flex-shrink: 0;
`;

export const Input = styled.input`
    padding: 8px 10px;
    border: 1px solid #d1e7dd;
    border-radius: 8px;
    font-size: 14px;
    color: #134e4a;
    background: #f9fafb;
    width: 30%;
    transition: border-color 0.15s ease;

    &:focus {
        outline: none;
        border-color: #0d9488;
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
    }
`;
