import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

export const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px; 
    flex-shrink: 0;
`;

export const Body = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 150px);
    flex-grow: 1;
    overflow-y: auto;
`;

export const NavBar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    flex-shrink: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1); 
`;