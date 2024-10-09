import styled, { keyframes } from 'styled-components'

// Definimos la animación del loader
const l3 = keyframes`
  20% { background-position: 0% 0%, 50% 50%, 100% 50%; }
  40% { background-position: 0% 100%, 50% 0%, 100% 50%; }
  60% { background-position: 0% 50%, 50% 100%, 100% 0%; }
  80% { background-position: 0% 50%, 50% 50%, 100% 100%; }
`

// Creamos el componente DotLoader con props para el color y el tamaño
const DotLoader = styled.div<{ [x: string]: any }>`
  width: ${(props) => props.size || '90px'};
  aspect-ratio: 2;
  --_g: no-repeat
    radial-gradient(
      circle closest-side,
      ${(props) => props.color || '#000'} 90%,
      rgba(0, 0, 0, 0) 100%
    );
  background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: ${l3} 1s infinite linear;
`

const l20_1 = keyframes`
  0%    {clip-path: polygon(50% 50%, 0 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0)}
  12.5% {clip-path: polygon(50% 50%, 0 0, 50% 0, 100% 0, 100% 0, 100% 0, 100% 0)}
  25%   {clip-path: polygon(50% 50%, 0 0, 50% 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)}
  50%   {clip-path: polygon(50% 50%, 0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 0 100%)}
  62.5% {clip-path: polygon(50% 50%, 100% 0, 100% 0, 100% 0, 100% 100%, 50% 100%, 0 100%)}
  75%   {clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0 100%)}
  100%  {clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0 100%)}
`

const l20_2 = keyframes`
  0%    {transform: scaleY(1) rotate(0deg)}
  49.99% {transform: scaleY(1) rotate(135deg)}
  50%   {transform: scaleY(-1) rotate(0deg)}
  100%  {transform: scaleY(-1) rotate(-135deg)}
`

const CircularLoader = styled.div`
  width: ${(props) => props.size || '50px'};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid ${(props) => props.color || '#514b82'};
  animation: ${l20_1} 0.8s infinite linear alternate,
    ${l20_2} 1.6s infinite linear;
`

interface Loading3dotsProps {
  size?: string
  color?: string
  height?: string
}
export const Loading3dots = (props: Loading3dotsProps) => {
  return (
    <div
      className={`flex items-center justify-center h-${
        props.height ?? 25
      } bg-gray-100`}
    >
      <DotLoader {...props} />
    </div>
  )
}
