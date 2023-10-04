import { Dropdown, MenuProps } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface ICvDropDown {
    moveToWorkingStory: () => any;
    moveToHijobNews: () => any;
    moveToPostArticle: () => any;
    moveToSavedArticle: () => any;
}

const ComunityDropDown: React.FC<ICvDropDown> = (props) => {
    const {
        moveToWorkingStory,
        moveToHijobNews,
        moveToPostArticle,
        moveToSavedArticle,
    } = props;

    const roleRedux = useSelector((state: RootState) => state.changeRole.role)
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const comunity = [
        {
            key: '1',
            label: (
                <a onClick={moveToWorkingStory}>
                    {
                        languageRedux === 1 ?
                            "Câu chuyện làm việc" :
                            "Working story"
                    }
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={moveToHijobNews}>
                    {
                        languageRedux === 1 ?
                            "Tin tức" :
                            "News"
                    }
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={moveToPostArticle}>
                    {
                        languageRedux === 1 ?
                            "Đăng bài viết mới" :
                            "Post new articles"
                    }
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a onClick={moveToSavedArticle}>
                    {
                        languageRedux === 1 ?
                            "Bài viết đã lưu" :
                            "Saved post"
                    }
                </a>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items: comunity }}
            placement="bottomLeft"
            trigger={['click']}
        >
            <h3>
                {
                    languageRedux === 1 ?
                        "Cộng đồng" :
                        "Community"
                }
            </h3>
        </Dropdown>
    )
}

export default ComunityDropDown;