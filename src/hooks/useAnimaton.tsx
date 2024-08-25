import { useState } from 'react'

export const useAnimationn = () => {
  const [animation, setAnimation] = useState(false)

  return {
    animation,
    setAnimation,
  }
}
