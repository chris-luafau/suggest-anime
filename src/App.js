
import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Display from './Display.js'
import Home from './Home.js'

export default class App extends React.Component {

  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
        <Router>
          <Header>
            <H1>
              <StyledLink to="/">Suggest: ANIME</StyledLink>
            </H1>
          </Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Display" component={Display} />
          </Switch>
        </Router>
      </AppWrapper>
      )
  }
}

////// STYLED COMPONENTS //////
const GlobalStyle = createGlobalStyle `
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: black;
  }
  html {
    margin: 0;
  }
`
const AppWrapper = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Header = styled.div `
`
const H1 = styled.h1 `
  text-align: center;
  font-family: sans-serif;
  font-size: 2.5rem;
  color: #D7DADC;
`
const H1Type = styled.span `
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
         linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
         linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
  font-family: sans-serif;
  font-size: 2.5rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
    width: 10vw;
`
