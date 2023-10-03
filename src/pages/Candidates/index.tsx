import React from 'react';
// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';
const index = () => {
  const listData: any = {
    status: 200,
    data: {
      total: 9,
      cvFilters: [
        {
          accountId: '577af5b4-5cb9-436e-9c31-c45d8fc3e2da',
          name: 'Phiên Nguyễn',
          updatedAt: 1695702860000,
          childCategoriesData: [],
          profilesLocationsData: [],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: null,
          birthdayData: 949165200000,
        },
        {
          accountId: '6f1761d3-f9ef-44e4-8b65-aa5da720ef86',
          name: 'Đình Khôi Đặng',
          updatedAt: 1695697642000,
          childCategoriesData: [],
          profilesLocationsData: [
            {
              id: '568',
              full_name: 'Thành phố Nha Trang',
              province_id: '56',
            },
          ],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: null,
          birthdayData: 961693200000,
        },
        {
          accountId: '8b620044-ef15-443e-ae1b-3df84392895e',
          name: 'Minh Nhân',
          updatedAt: 1695702856000,
          childCategoriesData: [],
          profilesLocationsData: [],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: null,
          birthdayData: 950461200000,
        },
        {
          accountId: 'c9b02f55-52a7-44ee-ad29-4ab3cb7d9c8b',
          name: 'Nguyễn Tiến Đạt',
          updatedAt: 1695697632000,
          childCategoriesData: [],
          profilesLocationsData: [],
          profilesEducationsData: [{}],
          genderData: 'Nam',
          imageData: null,
          birthdayData: 968346000000,
        },
        {
          accountId: 'd0d75834-7cf1-4cad-b0a8-5be878b42d8a',
          name: 'trương thanh huy',
          updatedAt: 1695702857000,
          childCategoriesData: [],
          profilesLocationsData: [
            {
              id: '718',
              full_name: 'Thành phố Thủ Dầu Một',
              province_id: '74',
            },
            {
              id: '724',
              full_name: 'Thành phố Dĩ An',
              province_id: '74',
            },
            {
              id: '725',
              full_name: 'Thành phố Thuận An',
              province_id: '74',
            },
          ],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: null,
          birthdayData: 949338000000,
        },
        {
          accountId: 'd59a01bd-6b09-4ff8-84b2-e1a278aae891',
          name: 'Hòa Quách',
          updatedAt: 1695697635000,
          childCategoriesData: [],
          profilesLocationsData: [
            {
              id: '268',
              full_name: 'Quận Hà Đông',
              province_id: '01',
            },
          ],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: null,
          birthdayData: 963766800000,
        },
        {
          accountId: 'ec7e61dc-87bc-4c0d-8eab-5972c273be08',
          name: 'Phúc Nguyễn',
          updatedAt: 1695702855000,
          childCategoriesData: [],
          profilesLocationsData: [
            {
              id: '492',
              full_name: 'Quận Hải Châu',
              province_id: '48',
            },
            {
              id: '493',
              full_name: 'Quận Sơn Trà',
              province_id: '48',
            },
            {
              id: '495',
              full_name: 'Quận Cẩm Lệ',
              province_id: '48',
            },
          ],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: {
            avatar:
              'https://gig-app-upload.s3-ap-southeast-1.amazonaws.com/images/avatar/1682932403393-653a6df7-2718-4ce9-9656-89e8b8c7838a.jpg',
          },
          birthdayData: 950720400000,
        },
        {
          accountId: 'f489ce96-711e-44d7-aab1-e71f9a7d6fe0',
          name: 'Your name',
          updatedAt: 1695697633000,
          childCategoriesData: [],
          profilesLocationsData: [
            {
              id: '917',
              full_name: 'Quận Ô Môn',
              province_id: '92',
            },
          ],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: {
            avatar:
              'https://gig-app-upload.s3-ap-southeast-1.amazonaws.com/images/avatar/1682630302078-c6f9690a-e9ea-41da-a8d2-7cf6be95b479.jpg',
          },
          birthdayData: 966013200000,
        },
        {
          accountId: 'feb2e1e4-05b8-4113-bc73-80d83884bdb6',
          name: 'Trí Huỳnh văn',
          updatedAt: 1695697637000,
          childCategoriesData: [],
          profilesLocationsData: [],
          profilesEducationsData: [],
          genderData: 'Nam',
          imageData: null,
          birthdayData: 962816400000,
        },
      ],
      is_over: true,
    },
  };

  return (
    <div className="container-candidate">
      <Navbar />
      <div className="candidate">
        <div className="header-candidate"></div>
        <div className="search-candidate"></div>
        <div className="list-candidates">
          <div className="list-candidates_title">
            <h3>alfhlahflkanlka</h3>
          </div>
          <div className="list-candidate">
            {listData?.data?.cvFilters?.map((item: any) => {
              return (
                <div className="item-candidate">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div className="info-candidate">
                    <h3>Nguyen minh quang</h3>
                    <ul>
                      <li>
                        <span>icon</span>
                        <span>19xx</span>
                      </li>
                      <li>
                        <span>icon</span>
                        <span>Dai hoc</span>
                      </li>
                      <li>
                        <span>icon</span>
                        <span>Quan 1</span>
                      </li>
                      <li>
                        <span>icon</span>
                        <span>Design</span>
                      </li>
                      <li>
                        <span>icon</span>
                        <span>Update</span>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default index;
