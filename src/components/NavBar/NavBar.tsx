import React from 'react';
import { NavBarContainer } from './styled';

const NavBar: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logo = require('./Symbol.svg') as string;
  return (
    <NavBarContainer>
      <div className="left"></div>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="sparcs">
        <span>SPARCS</span>
      </div>
      <div className="right"></div>
    </NavBarContainer>
  );
};

export default NavBar;
