import styled from 'styled-components';

export const NavBarContainer = styled.div`
  background: white;
  display: grid;
  border-top: 6px solid #ef9730;
  height: 46px;
  grid-template-areas: 'left logo sparcs right';
  grid-template-columns: 5vw 40px 10vw auto;
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
    // margin-bottom: 15px;
    margin-top: 7px;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: 30px;
    font-family: raleway;
    vertical-align: middle;
  }
  & > .right {
    grid-area: right;
  }
  & > .sparcs span {
    background: linear-gradient(to right, #eba12a, #ea772d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & > .logo img {
    display: block;
    margin: 5px auto;
    height: 35px;
  }
`;
