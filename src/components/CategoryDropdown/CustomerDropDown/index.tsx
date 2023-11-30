import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ICvDropDown {
  moveToPolicy: () => any;
  moveToSupportTerms: () => any;
  moveToMemberGuide: () => any;
}

const CustomerDropDown: React.FC<ICvDropDown> = (props) => {
  const { moveToPolicy, moveToSupportTerms, moveToMemberGuide } = props;

  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const customer = [
    {
      key: '1',
      label: (
        <a onClick={moveToPolicy}>
          {languageRedux === 1
            ? 'Chính sách bảo mật'
            : languageRedux === 2
              ? 'Privacy Policy'
              : languageRedux === 3 && '개인 정보 정책'}
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={moveToSupportTerms}>
          {languageRedux === 1
            ? 'Điều khoản hỗ trợ'
            : languageRedux === 2
              ? 'Support terms'
              : languageRedux === 3 && '지원조건'}
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={moveToMemberGuide}>
          {languageRedux === 1
            ? 'Hướng dẫn thành viên'
            : languageRedux === 2
              ? 'Member Guide'
              : languageRedux === 3 && '회원안내'}
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: customer }}
      placement="bottomLeft"
      trigger={['hover']}
    >
      <h3>
        {languageRedux === 1
          ? 'Hỗ trợ khách hàng'
          : languageRedux === 2
            ? 'Customer support'
            : languageRedux === 3 && '고객지원서비스'}
      </h3>
    </Dropdown>
  );
};

export default CustomerDropDown;
