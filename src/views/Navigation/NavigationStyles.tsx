import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

interface NavItemProps {
    $active?: boolean;
}

export const NavItem = styled.div<NavItemProps>`
    display: flex;
    flex: 1;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: ${({$active}) => $active ? '#0d9488' : '#5f7c78'};
    background-color: ${({$active}) => $active ? '#f0fdf9' : 'transparent'};
    justify-content: center;
    align-items: center;
    height: 100%;
    transition: color 0.15s ease, background-color 0.15s ease;
    cursor: pointer;
    user-select: none;
    border-bottom: 2px solid ${({$active}) => $active ? '#0d9488' : 'transparent'};

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
