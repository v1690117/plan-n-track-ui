import React from "react";
import {Container, NavItem} from "./NavigationStyles.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const onWorkoutsClickHandler = () => navigate("/");
    const onExercisesClickHandler = () => navigate("/exercises");
    const onProfileClickHandler = () => alert("Ooops! Not implemented yet!");

    return <Container>
        <NavItem $active={path === '/' || path.startsWith('/workout')} onClick={onWorkoutsClickHandler}>Тренировки</NavItem>
        <NavItem $active={path.startsWith('/exercises')} onClick={onExercisesClickHandler}>Упражнения</NavItem>
        <NavItem onClick={onProfileClickHandler}>Профиль</NavItem>
    </Container>
}

export default Navigation;
