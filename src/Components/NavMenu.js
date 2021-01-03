import React from 'react';
import {Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import SideMenu from './SideMenu';
import UserMenu from './UserMenu';
import "../css/AppDark.css";
import {getUser} from "../Utils/Common";

function NavMenu(props) {
    return (
        <Navbar variant="dark" className={"NavBar"}>
            <SideMenu />
            <LinkContainer to={"/dashboard"}>
                <a className={"Logo"}>homepage</a>
            </LinkContainer>
            {/*<Form inline>*/}
            {/*  <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
            {/*  <Button variant="outline-light">Search</Button>*/}
            {/*</Form>*/}
            <UserMenu isAuth={props.isAuth}/>
        </Navbar>
    );
}

export default NavMenu;