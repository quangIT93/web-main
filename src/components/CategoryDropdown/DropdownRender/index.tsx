import React from "react";
import { Space, Divider, Button, theme } from 'antd';

import './style.scss';
import { useLocation } from "react-router-dom";

const { useToken } = theme;

interface IDropdownRender {
    menu: any;
}

const DropdownRender: React.FC<IDropdownRender> = (props) => {
    const { menu } = props;
    const location = useLocation();
    const { token } = useToken();
    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        maxWidth: '1080px !important',
        padding: '24px 36px',
        top: '25px !important',
        left: '-31px !important',
        gap: '96px'
    };

    return (
        <div style={contentStyle}>
            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
            <Divider style={{ margin: 0 }} />
        </div>
    )
}

export default DropdownRender