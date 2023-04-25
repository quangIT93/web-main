
import React from 'react'
// @ts-ignore


import { Link } from 'react-router-dom'
import "./style.scss"

interface CategoryCarouselItemProps {
    content?: string
    describe?: string

    imgBackground?: string

}

const ItemInfoLeft: React.FC<CategoryCarouselItemProps> = ({ content,
    describe,
    imgBackground, }) => {

    return (
        <div>
            <div className='div-item-suggest'>
                <img src={"https://hi-job-app-upload.s3-ap-southeast-1.amazonaws.com/images/posts-images/273/1676444301989-6010e05a-44c7-4785-973a-03bef018a0b4.jpg"} />
                <div style={{ marginLeft: "10px" }}> <p>Thời gian làm việc</p>
                    <h4>Quận 1, Hồ Chí Minh</h4>
                </div>
            </div>

        </div>
    )
}

export default ItemInfoLeft
