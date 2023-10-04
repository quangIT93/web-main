import { Dropdown, MenuProps } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface IJobInfoDropDown {
    moveToAppliedJob: () => any;
    moveToSaveJob: () => any;
    moveToRecruimentPost: () => any;
    moveToNewestJob: () => any;
    moveToOpeningPost: () => any;
    moveToHotJob: () => any;
    moveToClosedPost: () => any;
    moveToJobByHotPlace: () => any;
    moveToPostjob: () => any;
    moveToSuggestedJob: () => any;
    moveToCompanyInfor: () => any;
}

const JobInfoDropDown: React.FC<IJobInfoDropDown> = (props) => {
    const {
        moveToAppliedJob,
        moveToSaveJob,
        moveToRecruimentPost,
        moveToNewestJob,
        moveToOpeningPost,
        moveToHotJob,
        moveToClosedPost,
        moveToJobByHotPlace,
        moveToPostjob,
        moveToSuggestedJob,
        moveToCompanyInfor
    } = props;

    const roleRedux = useSelector((state: RootState) => state.changeRole.role)
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const jobInfo = [
        {
            key: '1',
            label: (
                <a style={{ display: roleRedux === 0 ? 'block' : 'none' }} onClick={moveToAppliedJob}>
                    {
                        languageRedux === 1 ?
                            "Việc làm đã ứng tuyển" :
                            "Apllied Jobs"
                    }
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={
                    roleRedux === 0 ?
                        moveToSaveJob :
                        moveToRecruimentPost
                }>
                    {
                        roleRedux === 0 ?
                            languageRedux === 1 ?
                                "Việc làm đã lưu" :
                                "Saved jobs" :
                            languageRedux === 1 ?
                                "Việc làm tuyển dụng đã đăng" :
                                "Recruitment posted"
                    }
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={
                    roleRedux === 0 ?
                        moveToNewestJob :
                        moveToOpeningPost
                }>
                    {
                        roleRedux === 0 ?
                            languageRedux === 1 ?
                                "Công việc mới nhất" :
                                "Newest jobs" :
                            languageRedux === 1 ?
                                "Bài tuyển dụng đang mở" :
                                "Job posting is opening"
                    }
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a onClick={
                    roleRedux === 0 ?
                        moveToHotJob :
                        moveToClosedPost
                }>
                    {
                        roleRedux === 0 ?
                            languageRedux === 1 ?
                                "Công việc nổi bật" :
                                "Hot jobs" :
                            languageRedux === 1 ?
                                "Bài tuyển dụng đã đóng" :
                                "Job posting is closed"
                    }
                </a>
            ),
        },
        {
            key: '5',
            label: (
                <a onClick={
                    roleRedux === 0 ?
                        moveToJobByHotPlace :
                        moveToPostjob
                }>
                    {
                        roleRedux === 0 ?
                            languageRedux === 1 ?
                                "Công việc theo chủ đề" :
                                "Job by hot places" :
                            languageRedux === 1 ?
                                "Đăng bài tuyển dụng" :
                                "Post recruitment posts"
                    }
                </a>
            ),
        },
        {
            key: '6',
            label: (
                <a onClick={
                    roleRedux === 0 ?
                        moveToSuggestedJob :
                        moveToCompanyInfor
                }>
                    {
                        roleRedux === 0 ?
                            languageRedux === 1 ?
                                "Công việc gợi ý" :
                                "Suggested jobs" :
                            languageRedux === 1 ?
                                "Thông tin công ty" :
                                "Company information"
                    }
                </a>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items: jobInfo }}
            placement="bottomLeft"
            trigger={['click']}
        >
            <h3>
                {
                    roleRedux === 0 ?
                        languageRedux === 1 ?
                            "Thông tin việc làm" :
                            "Job information" :
                        languageRedux === 1 ?
                            "Thông tin tuyển dụng" :
                            "Employment information"
                }
            </h3>
        </Dropdown>
    )
}

export default JobInfoDropDown;