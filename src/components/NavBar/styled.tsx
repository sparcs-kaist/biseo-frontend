import styled from 'styled-components';

export const NavbarContainer = styled.div`
  background: white;
  display: grid;
  border-top: 6px solid #ef9730;
  width: 100%;
  height: 50px;
  grid-template-areas: 'Left Logo SPARCS Right';
  grid-template-columns: 5vw 50px 10vw auto;

  & > .Left {
    grid-area: Left;
  }
  & > .Logo {
    grid-area: Logo;
  }
  & > .SPARCS {
    grid-area: SPARCS;
    margin-bottom: 15px;
    margin-top: 15px;
    font-weight: 800;
    font-size: 20px;
    font-family: Raleway;
    vertical-align: middle;
  }
  & > .Right {
    grid-area: Right;
  }
  & > .SPARCS span {
    background: linear-gradient(to right, #e79832, #ea772d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & > .Logo img {
    display: block;
    margin: 5px auto;
    height: 40px;
  }
`;
