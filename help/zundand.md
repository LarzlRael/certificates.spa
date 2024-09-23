
- [Zustand](#zustand)
  - [Installation](#installation)
  - [Usage](#usage)
```javascript

import { create } from 'zustand'

interface AuthState {
  user: any
  login: () => void
  logout: () => void 
  getUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  login: () => null,
  logout: () => null,
}))


```

- [Zustand](#zustand)
  - [Installation](#installation)
  - [Usage](#usage)
```javascript
  const { user, login, logout } = useAuthStore()
  /* other way chanching names */
  const values = useAuthStore((state)=>({
    user: state.user,
    login: state.login,
    logout: state.logout
  }))
  console.log(values)


  /* comparing all object usong shallow */
import shallow from 'zustand/shallow'

 const values = useAuthStore((state)=>({
    user: state.user,
    login: state.login,
    logout: state.logout
  }), shallow)

```


- Example with counter state

```javascript

interface Post {
  id: number
  title: string
  content: string
}

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  post: Post[]

}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  post: [],
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  getPosts: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    set({ post: data })
  }
}))



```
-Uso de counter state

```javascript
/* to use methods get separed */
const increment = useCounterStore((state) => state.increment)
/* OR */
const { increment } = useCounterStore()