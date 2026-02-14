import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 95%;
    width: 100%;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    padding: 8px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

export const HeadingTitle = styled.div`
    gap: 12px;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;

export const HeadingToolbar = styled.div`
    gap: 8px;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;

export const ExerciseTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
    color: #134e4a;
    margin: 0;
`;
