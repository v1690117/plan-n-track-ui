import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const HeadingTitle = styled.div`
    gap: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
`;

export const HeadingToolbar = styled.div`
    gap: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
`;

export const WorkoutTitle = styled.h1`
    font-size: 24px;
`;

export const WorkoutDate = styled.div`
    color: #888;
`;

export const CloseButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

export const AddExerciseButton = styled.button`
    margin-top: 10px;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const DeleteWorkoutButton = styled.button`
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const ExerciseList = styled.div`
    margin-top: 20px;
`;
