import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

export const NavItem = styled.div`
    display: flex;
    flex: 1;
    font-size: 16px;  
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-left: 1px solid rgba(0, 0, 0, 0.1); 
    height: 100%;
    &:hover { background-color: ${"#f0f0f0"};}
    &:active { background-color: ${"#d6d6d6"};}
`;
