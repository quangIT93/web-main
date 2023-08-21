import React from "react";
import {
    ThinkingIcon,
    UseCircleIcon,
    EysIcon,
    LikeIcon,
    CommentIcon,
} from '#components/Icons';
import communityApi from "api/apiCommunity";
import { useSelector } from "react-redux";
import { RootState } from "store";

const WorkingStory = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);

    const [stories, setStories] = React.useState();

    const handleGetWorkingStory = async () => {
        try {
            const result = await communityApi.getCommunityWorkingStory();
            if (result) {
                setStories(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleGetWorkingStory();
    }, [])

    console.log("story:", stories);


    return (
        <>
            <div className="community-content-title">
                <div className="community-content-title_left">
                    <ThinkingIcon />
                    <h3>HiJob Working story</h3>
                </div>
                <p onClick={() => window.open('/new-comunity', '_parent')}>
                    View all
                </p>
            </div>
            <div className="community-content-body">
                {[...Array(5)].map((item) => (
                    <div className="community-content-body_item">
                        <div className="body-item-title">
                            <h3>Kinh nghiệm tìm việc nhà hàng</h3>
                            <p>1 ngày trước</p>
                        </div>
                        <div className="body-item-user">
                            <UseCircleIcon />
                            <p>Trần Văn An</p>
                        </div>
                        <div className="body-item-actions">
                            <div className="action-item">
                                <EysIcon />
                                <p>1234</p>
                            </div>
                            <div className="action-item">
                                <LikeIcon />
                                <p>300</p>
                            </div>
                            <div className="action-item">
                                <CommentIcon />
                                <p>30</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default WorkingStory;