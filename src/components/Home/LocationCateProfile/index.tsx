import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import style from './style.module.scss';
import { NewJobIcon } from '#components/Icons';
import { Link } from 'react-router-dom';

const LocationCateProfile = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  console.log('profileV3', profileV3);

  return (
    // <Box className={style.container_loca}>
    //   <Box className={style.div_loca}>
    //     <svg
    //       width="24"
    //       height="25"
    //       viewBox="0 0 24 25"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M13.0462 2.27812C12.7169 1.26467 11.2831 1.26468 10.9538 2.27812L8.86991 8.6918H2.12616C1.06057 8.6918 0.617516 10.0554 1.4796 10.6817L6.9354 14.6456L4.85147 21.0593C4.52218 22.0727 5.68211 22.9154 6.5442 22.2891L12 18.3252L17.4558 22.2891C18.3179 22.9154 19.4778 22.0727 19.1485 21.0593L17.0646 14.6456L22.5204 10.6817C23.3825 10.0554 22.9394 8.6918 21.8738 8.6918H15.1301L13.0462 2.27812Z"
    //         fill="#FBBC04"
    //         stroke="#FBBC04"
    //         stroke-width="1.2"
    //       />
    //     </svg>

    //     <h2 className={style.title_loca}>
    //       {languageRedux === 1
    //         ? 'Khu vực làm việc và lĩnh vực quan tâm'
    //         : languageRedux === 2
    //         ? 'Newest Jobs'
    //         : languageRedux === 3
    //         ? '최신 작업'
    //         : 'Công việc mới nhất'}
    //     </h2>

    //     <h2 className={style.title_setting}>
    //       {languageRedux === 1
    //         ? 'Cài đặt'
    //         : languageRedux === 2
    //         ? 'Setting'
    //         : '설정'}
    //     </h2>
    //   </Box>
    //   <Box className={style.div_content}>
    //     <Box className={style.div_content_loca}>
    //       <h3 className={style.div_content_loca_title}>Khu vực làm việc:</h3>
    //       <p className={style.div_content_loca_items}>
    //         {profileV3?.profileLocations?.length !== 0
    //           ? profileV3?.profileLocations
    //               ?.map((value: any, index: number, array: any[]) =>
    //                 index === array.length - 1
    //                   ? value.fullName
    //                   : `${value.fullName}, `,
    //               )
    //               .join('')
    //           : 'Chưa chọn khu vực làm việc'}
    //       </p>
    //     </Box>
    //     <Box className={style.div_content_loca}>
    //       <h3 className={style.div_content_loca_title}>Lĩnh vực quan tâm:</h3>
    //       <p className={style.div_content_loca_items}>
    //         {profileV3?.profileCategories?.length !== 0
    //           ? profileV3?.profileCategories
    //               ?.map((value: any, index: number, array: any[]) =>
    //                 index === array.length - 1
    //                   ? value.fullName
    //                   : `${value.fullName}, `,
    //               )
    //               .join('')
    //           : 'Chưa chọn khu vực làm việc'}
    //       </p>
    //     </Box>
    //   </Box>
    // </Box>

    <Box className={style.container_loca}>
      <Box className={style.container_loca_div}>
        <Box className={style.div_loca}>
          <span className={style.div_loca_title}>
            {languageRedux === 1
              ? 'Khu vực làm việc của bạn: '
              : languageRedux === 2
              ? 'Your working location: '
              : '당신의 근무 위치: '}
          </span>
          <span className={style.div_loca_content}>
            {profileV3?.profileLocations?.length !== 0
              ? profileV3?.profileLocations
                  ?.map((value: any, index: number, array: any[]) =>
                    index === array.length - 1
                      ? value.fullName
                      : `${value.province.fullName}  (${value.fullName}), `,
                  )
                  .join('')
              : languageRedux === 1
              ? 'Chưa chọn khu vực làm việc'
              : languageRedux === 2
              ? 'Working location has not been selected'
              : '근무 위치를 설정하지 않았습니다'}
          </span>
        </Box>
        <Box className={style.div_loca}>
          <span className={style.div_loca_title}>
            {languageRedux === 1
              ? ' Lĩnh vực quan tâm của bạn: '
              : languageRedux === 2
              ? 'Your career objective: '
              : '당신의 관심 분야: '}
          </span>
          <span className={style.div_loca_content}>
            {profileV3?.profileCategories?.length !== 0
              ? profileV3?.profileCategories
                  ?.map((value: any, index: number, array: any[]) =>
                    index === array.length - 1
                      ? value.fullName
                      : `${value.fullName}, `,
                  )
                  .join('')
              : languageRedux === 1
              ? 'Chưa chọn lĩnh vực quan tâm'
              : languageRedux === 2
              ? 'Career objective has not been selected'
              : '관심 분야를 설정하지 않았습니다'}
          </span>
        </Box>
      </Box>
      <Box>
        <Link to="/profile" className={style.icon_loca}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.24 13.62L8.82999 14.35C8.69706 14.3646 8.56292 14.3646 8.42999 14.35C7.95697 14.3541 7.50245 14.1665 7.16999 13.83C6.74272 13.3917 6.5659 12.7672 6.69999 12.17L7.42999 8.77001C7.58507 8.10146 7.93274 7.49303 8.42999 7.02001L14.13 1.32001H5.12999C4.01463 1.30645 2.941 1.74355 2.15226 2.53228C1.36353 3.32102 0.926434 4.39465 0.939988 5.51001V15.86C0.939988 18.1465 2.79353 20 5.07999 20H15.44C17.7264 20 19.58 18.1465 19.58 15.86V7.07001L14 12.66C13.5195 13.1448 12.9077 13.4785 12.24 13.62Z"
              fill="#0d99ff"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.77 1.11001C16.9273 -0.217726 18.9367 -0.369209 20.28 0.770014C20.843 1.41829 21.1238 2.26458 21.06 3.12084C20.9961 3.9771 20.5929 4.7724 19.94 5.33001L13.27 12C12.9182 12.3328 12.4767 12.5552 12 12.64L8.61999 13.4C8.3419 13.4811 8.04185 13.3992 7.84345 13.1882C7.64505 12.9771 7.58189 12.6726 7.67999 12.4L8.40999 9.00001C8.52152 8.53688 8.76055 8.11425 9.09999 7.78001L15.77 1.11001ZM16.18 5.77001L18.42 3.53001C18.6953 3.2345 18.6872 2.774 18.4016 2.48839C18.116 2.20278 17.6555 2.19465 17.36 2.47001L15.12 4.71001C14.8275 5.00283 14.8275 5.4772 15.12 5.77001C15.4128 6.06247 15.8872 6.06247 16.18 5.77001Z"
              fill="#0d99ff"
            />
          </svg>
        </Link>
      </Box>
    </Box>
  );
};

export default LocationCateProfile;
