import React, { FC } from 'react'

//import scss
import './style.scss'

//MUI
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ImageListItem from '@mui/material/ImageListItem'

//ANT
import {
    EnvironmentFilled,
    ClockCircleFilled,
    EuroCircleFilled,
    CaretDownFilled,
} from '@ant-design/icons'
import { Space, Tooltip } from 'antd'

import moment from 'moment'
import bookMarkApi from 'api/bookMarkApi';

import { PostNewest } from '../NewJobs'
interface IitemNewJob {
    item: {
        id: number
        post_id: Number
        title: string
        company_name: string
        image: string
        ward: string
        district: string
        province: string
        end_time: number
        start_time: number
        salary_max: number
        salary_min: number
        salary_type: string
        resource: {
            company_icon: string
        }
        job_type: {
            job_type_name: string
        }
        created_at_text: string
        bookmarked: boolean
    }
}
interface Iprops {
    item: PostNewest
}

const JobCard: React.FC<Iprops> = (props) => {
    const [checkBookMark, setCheckBookMark] = React.useState(true)

    const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
        window.open(`/post-detail?post-id=${id}`)
    }

    return (
        <Card
            sx={{
                minWidth: '100%',
                display: 'flex',
                padding: '12px',
                cursor: 'pointer',
                '&:hover': {
                    background: '#E7E7ED',
                    transition: 'all 0.3s linear',
                },
                boxShadow: 'none',
                borderRadius: '5px',
                justifyContent: 'space-between',
            }}
        >
            <div className="div-card-post-left"
                onClick={(e) => {
                    handleClickItem(e, props.item.id)
                }}
            >
                <ImageListItem
                    key={props.item.image}
                    sx={{ flex: 1, display: 'flex' }}
                >
                    <img
                        src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${props.item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={props.item.title}
                        loading="lazy"
                        style={{
                            maxWidth: '120px',
                            maxHeight: '120px',
                            borderRadius: 10,
                        }}
                    />
                    <div
                        style={{ padding: '0', marginLeft: '12px' }}
                        className="div-card-post-left_info"
                    >
                        {' '}
                        <Tooltip placement="top" title={props.item.title}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{
                                    fontSize: '15px',
                                    margin: 0,
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {props?.item?.title?.length > 50
                                    ? `${props.item.title.substring(0, 50)} ...`
                                    : props.item.title}
                            </Typography>
                        </Tooltip>
                        <Tooltip placement="top" title={props.item.company_name}>
                            <Typography
                                gutterBottom
                                variant="h1"
                                component="div"
                                sx={{
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {props?.item?.company_name?.length > 50
                                    ? `${props.item.company_name.substring(0, 50)} ...`
                                    : props.item.company_name}
                            </Typography>
                        </Tooltip>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <EnvironmentFilled className="div-card-post-left_info__icon" />
                            <Typography variant="body2" color="text.secondary"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {`${props.item.district}, ${props.item.province}`}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <ClockCircleFilled className="div-card-post-left_info__icon" />
                            <Typography variant="body2" color="text.secondary"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {moment(new Date(props.item.start_time)).format('HH:mm')}{' '}
                                - {moment(new Date(props.item.end_time)).format('HH:mm')}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <AttachMoneyIcon
                                sx={{
                                    fontSize: 20,
                                    marginLeft: '-2px',
                                    marginRight: '2px',
                                    color: '#575757',
                                }}
                                className="div-card-post-left_info__icon"
                            />
                            <Typography variant="body2" color="text.secondary"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {new Intl.NumberFormat('en-US').format(
                                    props.item.salary_min
                                )}{' '}
                                -{' '}
                                {new Intl.NumberFormat('en-US').format(
                                    props.item.salary_max
                                ) + `/${props.item.salary_type}`}
                            </Typography>
                        </div>
                        <div
                            style={{
                                marginTop: 5,
                            }}
                        >
                            <p
                                style={{
                                    color: '#AAAAAA',
                                    fontSize: 13,
                                    fontStyle: 'italic',
                                }}
                            >
                                {props.item.created_at_text}
                            </p>
                        </div>
                    </div>
                </ImageListItem>
            </div>

            <Space
                style={{ justifyContent: 'space-between' }}
                direction="vertical"
                align="center"
                className="div-card-post-right"
            >
                <div
                    onClick={async (e) => {
                        try {
                            if (props.item.bookmarked) {
                                const result = await bookMarkApi.deleteBookMark(
                                    props.item.id
                                )
                                props.item.bookmarked = false
                                if (result) {
                                    setCheckBookMark(!checkBookMark)
                                }
                            } else {
                                const result = await bookMarkApi.createBookMark(
                                    props.item.id
                                )
                                props.item.bookmarked = true
                                if (result) {
                                    setCheckBookMark(!checkBookMark)
                                }
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    {props.item.bookmarked ? (
                        <TurnedInIcon
                            sx={{ top: 0, right: 0, color: '#0d99ff' }}
                        />
                    ) : (
                        <BookmarkBorderOutlinedIcon
                            sx={{ top: 0, right: 0, color: '' }}
                        />
                    )}
                </div>
                <img
                    className="img-resource-company"
                    src={props.item.resource.company_icon}
                    alt="ảnh"
                />
                <p style={{ fontSize: 13, fontStyle: 'italic' }}>
                    {props.item.job_type.job_type_name}
                </p>
            </Space>
        </Card>
    )

}

export default JobCard;