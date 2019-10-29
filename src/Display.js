
import React from 'react'
import styled, {createGlobalStyle, keyframes} from 'styled-components'

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalAnime: {},
      data: { anime: [] },
      loading: false,
      GenreAPI: 'https://api.jikan.moe/v3/genre/anime/' + props.location.genre_id,
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch(this.state.GenreAPI)
    .then( data => data.json() )
    .then( data => this.setState({
      loading: false,
      data: data,
    }))
  }

  handleClick(anime) {
    let toggleModal = !this.state.showModal;
    this.setState({
      showModal: toggleModal,
      modalAnime: anime
    });
  }

  toggleModal() {
    console.log('out')
    if (this.state.showModal) {
      console.log('in')
      this.setState({
        showModal: false,
      });
    }
  }

  render() {
    this.state.data.anime.sort((a, b) => (a.score > b.score) ? -1 : 1)
    return (
      <Wrapper onClick={() => this.toggleModal()} >
        <GlobalStyle showModal={this.state.showModal} />
        <CardsWrapper>
          {this.state.data.anime.map((anime, idx) => {
            return <CreateAnimeCard anime={anime} key={idx} idx={idx} onClick={(anime) => this.handleClick(anime)} />
          })}
        </CardsWrapper>
        <Overlay showModal={this.state.showModal} />
        <Modal showModal={this.state.showModal} anime={this.state.modalAnime} />
      </Wrapper>
    )
  }
}

const CreateAnimeCard = (props) => {
  const {anime, onClick, idx} = props;
  return (
      <Card onClick={() => onClick(anime)} idx={idx}>
        <Img src={anime.image_url} alt={anime.title} />
        <AnimeInfo>
          <Title>{anime.title}</Title>
          <AnimeDescription>
            <P>{anime.synopsis}</P>
          </AnimeDescription>
          <WatchNowLinks>
            <Score>Score: {anime.score}</Score>
            <a href={anime.url}><Score>MyAnimeList</Score></a>
          </WatchNowLinks>
        </AnimeInfo>
      </Card>
  )
}

const Modal = (props) => {
  const {showModal, anime} = props;
  let mod;
  if (showModal) {
      mod = (
        <StyledModal showModal>
          <ModalScoreImg>
            <Img2 src={anime.image_url} alt={anime.title} />
          </ModalScoreImg>
          <AnimeInfo>
            <Title>{anime.title}</Title>
            <div>
              <P2>{anime.synopsis}</P2>
            </div>
            <WatchNowLinks>
              <Score>MAL Score: {anime.score}</Score>
              <a href={anime.url}><Score>MyAnimeList</Score></a>
            </WatchNowLinks>
          </AnimeInfo>
        </StyledModal>);
  } else {
    mod = <StyledModal />;
  }
  return <>{mod}</>
}

////// STYLED COMPONENTS //////
const GlobalStyle = createGlobalStyle `
  body {
    overflow: ${props => props.showModal ? "hidden" : "auto"};
    height: ${props => props.showModal ? "100%" : "auto"}
  }
`
const ModalScoreImg = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  height: auto;
`
const Wrapper = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  margin-top: -8px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
`
const StyledModal = styled.div `
  position: fixed;
  z-index: 9999;
  background-color: white;
  top: 50%;
  left: 50%;
  width: 819.2px;
  border-radius: 5px;
  padding: 0.3rem;
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
  height: auto;
  transform: translate(-50%, -50%);
  display: ${props => props.showModal ? "flex" : "none"};
`
const Overlay = styled.div `
  position: fixed;
  top: 0;
  z-index: 9999;
  display: ${props => props.showModal ? "block" : "none"};
  background: ${props => props.showModal ? "rgba(0,0,0,0.6)" : "none"};
  margin: 0;
  padding: 0;
  min-width: 150vw;
  min-height: 150vh;
`
const CardAnimation = keyframes `
  from {
    transform: translateY(500%);
  }
  to {
    transform: translateY(0%);
  }
`
const Card = styled.div `
  display: flex;
  height: 265px;
  width: 100%;
  padding: 0.3rem;
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
  animation: ${CardAnimation} 0.3s linear;
`
const CardsWrapper = styled.div `
  display: flex;
  align-self: center;
  width: 1024px;
  height: auto;
  flex-wrap: wrap;
`
const Img = styled.img `
  height: 100%;
  max-width: 230px;
  width: 25%;
  min-width: 100px;
  border-right: solid;
  border-color: inherit;
`
const Img2 = styled.img `
  height: 100%;
  width: 100%;
  border-right: solid;
  border-color: inherit;
`
const AnimeInfo = styled.div `
  width: 100%;
  background-color: #1A1A1B;
  overflow: hidden;
`
const P = styled.p `
  font-size: 1rem;
  font-family: sans-serif;
  width: 728.2px;
  max-height: 140px;
  transform: translateX(3%);
  overflow: hidden;
  position: relative;
  line-height: 28px;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
  &:before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
  }
`
const P2 = styled.p `
  font-size: 1rem;
  color: #D7DADC;
  font-family: sans-serif;
  line-height: 28px;
  transform: translateX(3%);
  overflow: visible;
  width: 95%;
`
const Score = styled.p `
  font-size: 1rem;
  font-family: sans-serif;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
  color: #D7DADC;
`
const Title = styled.h2 `
  transform: translateX(3%);
  color: #D7DADC;
`
const AnimeDescription = styled.div `
  background-color: #1A1A1B;
  color: #D7DADC;
  left: 100px;
  font-family: sans-serif;
  font-size: 18px;
  width: 100%;
  height: 142px;
`
const WatchNowLinks = styled.div `
  display: grid;
  width: 240px;
  height: auto;
  grid-template-columns: repeat(4, 80px);
  transform: translateX(9%);
`
