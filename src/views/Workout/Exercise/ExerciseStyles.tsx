import styled from "styled-components";

export const ExerciseCard = styled.div`
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
`;

export const ExerciseHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
    cursor: pointer;
`;

export const ExerciseName = styled.div`
    font-weight: bold;
`;

export const SetsInfo = styled.div`
    color: #888;
`;

export const ExerciseDetails = styled.div`
    padding: 10px;
    background-color: #fff;
`;

export const AddSetButton = styled.button`
    background-color: #007BFF;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
