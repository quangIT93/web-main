
import React from 'react'
// @ts-ignore


import { Link } from 'react-router-dom'
import "./style.scss"

interface SuggestItemProps {
    content?: string
    describe?: string

    imgBackground?: string

}

const ItemInfoLeft: React.FC<SuggestItemProps> = ({ content,
    describe,
    imgBackground, }) => {

    return (
        <div>
            <div className='div-item-suggest'>
                <img src={imgBackground} />
                <div className='title-job-suggest' >
                    <h4>{content}</h4>
                    <p style={{ color: "#575757" }}>{describe}</p>
                </div>
            </div>

        </div>
    )
}

export default ItemInfoLeft
