import React from 'react'
import { GlobalContextProvider } from './src/services/context'
// import { redirect } from './src/services/i18n'

export const disableCorePrefetching = () => true

export const onInitialClientRender = () => {
    // on runtime first starts, redirect dummy pages
   //  redirect()
}

export const wrapRootElement = ({ element }) => (
    <GlobalContextProvider>{element}</GlobalContextProvider>
)