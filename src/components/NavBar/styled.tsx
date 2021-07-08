import styled from 'styled-components';

export const NavBarContainer = styled.div`
  background: white;
  display: grid;
  border-top: 6px solid #ef9730;
  height: 50px;
  grid-template-areas: 'left logo sparcs right';
  grid-template-columns: 5vw 50px 10vw auto;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  & l .Left {
    grid-area: left;
  }
  & > .logo {
    grid-area: logo;
  }
  & > .sparcs {
    grid-area: sparcs;
    margin-bottom: 15px;
    margin-top: 15px;
    font-weight: 800;
    font-size: 20px;
    font-family: Raleway;
    vertical-align: middle;
  }
  & > .right {
    grid-area: right;
  }
  & > .sparcs span {
    background: linear-gradient(to right, #e79832, #ea772d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & > .logo img {
    display: block;
    margin: 5px auto;
    height: 40px;
  }
`;
