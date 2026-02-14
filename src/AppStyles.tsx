import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    background-color: #f0fdf4;
`;

export const Header = styled.div`
    flex-shrink: 0;
    min-height: 56px;
    background: #fff;
    border-bottom: 1px solid #d1e7dd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    z-index: 10;
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
`;

export const Body = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    min-height: 0;
`;

export const NavBar = styled.div`
    flex-shrink: 0;
    height: 56px;
    background: #fff;
    border-top: 1px solid #d1e7dd;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.04);
    z-index: 10;
`;
