import styled from "styled-components";

interface TextButtonProps {
    type?: 'positive' | 'negative';
}

export const TextButton = styled.button<TextButtonProps>`
    padding: 5px 10px;
    background-color: ${({type}) =>
    type === 'positive' ? '#007BFF' : '#f44336'};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
        background-color:  ${
            ({type}) => type === 'positive' ? '#0056b3' : '#d52a1d'
        };
    }
    &:active {
        background-color: ${
            ({type}) => type === 'positive' ? '#004085' : '#ac1813'
        };
    }
`;

TextButton.defaultProps = {
    type: 'positive',
};
