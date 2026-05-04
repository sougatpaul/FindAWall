import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 15rem;
  background: #06080a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 0 1rem;

  h1 {
    margin-top: 7rem;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  p {
    margin-bottom: 1.5rem;
    width: 100%;
    max-width: 44rem;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>FindaWall</h1>
      <p>
        Search and download high resolution images contributed by various
        creators all around the world
      </p>
    </HeaderContainer>
  );
};

export default Header;
