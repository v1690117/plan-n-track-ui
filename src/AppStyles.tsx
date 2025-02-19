import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; // Занимаем всю высоту viewport
    overflow: hidden; // Убираем полосу прокрутки у контейнера
`;

export const Header = styled.div`
    height: 50px; 
    flex-shrink: 0;
    
    background-color: #f0f0f0;
`;

export const Body = styled.div`
    flex-grow: 1;
    overflow-y: auto;
`;

export const NavBar = styled.div`
    height: 50px;
    flex-shrink: 0;
    
    
    background-color: #f0f0f0;
`;