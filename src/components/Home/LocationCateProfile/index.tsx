import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import style from './style.module.scss';
import { NewJobIcon } from '#components/Icons';
import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
const LocationCateProfile = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  return (
    <Box className={style.container_loca}>
      <Box className={style.container_loca_div}>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 26.0003H28V12.0003C28 11.4699 27.7893 10.9612 27.4142 10.5861C27.0391 10.211 26.5304 10.0003 26 10.0003H18V4.00032C18.0002 3.63815 17.9021 3.28272 17.7161 2.97195C17.5301 2.66118 17.2633 2.40675 16.944 2.23581C16.6247 2.06487 16.265 1.98384 15.9032 2.00137C15.5415 2.01889 15.1913 2.13432 14.89 2.33532L4.89 9.00032C4.61567 9.18335 4.39086 9.43137 4.23558 9.7223C4.0803 10.0132 3.99937 10.338 4 10.6678V26.0003H2C1.73478 26.0003 1.48043 26.1057 1.29289 26.2932C1.10536 26.4808 1 26.7351 1 27.0003C1 27.2655 1.10536 27.5199 1.29289 27.7074C1.48043 27.895 1.73478 28.0003 2 28.0003H30C30.2652 28.0003 30.5196 27.895 30.7071 27.7074C30.8946 27.5199 31 27.2655 31 27.0003C31 26.7351 30.8946 26.4808 30.7071 26.2932C30.5196 26.1057 30.2652 26.0003 30 26.0003ZM26 12.0003V26.0003H18V12.0003H26ZM6 10.6678L16 4.00032V26.0003H6V10.6678ZM14 14.0003V16.0003C14 16.2655 13.8946 16.5199 13.7071 16.7074C13.5196 16.895 13.2652 17.0003 13 17.0003C12.7348 17.0003 12.4804 16.895 12.2929 16.7074C12.1054 16.5199 12 16.2655 12 16.0003V14.0003C12 13.7351 12.1054 13.4808 12.2929 13.2932C12.4804 13.1057 12.7348 13.0003 13 13.0003C13.2652 13.0003 13.5196 13.1057 13.7071 13.2932C13.8946 13.4808 14 13.7351 14 14.0003ZM10 14.0003V16.0003C10 16.2655 9.89464 16.5199 9.70711 16.7074C9.51957 16.895 9.26522 17.0003 9 17.0003C8.73478 17.0003 8.48043 16.895 8.29289 16.7074C8.10536 16.5199 8 16.2655 8 16.0003V14.0003C8 13.7351 8.10536 13.4808 8.29289 13.2932C8.48043 13.1057 8.73478 13.0003 9 13.0003C9.26522 13.0003 9.51957 13.1057 9.70711 13.2932C9.89464 13.4808 10 13.7351 10 14.0003ZM10 21.0003V23.0003C10 23.2655 9.89464 23.5199 9.70711 23.7074C9.51957 23.895 9.26522 24.0003 9 24.0003C8.73478 24.0003 8.48043 23.895 8.29289 23.7074C8.10536 23.5199 8 23.2655 8 23.0003V21.0003C8 20.7351 8.10536 20.4808 8.29289 20.2932C8.48043 20.1057 8.73478 20.0003 9 20.0003C9.26522 20.0003 9.51957 20.1057 9.70711 20.2932C9.89464 20.4808 10 20.7351 10 21.0003ZM14 21.0003V23.0003C14 23.2655 13.8946 23.5199 13.7071 23.7074C13.5196 23.895 13.2652 24.0003 13 24.0003C12.7348 24.0003 12.4804 23.895 12.2929 23.7074C12.1054 23.5199 12 23.2655 12 23.0003V21.0003C12 20.7351 12.1054 20.4808 12.2929 20.2932C12.4804 20.1057 12.7348 20.0003 13 20.0003C13.2652 20.0003 13.5196 20.1057 13.7071 20.2932C13.8946 20.4808 14 20.7351 14 21.0003Z"
              fill="#001424"
            />
          </svg>
          <Box className={style.div_loca}>
            <span className={style.div_loca_title}>
              {languageRedux === 1
                ? 'Khu vực làm việc của bạn: '
                : languageRedux === 2
                ? 'Location: '
                : '당신의 근무 위치: '}
            </span>
            <span className={style.div_loca_content}>
              {profileV3?.profileLocations?.length !== 0 ? (
                <Tooltip
                  placement="top"
                  title={profileV3?.profileLocations
                    ?.map((value: any, index: number, array: any[]) =>
                      index === array.length - 1
                        ? value.fullName
                        : `${value.province.fullName}  (${value.fullName}), `,
                    )
                    .join('')}
                >
                  {`${profileV3?.profileLocations[0].province.fullName} (${
                    profileV3?.profileLocations[0].fullName
                  }) ${
                    profileV3?.profileLocations.length > 1
                      ? `+${profileV3?.profileLocations.length - 1}`
                      : ''
                  }`}
                </Tooltip>
              ) : languageRedux === 1 ? (
                ' none'
              ) : languageRedux === 2 ? (
                ' none'
              ) : (
                ' none'
              )}
            </span>
            <span className={style.div_loca_title}> -</span>
            <span className={style.div_loca_title}>
              {languageRedux === 1
                ? ' Lĩnh vực quan tâm của bạn: '
                : languageRedux === 2
                ? ' Career: '
                : ' 당신의 관심 분야: '}
            </span>

            <span className={style.div_loca_content}>
              {profileV3?.profileCategories?.length !== 0 ? (
                <Tooltip
                  placement="top"
                  title={profileV3?.profileCategories
                    ?.map((value: any, index: number, array: any[]) =>
                      index === array.length - 1
                        ? value.fullName
                        : `${value.parentCategory.fullName}  (${value.fullName}), `,
                    )
                    .join('')}
                >
                  {`${
                    profileV3?.profileCategories[0].parentCategory.fullName
                  } (${profileV3?.profileCategories[0].fullName}) ${
                    profileV3?.profileCategories.length > 1
                      ? `+${profileV3?.profileCategories.length - 1}`
                      : ''
                  }`}
                </Tooltip>
              ) : languageRedux === 1 ? (
                ' none'
              ) : languageRedux === 2 ? (
                ' none'
              ) : (
                ' none'
              )}
            </span>
          </Box>
        </Box>
      </Box>
      <Box>
        <Link to="/profile" className={style.icon_loca}>
          <SettingOutlined style={{ fontSize: '24px', color: '#000000' }} />
        </Link>
      </Box>
    </Box>
  );
};

export default LocationCateProfile;
