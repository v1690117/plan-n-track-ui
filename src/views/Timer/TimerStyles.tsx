import styled from "styled-components";

export const TimerContainer = styled.div`
    flex-shrink: 0;
    height: 52px;
    background: #fff;
    border-top: 1px solid #d1e7dd;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    z-index: 10;
`;

export const Input = styled.input`
    padding: 8px 10px;
    border: 1px solid #d1e7dd;
    border-radius: 8px;
    width: 64px;
    font-size: 14px;
    color: #134e4a;
    background: #f9fafb;
    transition: border-color 0.15s ease;

    &:focus {
        outline: none;
        border-color: #0d9488;
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
    }
`;

export const SecondsDisplay = styled.div`
    font-size: 22px;
    color: #0d9488;
    font-weight: 700;
    min-width: 48px;
    text-align: center;
    font-variant-numeric: tabular-nums;
`;
