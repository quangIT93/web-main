import React, { useEffect, useRef } from 'react';

import style from './style.module.scss';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { Cascader, Divider, Typography, Select, Skeleton } from 'antd';
import { BagFilterIcon, ArrowFilterIcon } from '#components/Icons';
import categoriesApi from 'api/categoriesApi';
import locationApi from 'api/locationApi';
import { setLocationApi } from 'store/reducer/locationReducer';
import SkeletonInput from 'antd/es/skeleton/Input';

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
    if (dataLocations?.length === 0 && dataCategories?.length === 0) {
      setActive(true);
    }
    if (dataLocations?.length !== 0 && dataCategories?.length !== 0)
      setActive(false);
  }, [dataLocations, dataCategories]);

  return (
    <div className={style.items_profile}>
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
            {active ? (
              <Skeleton.Input
                active={true}
                size={'small'}
                block={true}
                style={{ height: '40px' }}
              />
            ) : (
              <Cascader
                open={false}
                removeIcon={null}
                onClick={() => {
                  window.open('/profile', '_parent');
                }}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                suffixIcon={<ArrowFilterIcon width={14} height={10} />}
                options={
                  dataCategories
                    ? dataCategories.map((parentCategory: any) => ({
                        value: parentCategory.parent_category_id,
                        label: parentCategory.parent_category,

                        children: parentCategory.childs.map((child: any) => {
                          return {
                            value: child.id,
                            label: child.name,
                          };
                        }),
                      }))
                    : []
                }
                defaultValue={profileV3?.profileCategories.map(
                  (profile: any) => [profile?.parentCategory?.id, profile?.id],
                )}
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
            )}

            {active ? (
              <Skeleton.Input
                active={true}
                size={'small'}
                block={true}
                style={{ height: '40px' }}
              />
            ) : (
              <Cascader
                expandTrigger="hover"
                allowClear={false}
                open={false}
                removeIcon={null}
                onClick={() => {
                  window.open('/profile', '_parent');
                }}
                loadData={(selectedOptions) => console.log('selectedOptions')}
                autoFocus={true}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                suffixIcon={<ArrowFilterIcon width={14} height={10} />}
                options={
                  dataLocations.length !== 0
                    ? dataLocations?.map((dataLocation: any) => ({
                        value: dataLocation.province_id,
                        label: dataLocation.province_fullName,

                        children: dataLocation.districts.map(
                          (child: {
                            district_id: string;
                            district: string;
                          }) => {
                            return {
                              value: child.district_id,
                              label: child.district,
                            };
                          },
                        ),
                      }))
                    : []
                }
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
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsProfile;
