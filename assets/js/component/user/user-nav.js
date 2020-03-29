import React from 'react';
import { Config } from '../../config';
import axios from 'axios';
import LoginModal from './../modal/login';
import AppContext from '../../context/app-context';
import { NavLink } from "react-router-dom";

class UserNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loginModal: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const context = this.context;
    axios.get(Config.apiBasePath + '/user/profile')
      .then((res) => {
        context.setUser(res.data);
      })
      .catch(() => {
        context.setUser({});
      });
  }

  handleLogout(e) {
    e.preventDefault();
    const context = this.context;
    axios.get(Config.apiBasePath + '/logout')
      .then(function () {
        context.setUser({});
        context.setAlert('erfolgreich abgemeldet.', 'success');
      });
  }

  render() {
    const { user } = this.context;

    if (user && user.email) {
      return (
        <React.Fragment>
          {this.context.getCurrentUserRole() === 'ROLE_REQUESTER' &&
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="text-primary" to="/dashboard">Dashboard</NavLink>
          </li>
          }
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={this.handleLogout}>Abmelden</a>
          </li>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <span>
          <a href="#"
             className="nav-link"
             onClick={(e) => {
               e.preventDefault();
               this.setState({loginModal: true})
             }}
          >
            Anmelden
          </a>
         </span>
        {this.state.loginModal && <LoginModal onClose={() => this.setState({loginModal: false})}/>}
      </React.Fragment>
    );
  }
}

UserNav.contextType = AppContext;

export default UserNav;
