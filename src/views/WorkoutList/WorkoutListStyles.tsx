import styled from "styled-components";

export const Header = styled.div`
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 4px 16px 4px 16px;
    align-items: center;
`;

export const CreateButton = styled.button`
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const Title = styled.h2`
    // text-align: center;
`;

export const Container = styled.div`
    height: 100%;
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
