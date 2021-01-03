import {LinkContainer} from "react-router-bootstrap";
import {Dropdown, Button} from "react-bootstrap";
import React from "react";
import "../css/AppDark.css";
import {getUser, isLogin} from "../Utils/Common";

function UserMenu(props) {
    if (props.isAuth) {
        return (
            <Dropdown
                className={"UserMenu"}
                alignRight>
                <Dropdown.Toggle id="dropdown-custom-components">
                    {getUser()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">Your Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
                    <Dropdown.Item eventKey="3" href={"../pages/Splash"}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

    } else {
        return (
            <div className={"UserMenu"}>
                <LinkContainer to={"/register"}>
                    <Button className={"Register-button"} variant={"info"}>
                        Register
                    </Button>
                </LinkContainer>
                <LinkContainer to={"/login"}>
                    <Button className={"Signin-button"} variant={"success"}>
                        Sign in
                    </Button>
                </LinkContainer>
            </div>
        );
    }
}


export default UserMenu;
