import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
`;

export const Title = styled.h1`
    text-align: center;
`;

export const WorkoutListWrapper = styled.div`
    margin-top: 20px;
`;

export const WorkoutItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const WorkoutTitle = styled.div`
    font-weight: bold;
`;

export const WorkoutDate = styled.div`
    color: #888;
`;

export const CreateButton = styled.button`
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
