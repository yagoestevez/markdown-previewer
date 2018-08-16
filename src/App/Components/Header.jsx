import React from 'react';
import Logo  from '../Assets/logo.png';
import './Header.css';

const Header = props => {

  return (
    <header id="header">
      <img src={Logo} alt="Logo" />
    </header>
  );

}

export default Header;