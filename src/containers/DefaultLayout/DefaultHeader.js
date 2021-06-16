import React from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,  Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import '../../app/util/main.css';
import { /* AppAsideToggler, */ AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import logo from '../../assets/img/brand/irrigacion.png'
import user from '../../assets/img/brand/user.png'
import { useKeycloak } from '@react-keycloak/web'


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = () => {

    const { keycloak } = useKeycloak()

    const email = keycloak && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
    
    console.log(keycloak.tokenParsed)

    localStorage.setItem("login", email);

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 119, height: 45, alt: 'CoreUI Logo' }} // AGREGAR LOGO AQUÍ
          // full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}  
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>

          {/* <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/*<NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
    
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          < /NavItem>*/}
  
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
          {/*  { url: "/private/servicios",
              icon: "icon-user",   
              alt={email},           
            },*/}
              <img src={user} className="img-avatar" alt={email} />
            </DropdownToggle>
            <DropdownMenu right>
              {/*<DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}

                <DropdownItem onClick = {() => keycloak && keycloak.logout()}><i className="fa fa-lock">

                </i>{email + " "}  Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> 
        </Nav>
      
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
