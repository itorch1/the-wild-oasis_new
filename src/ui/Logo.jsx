import styled from "styled-components";

import logoLight from '../data/img/logo-light.png'
import logoDark from '../data/img/logo-dark.png'
import { useDarkMode } from "../contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;

`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const {darkMode} = useDarkMode();

  return (
    <StyledLogo>
      <Img src={!darkMode ? logoLight : logoDark} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
