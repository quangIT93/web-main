import React, { useState } from "react";

import CVItem from '#components/Profile/CV';
import { Button, Popconfirm, Skeleton, Space, message } from "antd";
import { DownloadCVIcon, PencilIcon, TickIcon } from "#components/Icons";
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Mousewheel, Pagination } from 'swiper';
import { Avatar } from "@mui/material";
import ItemApply from '../../components/Item';
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalProfileInfoPerson from "#components/Profile/ModalProfileInfoPerson";
import ModalProfileContact from "#components/Profile/ModalProfileContact";
import ModalProfileCareerObjectice from "#components/Profile/ModalProfileCareerObjectice";
import ModalProfileEducationCreate from "#components/Profile/ModalProfileEducationCreate";
import ModalProfileLocation from "#components/Profile/ModalProfileLocation";
import ModalProfileExperienceCreate from "#components/Profile/ModalProfileExperienceCreate";
import SectionCv from "../SectionCv";
import profileApi from "api/profileApi";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "store";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

interface ItemAppy {
    id?: number | null;
    company_name?: string;
    major?: string;
    start_date?: number;
    end_date?: number;
    extra_information?: string;
    title?: string;
}

interface ICategories {
    child_category_id: number;
    parent_category_id: number;
    parent_category: string;
    child_category: string;
}

interface ICandidateProfile {
    display: string;
    profile: any;
    loading: boolean;
    language: any;
    languageRedux: any;
    openModalCareerObjective: boolean;
    openModalLocation: boolean;
    openModalEducationCreate: boolean;
    openModalExperienceCreate: boolean;
    setOpenModalCareerObjective: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalLocation: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalEducationCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalExperienceCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

const CandidateProfile: React.FC<ICandidateProfile> = (props) => {
    const {
        display,
        profile,
        loading,
        language,
        languageRedux,
        openModalCareerObjective,
        openModalLocation,
        openModalEducationCreate,
        openModalExperienceCreate,
        setOpenModalCareerObjective,
        setOpenModalLocation,
        setOpenModalEducationCreate,
        setOpenModalExperienceCreate,
    } = props;
    const dispatch = useDispatch();
    const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

    const [open, setOpen] = useState(false);

    const [cvHijob, setCvHijob] = useState<any[]>([1, 2]);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [listCv, setListCv] = useState<any[]>([
        {
            id: 4,
            name: 'cv4',
        },
        {
            id: 3,
            name: 'cv3',
        },
        {
            id: 2,
            name: 'cv2',
        },
        {
            id: 1,
            name: 'cv1',
        },
    ]);
    const [cvId, setCvId] = useState<any>();

    const handleChooseCv = (item: any, e: any) => {
        e.stopPropagation();
        setListCv((prev: any) => [
            prev.at(prev.indexOf(item)),
            ...prev.filter((value: any, index: any) => {
                return index !== prev.indexOf(item)
            }).sort((a: any, b: any) => b.id - a.id)
        ])
        setCvId(item.id)
    }

    // confirm delete cv
    const confirm = async () => {
        try {
            const result = await profileApi.deleteCV();
            if (result) {
                const result = await profileApi.getProfile(
                    languageRedux === 1 ? 'vi' : 'en',
                );
                if (result) {
                    setProfileUser(result.data);
                }
                setOpen(false);
                setFileList([]);
                message.success(language?.profile_page?.alert_delete_cv_success);
            }
        } catch (error) { }
    };

    // cancel delete cv
    const cancel = () => {
        setOpen(false);
        message.error(language?.profile_page?.cancel);
    };

    return (
        <div style={{ display: display, width: "100%" }}>
            <Skeleton className="skeleton-item" loading={loading} active>
                <div className="div-profile-info">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3>{language?.career_objective}</h3>
                        <Space
                            style={{ cursor: 'pointer' }}
                            onClick={() => setOpenModalCareerObjective(true)}
                        >
                            <div className="edit-icon">
                                <PencilIcon width={15} height={15} />
                            </div>

                            <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                                {language?.edit}
                            </p>
                        </Space>
                    </div>
                    <Space wrap className="item-info-work">
                        {profile?.categories?.length !== 0
                            ? profile?.categories?.map(
                                (item: ICategories, index: number) => (
                                    <Button key={index} className="btn" type="text">
                                        {item.child_category}
                                    </Button>
                                ),
                            )
                            : language?.unupdated}
                    </Space>
                </div>
            </Skeleton>
            <Skeleton className="skeleton-item" loading={loading} active>
                <div className="div-profile-info">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3>{language?.working_location}</h3>
                        <Space
                            style={{ cursor: 'pointer' }}
                            onClick={() => setOpenModalLocation(true)}
                        >
                            <div className="edit-icon">
                                <PencilIcon width={15} height={15} />
                            </div>

                            <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                                {language?.edit}
                            </p>
                        </Space>
                    </div>
                    <Space wrap className="item-info-work">
                        {profile?.locations?.length !== 0
                            ? profile?.locations?.map((item: any, index: number) => (
                                <Button key={index} className="btn" type="text">
                                    {item?.district}
                                </Button>
                            ))
                            : language?.unupdated}
                    </Space>
                </div>
            </Skeleton>

            <Skeleton className="skeleton-item" loading={loading} active>
                <div className="div-profile-info">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "HiJob CV/Hồ sơ để ứng tuyển" :
                                    "HiJob CV/Resume to apply"
                            }
                        </h3>
                        <Space
                            style={{
                                cursor: 'pointer',
                                display: cvHijob.length === 0 ? 'none' : 'flex'
                            }}
                        // onClick={() => setOpenModalLocation(true)}
                        >
                            <div className="edit-icon">
                                <PencilIcon width={15} height={15} />
                            </div>

                            <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                                {language?.edit}
                            </p>
                        </Space>
                    </div>
                    <div className="list-cv-container" >
                        {cvHijob?.length !== 0 ? (
                            <div className="list-cv-conttent">
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Chọn HiJob CV/Resume của bạn để Nhà tuyển dụng xem, đánh giá và lựa chọn!" :
                                            "Choose your HiJob CV/Resume for Employers to view, evaluate and select!"
                                    }
                                </p>
                                <Swiper
                                    navigation={true}
                                    slidesPerView="auto"
                                    spaceBetween={17}
                                    modules={[Mousewheel, Navigation, Pagination]}
                                    className="list-cv-swiper"
                                >
                                    {
                                        listCv.map((item: any, index: number) => {
                                            return (
                                                <SwiperSlide
                                                    key={index}
                                                    onClick={(event) => {
                                                        // handleClickItem();
                                                    }}
                                                >
                                                    <div className="slide-item" key={item}>
                                                        <Avatar variant="rounded">
                                                            {
                                                                `CV ${item.id}`
                                                            }
                                                            <div className="choose-cv-container"
                                                                onClick={(e) => handleChooseCv(item, e)}
                                                            >
                                                                <div className={
                                                                    cvId === item.id ?
                                                                        "choose-cv-content checked" :
                                                                        "choose-cv-content"
                                                                }
                                                                >
                                                                    <TickIcon />
                                                                </div>
                                                            </div>
                                                        </Avatar>
                                                        <div className="slide-item-bottom">
                                                            <h3>
                                                                {
                                                                    languageRedux === 1 ?
                                                                        `Hồ sơ số ${item.id}` :
                                                                        `Resume No.${item.id}`
                                                                }
                                                            </h3>
                                                            <div className="download-cv-icon">
                                                                <DownloadCVIcon width={14} height={14} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })
                                    }
                                </Swiper>
                            </div>
                        ) : (
                            <Space direction="vertical" align="start">
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "Bạn chưa có HiJob CV/Resume để Nhà tuyển dụng xem, đánh giá và lựa chọn!" :
                                            "You don't have a HiJob CV/Resume for recruitment to view, evaluate and choose!"
                                    }
                                </p>
                                <img style={{ width: 200 }} src="/cv3 1.png" alt="CV" />
                            </Space>
                        )}
                    </div>
                </div>
            </Skeleton>

            <Skeleton className="skeleton-item" loading={loading} active>
                <div className="div-profile-info">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3>{language?.education}</h3>
                    </div>
                    {profile?.educations?.length !== 0 ? (
                        profile?.educations?.map((education: ItemAppy, index: number) => (
                            <ItemApply item={education} key={index} />
                        ))
                    ) : (
                        <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <Space
                            style={{ alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => setOpenModalEducationCreate(true)}
                        >
                            <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                            <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                                {language?.add}
                            </p>
                        </Space>
                    </div>
                </div>
            </Skeleton>
            <Skeleton className="skeleton-item" loading={loading} active>
                <div className="div-profile-info">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3>{language?.working_experience}</h3>
                    </div>
                    {profile?.experiences?.length !== 0 ? (
                        profile?.experiences?.map((item: any, index: number) => (
                            <ItemApply typeItem="experiences" key={index} item={item} />
                        ))
                    ) : (
                        <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <Space
                            style={{ alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => setOpenModalExperienceCreate(true)}
                        >
                            <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                            <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                                {language?.add}
                            </p>
                        </Space>
                    </div>
                </div>

                <ModalProfileCareerObjectice
                    openModalCareerObjective={openModalCareerObjective}
                    setOpenModalCareerObjective={setOpenModalCareerObjective}
                    categories={profile?.categories}
                />

                <ModalProfileEducationCreate
                    openModalEducationCreate={openModalEducationCreate}
                    setOpenModalEducationCreate={setOpenModalEducationCreate}
                    typeItem="createEducation"
                    educations={profile?.educations}
                />
                <ModalProfileLocation
                    openModalLocation={openModalLocation}
                    setOpenModalLocation={setOpenModalLocation}
                    locations={profile?.locations}
                />

                <ModalProfileExperienceCreate
                    openModalExperienceCreate={openModalExperienceCreate}
                    setOpenModalExperienceCreate={setOpenModalExperienceCreate}
                    typeItem="createExperience"
                    educations={profile?.educations}
                />
            </Skeleton>
            <SectionCv
                loading={loading}
                languageRedux={languageRedux}
                language={language}
            />
            {
                profile.cv_url ?
                    <Skeleton className="skeleton-item" loading={loading} active>
                        <div className="div-profile-info">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Cv/Hồ sơ của bạn" :
                                            "Your CV/ Resume"
                                    }
                                </h3>

                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "CV/Resume của bạn để ứng tuyển cùng HiJob!" :
                                            "Your CV/Resume to apply with HiJob!"
                                    }
                                </p>
                            </div>
                            <Space
                                wrap
                                size={20}
                                direction="vertical"
                                style={{ marginTop: 20 }}
                                className="cv-input-container"
                            >
                                <div
                                    // align="center"
                                    style={{
                                        marginLeft: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                // direction="vertical"
                                >
                                    <Popconfirm
                                        title={language?.profile_page?.delete_cv}
                                        description={language?.profile_page?.alert_delete_cv}
                                        open={open}
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText={language?.yes}
                                        cancelText={language?.no}
                                    >
                                        <CVItem
                                            url={profile.cv_url}
                                            open={open}
                                            setOpen={setOpen}
                                            isProfile={true}
                                            language={language}
                                        />
                                    </Popconfirm>
                                </div>
                            </Space>
                        </div>
                    </Skeleton>
                    :
                    <></>
            }
        </div>
    )
}

export default CandidateProfile;