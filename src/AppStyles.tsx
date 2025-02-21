import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

export const Header = styled.div`
    height: 50px; 
    flex-shrink: 0;
`;

export const Body = styled.div`
    flex-grow: 1;
    overflow-y: auto;
`;

export const NavBar = styled.div`
    height: 50px;
    flex-shrink: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1); 
`;