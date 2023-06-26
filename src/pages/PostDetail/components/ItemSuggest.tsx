
import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
import "./style.scss"
import { useNavigate } from "react-router-dom";

interface SuggestItemProps {
    content?: string
    describe?: string
    imgBackground?: string
    postId?: Number

}

const ItemInfoLeft: React.FC<SuggestItemProps> = ({ content,
    describe,
    imgBackground, postId }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            window.open(`/post-detail?post-id=${postId}`)
        }

        } className='div-suggest-include' style={{ borderBottom: "0.5px solid #AAAAAA", width: "95%", paddingBottom: 10 }}>
            <div className='div-item-suggest'>
                <img src={imgBackground} />
                <div className='title-job-suggest' >
                    <h5>{content}</h5>
                    <p style={{ color: "#575757", fontSize: 13 }}>{describe}</p>
                </div>
            </div>

        </div>
    )
}

export default ItemInfoLeft
