import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';


import Images from './components/Images';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import Header from './components/Header';
import Filler from './components/Filler';


const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #eeeeee;
  display: flex;
  justify-content: center;
  `
const Container = styled.div`
  overflow-y: auto;
  max-width: 90rem;
  width: 100%;
  padding-top: 2rem;
`

function App({popupState}) {
  return (
    <>
      { popupState && <Popup/> }
      <Header/>
      <Navbar/>
      <Filler/>
      <Wrapper>
        <Container>
          <div href="#top"></div>
          <Images/>
        </Container>
      </Wrapper>
    </>
  );
}

const mapStateToProps = (state) => ({
  popupState : state.appReducer.popupState
})

export default connect(mapStateToProps)(App);
