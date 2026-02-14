import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeadingTitle = styled.div`
    flex: 1;
    min-width: 0;
    gap: 12px;
    display: flex;
    align-items: center;
`;

export const WorkoutTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
    color: #134e4a;
    margin: 0;
`;

export const WorkoutDate = styled.div`
    color: #5f7c78;
    font-size: 13px;
`;

export const ExerciseList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 16px;
`;

export const Toolbar = styled.div`
`;
