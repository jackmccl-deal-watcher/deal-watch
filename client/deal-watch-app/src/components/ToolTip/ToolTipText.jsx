import './ToolTipText.css'

export const VISIBILITY_MODES = Object.freeze({
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
});

export const BORDER_MODES = Object.freeze({
    NONE: 'none',
    BLACK_OUTLINE: '1px solid black',
});

export const TOOL_TIP_CLASSES = Object.freeze({
    TOOL_TIP: 'tool-tip',
});

const VISIBILITY_PROPERTY = 'visibility'
const BORDER_PROPERTY = 'border'
const STATUS_CIRCLE_ANIMATED_CLASS = 'status-circle-animated'

const ToolTipText = ({main_text, tool_tip}) => {
    let visible_long = false
    let force_visible = false
    let early_leave = false
    
    const maintainPersistantToolTip = (e) => {
        force_visible = true
    }

    const endPersistantToolTip = (e) => {
        force_visible = false
        let tool_tip_element = null
        const event_target_class = e.target.classList[0]
        if (event_target_class === TOOL_TIP_CLASSES.TOOL_TIP) {
            tool_tip_element = e.target
        } else {
            tool_tip_element = e.target.parentNode
        }
        hideToolTip(tool_tip_element)
    }

    const showToolTip = (e) => {
        setTimeout(() => {
            if(!early_leave) {
                const tool_tip_element = e.target.parentNode.children[1]
                if (tool_tip_element) {
                    tool_tip_element.style.setProperty(VISIBILITY_PROPERTY, VISIBILITY_MODES.VISIBLE)
                    const status_circle = tool_tip_element.children[2]
                    if (status_circle) {
                        status_circle.classList.add(STATUS_CIRCLE_ANIMATED_CLASS)
                        status_circle.style.setProperty(VISIBILITY_PROPERTY, VISIBILITY_MODES.VISIBLE)
                    }
                }
            }
        }, 500)
        early_leave = false
    }

    const mainTextHandleHideToolTip = (e) => {
        early_leave = true
        const tool_tip_element = e.target.parentNode.children[1]
        tool_tip_element && setTimeout(() => hideToolTip(tool_tip_element), 200)
    }

    const setElementsHidden = (elements) => {
        for (let element of elements) {
            element.style.setProperty(BORDER_PROPERTY, BORDER_MODES.NONE);
            element.style.setProperty(VISIBILITY_PROPERTY, VISIBILITY_MODES.HIDDEN)
        }
    }

    const hideToolTip = (tool_tip_element) => {
        if (!force_visible && tool_tip_element) {
            const status_circle = tool_tip_element.children[2]
            status_circle && status_circle.classList.remove(STATUS_CIRCLE_ANIMATED_CLASS)
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
            e.target.classList.remove(STATUS_CIRCLE_ANIMATED_CLASS)
            const status_completed_circle = e.target.parentNode.children[3]
            status_completed_circle && status_completed_circle.style.setProperty(VISIBILITY_PROPERTY, VISIBILITY_MODES.VISIBLE)
            visible_long = true
            const tool_tip_element = e.target.parentNode
            if(tool_tip_element) {
                tool_tip_element.style.setProperty(BORDER_PROPERTY, BORDER_MODES.BLACK_OUTLINE);
            }
        }
    }
    return(
        <div className='tool-tip-text'>
            <div className='tool-tip-main-text' onMouseOver={showToolTip} onMouseLeave={mainTextHandleHideToolTip}>
                {main_text}
            </div>
            <div className='tool-tip' onAnimationEnd={handleAnimationEnd} onMouseOver={maintainPersistantToolTip} onMouseLeave={endPersistantToolTip}>
                <p className='tool-tip-description'>{tool_tip.DESCRIPTION}</p>
                { tool_tip.WIKI ? <a className='tool-tip-wiki' href={tool_tip.WIKI}>{tool_tip.WIKI}</a> : null }
                <div className='tool-tip-status-circle'></div>
                <div className='tool-tip-status-completed-circle'></div>
            </div>
        </div>
    )
}

export default ToolTipText