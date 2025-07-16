import { useState } from 'react'
import './ToolTipText.css'

const ToolTipText = ({main_text, tool_tip}) => {
    let visible_long = false

    const showToolTip = (e) => {
        const tool_tip_element = e.target.parentNode.children[1]
        if (tool_tip_element) {
            tool_tip_element.style.setProperty('visibility', 'visible')
            const status_circle = tool_tip_element.children[2]
            if (status_circle) {
                status_circle.classList.add('status-circle-animated')
                status_circle.style.setProperty('visibility', 'visible')
            }
        }
    }
    const setElementsHidden = (elements) => {
        for (let element of elements) {
            element.style.setProperty('visibility', 'hidden')
        }
    }
    const hideToolTip = (e) => {
        const tool_tip_element = e.target.parentNode.children[1]
        if (tool_tip_element) {
            const status_circle = tool_tip_element.children[2]
            status_circle && status_circle.classList.remove('status-circle-animated')
            const status_completed_circle = tool_tip_element.children[3]
            if (visible_long) {
                setTimeout(() => {
                    visible_long = false
                    setElementsHidden([tool_tip_element, status_circle, status_completed_circle])
                }, 2000)
            } else {
                setElementsHidden([tool_tip_element, status_circle, status_completed_circle])
            }
        }
    }
    const handleAnimationEnd = (e) => {
        const status_circle = e.target
        if (status_circle) {
            e.target.classList.remove('status-circle-animated')
            const status_completed_circle = e.target.parentNode.children[3]
            status_completed_circle && status_completed_circle.style.setProperty('visibility', 'visible')
            visible_long = true
        }
    }
    return(
        <div className='tool-tip-text'>
            <div className='tool-tip-main-text' onMouseOver={showToolTip} onMouseLeave={hideToolTip}>
                {main_text}
            </div>
            <div className='tool-tip' onAnimationEnd={handleAnimationEnd}>
                <p className='tool-tip-description'>{tool_tip.DESCRIPTION}</p>
                <a className='tool-tip-wiki' href={tool_tip.WIKI}>{tool_tip.WIKI}</a>
                <div className='tool-tip-status-circle'></div>
                <div className='tool-tip-status-completed-circle'></div>
            </div>
        </div>
    )
}

export default ToolTipText