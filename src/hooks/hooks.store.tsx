import React, { createContext, ReactNode, useContext, useState } from 'react'

type initialStateKeys = keyof typeof initialState
type initialStateValues = typeof initialState[initialStateKeys]
type stateChangingValues<T> = ((prev: T) => T) | initialStateValues | 'toggle'

interface StoreContextProps {
  store: typeof initialState
  setStore: <T extends initialStateKeys>(
    prop: T,
    value: stateChangingValues<typeof initialState[T]>
  ) => void
  withStore: (
    dispatch: (prev: typeof initialState) => typeof initialState
  ) => void
}

const initialState = {
  variable: ''
}

const StoreContext = createContext<StoreContextProps>({
  store: initialState,
  setStore: () => {},
  withStore: () => {},
})

export const Store: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setState] = useState(initialState)

  const setStore: StoreContextProps['setStore'] = (prop, value) => {
    setState((prev) => ({
      ...prev,
      [prop]:
        value === 'toggle'
          ? !prev[prop]
          : typeof value === 'function'
          ? value(prev[prop])
          : value,
    }))
  }

  const withStore = (
    dispatch: (prev: typeof initialState) => typeof initialState
  ) => {
    setState(dispatch)
  }

  return (

    <StoreContext.Provider value={{ store, setStore, withStore }}>
      {children}
    </StoreContext.Provider>
  )
}

/**
 * * Get access to store provider
 * @returns \{ store, setStore, withStore }
 */
export const useStore = (): StoreContextProps => useContext(StoreContext)