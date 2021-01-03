import {push as Menu} from "react-burger-menu";
import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import "../css/AppDark.css";

function SideMenu() {
    return(
        <Menu pageWrapId={"page-wrap"} outerContainerId={"App"}>
            {/*<LinkContainer to={"/TypingGame"}>*/}
            {/*    <Button id={"typing"} className={"menu-item"}>Typing</Button>*/}
            {/*</LinkContainer>*/}
            {/*<LinkContainer to={"/NotFound"}>*/}
            {/*    <Button id={"not-found"} className={"menu-item"}>404 page test</>*/}
            {/*</LinkContainer>*/}
        </Menu>


    );
}

export default SideMenu;