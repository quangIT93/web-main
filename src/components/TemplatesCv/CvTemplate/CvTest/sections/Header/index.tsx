import Avatar from "antd/es/avatar/avatar";
import React from "react";

import './style.scss';

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-left-div">
                    <div className="top-left-div"></div>
                    <div className="bottom-left-div"></div>
                </div>
                <div className="header-avatar-div">
                    <Avatar />
                </div>
                <div className="header-language-div">
                    <h3>Language</h3>
                    <div className="bot-language-div"></div>
                </div>
                <div className="header-right-div"></div>
            </div>
        </div>
    )
}

export default Header;