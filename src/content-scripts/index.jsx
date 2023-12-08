import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/global.scss'
import ContentScriptWrapper from './content-scripts-wrapper'

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        setTimeout(() => {
            insertPanel()
        }, 1500)
    }
}

function insertPanel() {
    if (isPanelAlreadyAdded()) return
    const body = document.querySelector('body')
    const panelContainer = document.createElement('div')
    panelContainer.classList.add('app-wrapper')
    if (!panelContainer || !body) {
        throw new Error('Could not create the panel container')
    }
    body.appendChild(panelContainer)
    const root = createRoot(panelContainer)
    root.render(<ContentScriptWrapper />)
}

function isPanelAlreadyAdded() {
    return !!document.querySelector('.app-wrapper')
}
