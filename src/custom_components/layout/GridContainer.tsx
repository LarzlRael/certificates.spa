import styled from 'styled-components'

const GridContainer = styled.div<{
  areas: string
  responsive: string
}>`
  display: grid;
  grid-template: auto 1fr / auto 1.2fr 0.6fr 0.5fr;
  grid-template-areas: ${(props) => props.areas};
  height: ${(props) =>
    !props.areas.includes('Inf') ? '100vh' : 'calc(100vh - 5px)'};
  gap: ${(props) => (props.areas.includes('Inf') ? '5px 10px' : '0')};
  padding-bottom: ${(props) => (props.areas.includes('Inf') ? '5px' : '0')};
  .itemContent {
    margin: 0;
    padding: ${(props) =>
      props.areas.includes('Inf')
        ? '20px 3%'
        : props.areas.includes('Navbar')
        ? '0 1.5%'
        : '0'};
    background: ${(props) =>
      props.areas.includes('Inf') ? '#f8f8f8' : 'var(--white)'};
  }
  .itemnav {
    position: ${(props) => (props.areas.includes('Navbar') ? '' : 'fixed')};
    width: 100%;
    z-index: 2;
  }
  @media screen and (max-width: 1024px) {
    grid-template: auto auto auto 65px / 1fr;
    height: auto;
    grid-template-areas: ${(props) => props.responsive};
  }
`

export default GridContainer
