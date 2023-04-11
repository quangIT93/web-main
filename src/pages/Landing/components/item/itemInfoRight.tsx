
import React from 'react'
// @ts-ignore

import './itemInfoRight.scss'
import { Link } from 'react-router-dom'

interface CategoryCarouselItemProps {
    content: string
    describe: string
    imageDescription?: string
    imgBackground?: string
}



const ItemInfoLeft: React.FC<CategoryCarouselItemProps> = ({ content,
    describe,
    imageDescription, imgBackground }) => {

    return (
        <div id="con-us" className='container-right' style={{ backgroundImage: `url(${imgBackground})` }}>

            <div className='div-content-right'>
                <div id='div-content'>
                    <p>{content}</p>
                </div>
                <div id='div-describe-right'>
                    <p>{describe}</p>
                </div>
                <a href='https://www.facebook.com/hijobOfficial/' target='_blank' >
                    <div className='btn-contract'>
                        <p> Liên hệ với chúng tôi </p>
                    </div>
                </a>


            </div>
            <div className='div-img'>
                <img src={imageDescription} />
            </div>
            <div className='space'>

            </div>
        </div>
    )
}

export default ItemInfoLeft
