import styled from "styled-components";

interface IconButtonProps {
    type?: 'positive' | 'negative';
}

export const IconButton = styled.button<IconButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background-color: ${({type}) =>
            type === 'negative' ? '#ef4c53' : '#0d9488'};
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.1s ease;
    flex-shrink: 0;

    &:hover {
        background-color: ${({type}) =>
                type === 'negative' ? '#d43a4c' : '#0f766e'};
    }

    &:active {
        background-color: ${({type}) =>
                type === 'negative' ? '#b8293a' : '#115e59'};
        transform: scale(0.93);
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

IconButton.defaultProps = {
    type: 'positive',
};
