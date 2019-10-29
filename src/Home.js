
import React from 'react'
import styled, {keyframes} from 'styled-components'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: {
        'Action': 1,
        'Adventure': 2,
        'Comedy': 4,
        'Drama': 8,
        'Fantasy': 10,
        'Horror': 14,
        'Slice of Life': 36,
        'Sports': 30,
        'Shoujo': 25,
        'Shounen': 27,
        'Mystery': 7,
        'Romance': 22,
      },
      ApiURL: 'https://api.jikan.moe/v3/genre/anime/1',
      data: { anime: [] },
      counter: 0,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch(this.state.ApiURL)
    .then( data => data.json() )
    .then( data => this.setState({
      loading: false,
      data: data,
    }))
    this.startSlideShow();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startSlideShow() {
    this.interval = setInterval(() => {
      let currCount = this.state.counter;
      currCount += 1;
      if (currCount > this.state.data.anime.length) {
        currCount = 0;
      }
      this.setState({counter: currCount});
    }, 6000)
  }

  createGenreCard = (genre, id, row_col_start, i) => {
    return (
      <GenreCard genre={genre} id={id} row_col_start={row_col_start} key={id} counter={i} />
    )
  }

  createImgCard = (anime) => {
    if (!anime) {
      return <Img src='' />;
    }
    return (
      <Img src={anime.image_url} alt={anime.title} key={anime.mal_id} counter={this.state.counter} />
    )
  }

  render() {
    const cards = [];
    // [row_start, col_start]
    const positions = [[1, 4],
                        [2, 5],
                        [3, 6],
                        [4, 7],
                        [5, 6],
                        [6, 5],
                        [7, 4],
                        [6, 3],
                        [5, 2],
                        [4, 1],
                        [3, 2],
                        [2, 3],]
    let i = 0;

    for (var key in this.state.genres) {
      cards.push(this.createGenreCard(key, this.state.genres[key], positions[i], i));
      i += 1;
    }

    return (
      <>
        <GenreCardsWrapper>
          {cards}
          <SlideShow>
            {this.createImgCard(this.state.data.anime[this.state.counter])}
          </SlideShow>
        </GenreCardsWrapper>
      </>
    )
  }
}

////// FUNCTIONAL COMPONENTS //////
const GenreCard = (props) => {
  const {genre, id, row_col_start, counter} = props;
  let row_start = row_col_start[0];
  let col_start = row_col_start[1];
  let row_end = row_start + 1;
  let col_end = col_start + 1;

  return (
      <Card row_start={row_start} row_end={row_end} col_start={col_start} col_end={col_end} counter={counter}>
        <StyledLink to={{
          pathname: '/Display',
          genre_id: id,
        }}>
          <Div><Div2><P>{genre}</P></Div2></Div>
        </StyledLink>
      </Card>
  )
}

////// STYLED COMPONENTS //////
const SlideShowAnimation = keyframes `
  0% {
    transform: scale(0) rotate(0deg) translateX(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.1) rotate(36deg) translateX(28px);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.0) rotate(45deg) translateX(35px);
    opacity: 1;
  }
`
const SlideShow = styled.div `
  grid-row-start: 3;
  grid-row-end: 6;
  grid-column-start: 3;
  grid-column-end: 6;
  width: 400px;
  height: 400px;
  transform: rotate(45deg) translateX(35px);
  background: transparent;
  overflow: hidden;
  animation: ${SlideShowAnimation} 0.5s linear;
  transition: transform 0.3s ease-in-out;
`
const ImgAnimation1 = keyframes `
  from {
    transform: rotate(-45deg) translateY(-320px) translateX(100px);
  }
  to {
    transform: rotate(-45deg) translateY(-320px) translateX(0px);
  }
`
const ImgAnimation2 = keyframes `
  from {
    transform: rotate(-45deg) translateY(-320px) translateX(-100px);
  }
  to {
    transform: rotate(-45deg) translateY(-320px) translateX(0px);
  }
`
const Img = styled.img `
  width: 220%;
  height: 180%;
  transform: rotate(-45deg);
  animation: ${props => props.counter % 2 === 0 ? ImgAnimation2 : ImgAnimation1} 7s ease-in-out;
`
const P = styled.p `
  font-family: sans-serif;
  text-align: center;
  font-size: 1.2rem;
  transform: translateY(60px) rotate(45deg);
`
const Div = styled.div `
  height: 145px;
  width: 145px;
  transform: translateY(-9px);
  background-color: black;
  color: #D7DADC;
`
const Div2 = styled.div `
  height: 145px;
  width: 145px;
  transform: translateY(-9px);
  background-color: black;
  color: #D7DADC;
  &:hover {
    transform: rotate(-45deg);
  }
`
const GenreCardsWrapper = styled.div `
  display: grid;
  align-self: center;
  transform: translateX(-15%);
  grid-template-columns: repeat(7, 150px);
  grid-template-rows: repeat(7, 150px);
  width: 800px;
  height: 800px;
  margin-top: 30px;
`
const OddCardAnimation = keyframes `
  from {
    transform: translateX(-1000%) rotate(0deg);
    opacity: 0;
  }
  to {
    opacity: 0.8;
    transform: translateX(0%) rotate(-45deg;);
  }
`
const EvenCardAnimation = keyframes `
  from {
    opacity: 0;
    transform: translateY(-1000%) rotate(0deg);
  }
  to {
    opacity: 0.8;
    transform: translateY(0%) rotate(-45deg);
  }
`
const Card = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 50px;
  min-height: 10px;
  padding: 0.2rem;
  opacity: 0.8;
  background: #D7DADC;
  height: 105px;
  grid-row-start: ${props => props.row_start};
  grid-row-end: ${props => props.row_end};
  grid-column-start: ${props => props.col_start};
  grid-column-end: ${props => props.col_end};
  transition: transform 0.3s ease-in-out;
  transform: rotate(-45deg);
  &:hover {
    transform: scale(1.03) rotate(0deg);
    opacity: 1;
    height: 145px;
    width: 145px;
  }
  animation: ${props => props.counter % 2 === 0 ? EvenCardAnimation : OddCardAnimation} 0.5s linear;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
    width: 10vw;
`
