import React from "react";
import {Container, NavItem} from "./NavigationStyles.tsx";
import {useNavigate} from "react-router-dom";

const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const onWorkoutsClickHandler = () => navigate("/");
    const onExercisesClickHandler = () => navigate("/exercises");
    const onProfileClickHandler = () => alert("Ooops! Not implemented yet!");
    return <Container>
        <NavItem onClick={onWorkoutsClickHandler}>Тренировки</NavItem>
        <NavItem onClick={onExercisesClickHandler}>Упражнения</NavItem>
        <NavItem onClick={onProfileClickHandler}>Профиль</NavItem>
    </Container>
}

export default Navigation;
