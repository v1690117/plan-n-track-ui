import styled from "styled-components";

export const ExerciseCard = styled.div`
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    overflow: hidden;
`;

export const ExerciseHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    background: linear-gradient(135deg, #f0fdf9 0%, #e0f5f0 100%);
    cursor: pointer;
    transition: background 0.12s ease;

    &:hover {
        background: linear-gradient(135deg, #e0f5f0 0%, #ccfbf1 100%);
    }
`;

export const ExerciseName = styled.div`
    font-weight: 600;
    color: #134e4a;
    font-size: 15px;
`;

export const SetsInfo = styled.div`
    color: #5f7c78;
    font-size: 13px;
    font-weight: 500;
    background: #fff;
    padding: 2px 10px;
    border-radius: 12px;
`;

export const ExerciseDetails = styled.div`
    padding: 14px 16px;
`;
