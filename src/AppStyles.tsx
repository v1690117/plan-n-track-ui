import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

export const Header = styled.div`
    flex-shrink: 0;
    min-height: 50px;
`;

export const Body = styled.div`
    flex: 1;
    overflow-y: auto;
`;

export const NavBar = styled.div`
    flex-shrink: 0;
    height: 50px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
`;