import styled from "styled-components";

export const Header = styled.div`
    height: 100%;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: #134e4a;
    margin: 0;
`;

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const WorkoutListWrapper = styled.div`
    margin-top: 12px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    overflow: hidden;
`;

export const WorkoutItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    cursor: pointer;
    transition: background-color 0.12s ease;

    &:not(:last-child) {
        border-bottom: 1px solid #d1e7dd;
    }

    &:hover {
        background-color: #f0fdf9;
    }

    &:active {
        background-color: #e0f5f0;
    }
`;

export const WorkoutTitle = styled.div`
    font-weight: 500;
    color: #134e4a;
`;

export const WorkoutDate = styled.div`
    color: #5f7c78;
    font-size: 13px;
`;

export const WorkoutFilter = styled.input`
    padding: 10px 14px;
    border: 1px solid #d1e7dd;
    border-radius: 10px;
    font-size: 15px;
    color: #134e4a;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    transition: border-color 0.15s ease;

    &:focus {
        outline: none;
        border-color: #0d9488;
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
    }

    &::placeholder {
        color: #5f7c78;
    }
`;
