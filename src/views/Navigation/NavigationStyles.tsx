import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

export const NavItem = styled.div`
    display: flex;
    flex: 1;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #5f7c78;
    justify-content: center;
    align-items: center;
    height: 100%;
    transition: color 0.15s ease, background-color 0.15s ease;
    cursor: pointer;
    user-select: none;

    &:not(:first-child) {
        border-left: 1px solid #d1e7dd;
    }

    &:hover {
        color: #0d9488;
        background-color: #f0fdf9;
    }

    &:active {
        color: #0f766e;
        background-color: #e0f5f0;
    }
`;
