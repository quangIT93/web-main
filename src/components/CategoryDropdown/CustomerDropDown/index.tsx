import { Dropdown, MenuProps } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface ICvDropDown {
    moveToPolicy: () => any;
    moveToSupportTerms: () => any;
    moveToMemberGuide: () => any;
}

const CustomerDropDown: React.FC<ICvDropDown> = (props) => {
    const {
        moveToPolicy,
        moveToSupportTerms,
        moveToMemberGuide,
    } = props;

    const roleRedux = useSelector((state: RootState) => state.changeRole.role)
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const customer = [
        {
            key: '1',
            label: (
                <a onClick={moveToPolicy}>
                    {
                        languageRedux === 1 ?
                            "Chính sách bảo mật" :
                            "Privacy Policy"
                    }
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={moveToSupportTerms}>
                    {
                        languageRedux === 1 ?
                            "Điều khoản hỗ trợ" :
                            "Support terms"
                    }
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={moveToMemberGuide}>
                    {
                        languageRedux === 1 ?
                            "Hướng dẫn thành viên" :
                            "Member Guide"
                    }
                </a>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items: customer }}
            placement="bottomLeft"
            trigger={['click']}
        >
            <h3>
                {
                    languageRedux === 1 ?
                        "Hỗ trợ khách hàng" :
                        "Customer support"
                }
            </h3>
        </Dropdown>
    )
}

export default CustomerDropDown;