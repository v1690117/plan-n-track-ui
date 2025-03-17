import styled from "styled-components";

export const Container = styled.div`
    // padding: 20px;
    display: flex;
    flex-direction: column;
    height: 95%;
    width: 100%;
`;

export const ChartContainer = styled.div`
    display: flex;
    height: 100%;
`

export const ModeSelect = styled.select`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

export const ModeOption = styled.option`
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

export const ExerciseTitle = styled.h1`
    font-size: 24px;
`;

