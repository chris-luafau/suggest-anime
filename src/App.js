
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

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
    width: 10vw;
`
