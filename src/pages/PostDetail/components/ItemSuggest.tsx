
import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
import "./style.scss"
import { useNavigate } from "react-router-dom";

import JobCard from '#components/Home/JobCard';

import { PostNewest } from '#components/Home/NewJobs';

// interface SuggestItemProps {
//     content?: string
//     describe?: string
//     imgBackground?: string
//     postId?: Number
//     district?: string
//     province?: string
//     salary_min?: number
//     salary_max?: number
//     created_at_text?: string

// }

interface SuggestItemProps {
    item: {
        id: number;
        post_id: Number;
        title: string;
        company_name: string;
        image: string;
        ward: string;
        district: string;
        province: string;
        end_time: number;
        start_time: number;
        salary_max: number;
        salary_min: number;
        salary_type: string;
        resource: {
            company_icon: string;
        };
        job_type: {
            job_type_name: string;
        };
        created_at_text: string;
        bookmarked: boolean;
    };
}

const ItemInfoLeft: React.FC<SuggestItemProps> = (props) => {
    const navigate = useNavigate();
    return (
        <div
            // onClick={() => {
            //     window.open(`/post-detail?post-id=${props.item.post_id}`)
            // }} 

            className='div-suggest-include' style={{ width: "95%", paddingBottom: 10 }}>
            {/* <div className='div-item-suggest'>
                <img src={props.item.image} />
                <div className='title-job-suggest' >
                    <h5>{props.item.title}</h5>
                    <p style={{ color: "#575757", fontSize: 13 }}>{props.item.company_name}</p>
                </div>
            </div> */}
            <JobCard item={props.item} />
        </div>
    )
}

export default ItemInfoLeft
