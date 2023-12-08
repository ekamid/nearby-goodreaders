import React from 'react'
import { createRoot } from 'react-dom/client'

import '../styles/global.scss'

import PopupWrapper from "./popup-wrapper"

function init() {
    const appContainer = document.createElement('div')
    appContainer.classList.add('app-wrapper')
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error('Can not find AppContainer')
    }
    const root = createRoot(appContainer)
    root.render(<PopupWrapper />)
}

init()
