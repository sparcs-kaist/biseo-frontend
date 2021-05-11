import React from 'react';
import { NavbarContainer } from './styled';

interface Props {
  username: string;
}
const Navbar: React.FC<Props> = ({ username }) => {
  const logo = require('./Symbol.svg') as string;
  return (
    <NavbarContainer>
      <div className="Left"></div>
      <div className="Logo">
        <img src={logo} />
      </div>
      <div className="SPARCS">
        <span>SPARCS</span>
      </div>
      <div className="Right"></div>
    </NavbarContainer>
  );
};

export default Navbar;
