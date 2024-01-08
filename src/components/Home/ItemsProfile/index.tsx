import React, { useEffect, useRef } from 'react';

import style from './style.module.scss';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { Cascader, Divider, Typography, Select, Skeleton } from 'antd';
import { BagFilterIcon, ArrowFilterIcon } from '#components/Icons';
import categoriesApi from 'api/categoriesApi';
import locationApi from 'api/locationApi';
import { setLocationApi } from 'store/reducer/locationReducer';

const { SHOW_CHILD } = Cascader;

const { Text } = Typography;
const ItemsProfile = () => {
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const dispatch = useDispatch();
  const dataLocations = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [active, setActive] = React.useState<any>(true);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const listCate: any = useRef<any>(
    profileV3?.profileCategories.map((profile: any) => [
      profile?.parentCategory?.id,
      profile?.id,
    ]),
  );

  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        // setDataLocations(result.data);
        dispatch(setLocationApi(result));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listLocation: any = useRef<any>(
    profileV3?.profileLocations?.map((profile: any) => [
      profile?.province?.id,
      profile?.id,
    ]),
  );

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setDataCategories(result.data);
      }

      //   if (
      //     location?.pathname !== '/search-results' &&
      //     userProfile &&
      //     listCate?.current?.length === 0
      //   ) {
      //     setListCate(
      //       userProfile?.categories.map((profile: any) => [
      //         profile?.parent_category_id,
      //         profile?.child_category_id,
      //       ]),
      //     );
      //   } else {
      //     setListCate(listCate?.current);
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();

    if (dataLocations.length === 0) {
      getAllLocaitions();
    }
  }, []);

  useEffect(() => {
    if (listLocation?.current?.length !== 0) {
      setActive(false);
    } else {
      setTimeout(() => {
        setActive(true);
      }, 2000);
    }
  }, [listLocation]);

  console.log('profileV3', profileV3);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Chọn danh mục nghề nghiệp'
          : languageRedux === 2
          ? 'Select a career category'
          : languageRedux === 3 && '카테고리를 선택합니다'}
      </Text>
      {menus}
      <Divider style={{ margin: 4 }}>
        {false
          ? languageRedux === 1
            ? 'Chỉ có thể tối đa 10 danh mục'
            : languageRedux === 2
            ? 'Only up to 10 categories can be'
            : languageRedux === 3 && '최대 10개의 카테고리만 가능합니다'
          : ''}
      </Divider>
      {/* <div style={{ padding: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="default" onClick={() => {}}>
              Huỷ
            </Button>
            <Button type="primary" onClick={() => {}}>
              Áp dụng
            </Button>
          </div> */}
    </div>
  );

  const onChange = (value: any) => {};

  console.log('active', active);

  return (
    <div className={style.items_profile}>
      <Skeleton loading={active}>
        {profileV3?.profileCategories?.length === 0 &&
        profileV3?.profileCategories?.length === 0 ? (
          <>
            <h3 className="">
              {languageRedux === 1
                ? 'Hãy thiết lập Khu vực làm việc và lĩnh vực công việc mà bạn quan tâm'
                : languageRedux === 2
                ? `Set up your Work Area and the areas of work you're interested in`
                : '작업 구역과 관심 있는 영역을 설정하세요'}
              <span
                className={style.items_profile_setting}
                onClick={() => window.open('/profile', '_parent')}
              >
                {languageRedux === 1
                  ? 'Cài đặt'
                  : languageRedux === 2
                  ? 'Setting'
                  : '설정'}
              </span>
            </h3>
          </>
        ) : (
          <>
            <h3 className="">
              {languageRedux === 1
                ? `Kết quả công việc được đề xuất dựa theo Khu vực làm việc và Lĩnh vực quan tâm mà bạn đã thiết lập trong Hồ sơ`
                : languageRedux === 2
                ? `Suggested job outcomes are based on the Work Area and Areas of Interest you set up in your Profile:`
                : '당신의 프로필에 설정한 작업 구역 및 관심 영역을 기반으로 채용 결과가 제안됩니다'}{' '}
              <span
                className={style.items_profile_setting}
                onClick={() => window.open('/profile', '_parent')}
              >
                {' '}
                {languageRedux === 1
                  ? 'Cài đặt'
                  : languageRedux === 2
                  ? 'Setting'
                  : '설정'}
              </span>
            </h3>

            <div className={style.items_profile_wrapItem}>
              <Cascader
                open={false}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                dropdownRender={DropdownRender}
                suffixIcon={<ArrowFilterIcon width={14} height={10} />}
                options={
                  dataCategories
                    ? dataCategories.map((parentCategory: any) => ({
                        value: parentCategory.parent_category_id,
                        label: parentCategory.parent_category,
                        // disabled:
                        //   cateId.length < 2
                        //     ? false
                        //     : cateId.length <= 2 &&
                        //       cateId.includes(parentCategory.parent_category_id)
                        //     ? false
                        //     : true,
                        children: parentCategory.childs.map((child: any) => {
                          var dis = false;
                          //check id child  when disable = true
                          // if (false) {
                          //   dis = true;
                          //   for (const elem of categoriesId) {
                          //     if (elem === child.id) {
                          //       dis = false;
                          //       break;
                          //     }
                          //   }
                          // }
                          return {
                            value: child.id,
                            label: child.name,
                            disabled: dis,
                          };
                        }),
                      }))
                    : []
                }
                onChange={onChange}
                defaultValue={
                  listCate?.current?.length !== 0
                    ? listCate?.current
                    : listCate?.current?.length !== 0
                    ? listCate?.current
                    : listCate?.current?.length === 0
                    ? []
                    : profileV3?.profileCategories.map((profile: any) => [
                        profile?.parentCategory?.id,
                        profile?.id,
                      ])
                }
                value={listCate?.current}
                multiple
                maxTagCount="responsive"
                size="large"
                className="inputCategories input-filter_nav"
                showCheckedStrategy={SHOW_CHILD}
                style={{ width: '100%', borderRadius: '2px' }}
                placeholder={
                  languageRedux === 1
                    ? 'Chọn danh mục nghề nghiệp'
                    : languageRedux === 2
                    ? 'Select a career category'
                    : languageRedux === 3 && '카테고리를 선택합니다'
                }
                allowClear={false}
              />
              <Cascader
                allowClear={false}
                open={false}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                dropdownRender={DropdownRender}
                suffixIcon={<ArrowFilterIcon width={14} height={10} />}
                options={
                  dataLocations.length !== 0
                    ? dataLocations?.map((dataLocation: any) => ({
                        value: dataLocation.province_id,
                        label: dataLocation.province_fullName,
                        // disabled:
                        //   proviId.length < 2
                        //     ? false
                        //     : proviId.length <= 2 &&
                        //       proviId.includes(dataLocation.province_id)
                        //     ? false
                        //     : true,
                        children: dataLocation.districts.map(
                          (child: {
                            district_id: string;
                            district: string;
                          }) => {
                            var dis = false;
                            //   if (disable) {
                            //     dis = true;
                            //     for (const elem of locId) {
                            //       if (elem === child.district_id) {
                            //         dis = false;
                            //         break;
                            //       }
                            //     }
                            //   }
                            return {
                              value: child.district_id,
                              label: child.district,
                            };
                          },
                        ),
                      }))
                    : []
                }
                onChange={onChange}
                defaultValue={profileV3?.profileLocations.map(
                  (location: any) => [location?.province?.id, location?.id],
                )}
                value={listLocation?.current}
                multiple
                maxTagCount="responsive"
                size="large"
                className="inputCategories input-filter_nav"
                showCheckedStrategy={SHOW_CHILD}
                style={{ width: '100%', borderRadius: '2px' }}
                placeholder={
                  languageRedux === 1
                    ? 'Chọn danh mục nghề nghiệp'
                    : languageRedux === 2
                    ? 'Select a career category'
                    : languageRedux === 3 && '카테고리를 선택합니다'
                }
              />
            </div>
          </>
        )}
      </Skeleton>
    </div>
  );
};

export default ItemsProfile;
