import React, { useState } from 'react';

import SkillItem from '../SkillItem/SkillItem';
import { Skeleton, Space, Switch, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ModalSkills from '#components/Profile/ModalSkills';
import ModalEditSkills from '#components/Profile/ModalEditSkills';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../../store/reducer';

import { IconSaveProfile } from '#components/Icons';

// api
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';

import {
  SectionActivitiesIcon,
  SectionAwardsIcon,
  SectionCoursesIcon,
  SectionDeleteIcon,
  SectionEditIcon,
  SectionHobbiesIcon,
  SectionInternshipsIcon,
  SectionLanguageIcon,
  SectionReferencesIcon,
} from '#components/Icons';
import LanguageItem from '../LanguageItem';
import ModalLanguages from '#components/Profile/ModalLanguages';
import ModalEditLanguages from '#components/Profile/ModalEditLanguages';
import { Box, Grid } from '@mui/material';
import { Input } from 'antd';
import ModalReference from '#components/Profile/ModalReference';
import ModalEditReference from '#components/Profile/ModalEditReference';
import ReferenceItem from '../ReferenceItem';
import ModalInternship from '#components/Profile/ModalInternship';
import InternshipItem from '../InternshipItem';
import ModalActivity from '#components/Profile/ModalActivity';
import ModalCourse from '#components/Profile/ModalCourse';
import CourseItem from '../CourseItem';
import ModalAward from '#components/Profile/ModalAward';
import AwardItem from '../AwardItem';
import ModalDeleteActivities from '#components/Profile/ModalDeleteActivities';
import ModalDeleteAwards from '#components/Profile/ModalDeleteAwards';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

import {
  setAlertSuccess,
  setAlert,
  setAlertLackInfo,
} from 'store/reducer/profileReducer/alertProfileReducer';
import ModalDeleteSkill from '#components/Profile/ModalDeleteSkill';
import ModalDeleteLanguage from '#components/Profile/ModalDeleteLanguage';
import ModalDeleteHobbies from '#components/Profile/ModalDeleteHobbies';
import ModalDeleteReferences from '#components/Profile/ModalDeleteReferences';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';

const { TextArea } = Input;

interface ISectionCv {
  loading: boolean;
  languageRedux: any;
  language: any;
}

interface ISkills {
  dataLevel: {
    data: string;
    id: number;
  };
  id: number;
  skillName: string;
}
interface Ilanguages {
  dataLevel: {
    data: string;
    id: number;
  };
  id: number;
  languageName: string;
}
interface IReferences {
  fullName: string;
  phone: string;
  id: number;
  email: string;
  description: string;
}
interface IInternship {
  id: any;
  title: string;
  organization: string;
  startDate: any;
  endDate: any;
  description: string;
}
interface ICourse {
  title: string;
  startDate: any;
  endDate: any;
}
interface IAward {
  id: any;
  title: string;
  company: string;
  description: string;
}

const SectionCv: React.FC<ISectionCv> = (props) => {
  // const profileMoreV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const profileMoreV3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );
  const { loading, languageRedux, language } = props;
  const [skillValues, setSkillValues] = useState<any[]>([]);
  const [languageValues, setLanguageValues] = useState<any[]>([]);
  const [hobbieValues, setHobbieValues] = useState<any>(
    profileMoreV3?.profileHobbies?.description,
  );
  const [referenceValues, setReferenceValues] = useState<any[]>([]);
  const [internshipValues, setInternshipValues] = useState<any[]>([]);
  const [activityValues, setActivityValues] = useState<any[]>([]);
  const [courseValues, setCourseValues] = useState<any[]>([]);
  const [awardValues, setAwardValues] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [showSkill, setShowSkill] = useState<boolean>(false);
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [openModalSkills, setOpenModalSkills] = useState(false);
  const [openModalEditSkills, setOpenModalEditSkills] = useState<{
    open: boolean;
    id: null | number;
    name: string;
    idLevel: number | null;
  }>({
    open: false,
    id: null,
    name: '',
    idLevel: null,
  });
  const [openModallanguages, setOpenModallanguages] = useState(false);
  const [openModalEditlanguages, setOpenModalEditlanguages] = useState<{
    open: boolean;
    id: null | number;
    name: string;
    idLevel: number | null;
  }>({
    open: false,
    id: null,
    name: '',
    idLevel: null,
  });
  const [openModalReference, setOpenModalReference] = useState(false);
  const [openModalEditReference, setOpenModalEditReference] = useState<{
    open: boolean;
    name: string;
    email: string;
    phone: string;
    id: number | null;
    description: string;
  }>({
    open: false,
    name: '',
    email: '',
    phone: '',
    id: null,
    description: '',
  });
  const [openModalInternship, setOpenModalInternship] = useState(false);
  const [openModalActivity, setOpenModalActivity] = useState(false);
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [openModalAward, setOpenModalAward] = useState(false);

  const [openModalDeleteActivities, setOpenModalDeleteActivities] =
    useState(false);
  const [openModalDeleteAwards, setOpenModalDeleteAwards] = useState(false);
  const [openModalDeleteSkill, setOpenModalDeleteSkill] = useState(false);
  const [openModalDeleteLanguage, setOpenModalDeleteLanguage] = useState(false);
  const [openModalDeleteHobbies, setOpenModalDeleteHobbies] = useState(false);
  const [openModalDeleteReferences, setOpenModalDeleteReferences] =
    useState(false);

  const dispatch = useDispatch();
  const onChangeShowSkill = () => {
    setShowSkill(!showSkill);
  };
  const onChangeShowLanguage = () => {
    setShowLanguage(!showLanguage);
  };

  const handleOnChangeHobbie = (event: any) => {
    setHobbieValues(event.target.value);
  };

  const handleKeyPress = (e: any) => {
    // e.preventDefault();
    // if (!e.shiftKey) {
    //   if (e.key === 'Enter') {
    //     e.preventDefault();
    //     // handleCommentCommunity();
    //   }
    // }
    // }
  };

  React.useEffect(() => {
    setHobbieValues(profileMoreV3?.profileHobbies?.description);
  }, [profileMoreV3]);

  const handleCloseSection = async (section: number) => {
    if (sections.includes(section)) {
      setSections(
        sections.filter((item: any) => {
          return item !== section;
        }),
      );
    }

    switch (section) {
      case 0:
        if (profileMoreV3 && profileMoreV3?.profilesSkills?.length > 0) {
          setOpenModalDeleteSkill(true);
        } else {
          setOpenModalDeleteSkill(false);
        }

        break;
      case 1:
        if (profileMoreV3 && profileMoreV3?.profilesLanguages?.length > 0) {
          setOpenModalDeleteLanguage(true);
        } else {
          setOpenModalDeleteLanguage(false);
        }
        break;

      case 2:
        if (profileMoreV3 && profileMoreV3?.profileHobbies !== null) {
          setOpenModalDeleteHobbies(true);
        } else {
          setOpenModalDeleteHobbies(false);
        }
        break;

      case 3:
        if (profileMoreV3 && profileMoreV3?.profilesReferences?.length > 0) {
          setOpenModalDeleteReferences(true);
        } else {
          setOpenModalDeleteReferences(false);
        }
        // const item3 =
        //   profileMoreV3 &&
        //   profileMoreV3?.profilesReferences?.map((item: any) => item.id);

        // const result3 = await apiCv.deleteProfileReference(item3);
        // if (result3) {
        //   const resultProfile = await profileApi.getProfileV3(
        //     languageRedux === 1 ? 'vi' : 'en',
        //   );
        //   if (resultProfile) {
        //     dispatch(setProfileV3(resultProfile));
        //     dispatch(setAlert(true));
        //   }
        // }
        break;

      case 5:
        if (profileMoreV3 && profileMoreV3?.profileActivities?.length > 0) {
          setOpenModalDeleteActivities(true);
        } else {
          setOpenModalDeleteActivities(false);
        }

        break;
      case 7:
        if (profileMoreV3 && profileMoreV3?.profileAwards?.length > 0) {
          setOpenModalDeleteAwards(true);
        } else {
          setOpenModalDeleteAwards(false);
        }

        break;

      default:
        break;
    }
  };

  const handleSection = (section: any) => {
    setSections((prev: any) => [...prev, section]);

    // Create a text node:
    const section_div = document.getElementById(`section-${section}`);

    // Append the "li" node to the list:
    const sections = document.getElementById('sections');
    if (sections !== null && section_div !== null) {
      sections?.appendChild(section_div);
    }
  };

  const handleSaveHobbies = async () => {
    const profile_hobbies_hobbie_name = document.getElementById(
      'profile_hobbies_hobbie_name',
    ) as HTMLElement;
    try {
      if (hobbieValues?.trim() === '' || hobbieValues?.trim() === undefined) {
        // dispatch(setAlertLackInfo(true));
        message.error(
          languageRedux === 1
            ? 'Sở thích không được bỏ trống'
            : 'Hobbies cannot be empty',
        );
        profile_hobbies_hobbie_name.focus();
        return;
      }
      if (hobbieValues?.trim().length > 1000) {
        // dispatch(setAlertLackInfo(true));
        message.error(
          languageRedux === 1
            ? 'Sở thích không được vượt quá 1000 ký tự'
            : 'Hobbies cannot exceed 1000 characters',
        );
        profile_hobbies_hobbie_name.focus();
        return;
      }
      const result = await apiCv.postProfileHobbies(hobbieValues);
      if (result) {
        const resultProfileV3 = await profileApi.getProfileInformationMoreV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (resultProfileV3) {
          dispatch(setProfileMeInformationMoreV3(resultProfileV3));
          dispatch(setAlertSuccess(true));
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div className="section-title">
            {/* <h3>{languageRedux === 1 ? 'Kỹ năng' : 'Skills'}</h3> */}
            <div
              className="donot-show"
              style={{
                display: skillValues?.length !== 0 ? 'flex' : 'none',
              }}
            >
              <p>
                {languageRedux === 1
                  ? 'Không hiện kỹ năng'
                  : 'Don’t show experience skills'}
              </p>
              <Switch onChange={onChangeShowSkill} />
            </div>
            <div className="profile-info-title">
              <h3>{languageRedux === 1 ? 'Kỹ năng' : 'Skills'}</h3>
              <div className="profile-info-title_actions">
                {profileMoreV3?.profilesSkills?.length !== 0 ? (
                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(0)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="skill-list">
            {profileMoreV3 && profileMoreV3?.profilesSkills?.length !== 0 ? (
              profileMoreV3?.profilesSkills?.map(
                (item: ISkills, index: number) => (
                  <div className="skill-item" key={index}>
                    <SkillItem
                      item={item}
                      index={index}
                      setSkillValues={setSkillValues}
                      skillValues={skillValues}
                      openModalEditSkills={openModalEditSkills}
                      setOpenModalEditSkills={setOpenModalEditSkills}
                    />
                  </div>
                ),
              )
            ) : (
              <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Space
              style={{ alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setOpenModalSkills(true)}
            >
              <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

              <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                {language?.add}
              </p>
            </Space>
          </div>
        </div>
        <ModalSkills
          openModalSkills={openModalSkills}
          setOpenModalSkills={setOpenModalSkills}
          setSkillValues={setSkillValues}
        />

        <ModalEditSkills
          openModalEditSkills={openModalEditSkills}
          setOpenModalEditSkills={setOpenModalEditSkills}
          setSkillValues={setSkillValues}
        />

        <ModalDeleteSkill
          openModalDeleteSkill={openModalDeleteSkill}
          setOpenModalDeleteSkill={setOpenModalDeleteSkill}
          skillId={profileMoreV3?.profilesSkills?.map(
            (item: any, index: number) => {
              return item?.id;
            },
          )}
          skillValue={null}
          deleteAll={true}
        />
      </Skeleton>

      <div id="sections" style={{ width: '100%' }}>
        {/* language section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-1"
            className="div-profile-info"
            style={{
              display:
                profileMoreV3?.profilesLanguages?.length !== 0 ||
                sections.includes(1)
                  ? 'block'
                  : 'none',
            }}
          >
            <div className="section-title">
              <div className="profile-info-title">
                <h3>{languageRedux === 1 ? 'Ngoại ngữ' : 'Languages'}</h3>
                <div className="profile-info-title_actions">
                  {/* <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> */}
                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(1)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                </div>
              </div>
              <div
                className="donot-show"
                style={{
                  display: languageValues?.length !== 0 ? 'flex' : 'none',
                }}
              >
                <p>
                  {languageRedux === 1
                    ? 'Không hiện ngoại ngữ'
                    : 'Don’t show experience languages'}
                </p>
                <Switch onChange={onChangeShowLanguage} />
              </div>
            </div>
            <div className="language-list">
              {profileMoreV3 &&
              profileMoreV3?.profilesLanguages?.length !== 0 ? (
                profileMoreV3?.profilesLanguages?.map(
                  (item: Ilanguages, index: number) => (
                    <div className="skill-item" key={index}>
                      <LanguageItem
                        item={item}
                        index={index}
                        setLanguageValues={setLanguageValues}
                        languageValues={languageValues}
                        setOpenModallanguages={setOpenModallanguages}
                        openModallanguages={openModallanguages}
                        setOpenModalEditlanguages={setOpenModalEditlanguages}
                        openModalEditlanguages={openModalEditlanguages}
                      />
                    </div>
                  ),
                )
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => {
                  setOpenModallanguages(true);
                }}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.add}
                </p>
              </Space>
            </div>
          </div>
          <ModalLanguages
            openModallanguages={openModallanguages}
            setOpenModallanguages={setOpenModallanguages}
            setLanguageValues={setLanguageValues}
            type="create"
          />

          <ModalEditLanguages
            openModalEditlanguages={openModalEditlanguages}
            setOpenModalEditlanguages={setOpenModalEditlanguages}
            setLanguageValues={setLanguageValues}
            type="edit"
          />

          <ModalDeleteLanguage
            openModalDeleteLanguage={openModalDeleteLanguage}
            setOpenModalDeleteLanguage={setOpenModalDeleteLanguage}
            languageId={profileMoreV3?.profilesLanguages?.map(
              (item: any, index: number) => {
                return item?.id;
              },
            )}
            languageValue={null}
            deleteAll={true}
          />
        </Skeleton>

        {/* Hobbies section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-2"
            className="div-profile-info"
            // style={{
            //   display: sections.includes(2) ? 'block' : 'none',
            // }}
            style={{
              display:
                profileMoreV3?.profileHobbies !== null || sections.includes(2)
                  ? 'block'
                  : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div className="profile-info-title">
                <h3>{languageRedux === 1 ? 'Sở thích' : 'Hobbies'}</h3>
                <div className="profile-info-title_actions">
                  {/* <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> */}
                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(2)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                </div>
              </div>
              <div
                className="profile-save"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgb(13, 153, 255)',
                  cursor: 'pointer',
                }}
                onClick={handleSaveHobbies}
              >
                {languageRedux === 1 ? 'Lưu' : 'Save'}
                <IconSaveProfile />
              </div>
            </div>
            <div className="hobbie-input">
              <p>
                {languageRedux === 1
                  ? 'Sở thích của bạn là gì?'
                  : 'What do you like?'}
              </p>
              <TextArea
                value={hobbieValues}
                onKeyDown={(e: any) => handleKeyPress(e)}
                // defaultValue={
                //   profileMoreV3?.profileHobbies &&
                //   profileMoreV3?.profileHobbies?.description
                // }
                // onPressEnter={(e: any) => handleKeyPress(e)}
                id="profile_hobbies_hobbie_name"
                onChange={handleOnChangeHobbie}
                placeholder={
                  languageRedux === 1
                    ? 'VD: Âm nhạc, Hội họa, Khiêu vũ'
                    : 'Ex: Music, Painting, Dancing'
                }
                autoSize={{ minRows: 6, maxRows: 9 }}
                onError={() => {
                  dispatch(setAlertLackInfo(true));
                }}
              />
              <div className="wrap-noti_input">
                {hobbieValues && hobbieValues.length > 1000 ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Tên kỹ năng không được vượt quá 1000 ký tự'
                      : 'Skill names cannot exceed 1000 characters'}
                  </span>
                ) : !hobbieValues ? (
                  <span className="helper-text">
                    {languageRedux === 1
                      ? 'Tên kỹ năng không được bỏ trống'
                      : 'Skill names cannot be empty'}
                  </span>
                ) : (
                  <></>
                )}
                <span className="number-text">{`${
                  hobbieValues ? hobbieValues.length : '0'
                }/1000`}</span>
              </div>
            </div>
          </div>
          <ModalDeleteHobbies
            openModalDeleteHobbies={openModalDeleteHobbies}
            setOpenModalDeleteHobbies={setOpenModalDeleteHobbies}
          />
        </Skeleton>

        {/* References section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-3"
            className="div-profile-info"
            style={{
              display:
                profileMoreV3?.profilesReferences?.length !== 0 ||
                sections.includes(3)
                  ? 'block'
                  : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div className="profile-info-title">
                <h3>
                  {languageRedux === 1 ? 'Người giới thiệu' : 'References'}
                </h3>
                <div className="profile-info-title_actions">
                  {/* <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> */}

                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(3)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="skill-list">
              {profileMoreV3 &&
              profileMoreV3?.profilesReferences?.length !== 0 ? (
                profileMoreV3?.profilesReferences?.map(
                  (item: IReferences, index: number) => (
                    <div className="skill-item" key={index}>
                      <ReferenceItem
                        item={item}
                        index={index}
                        setReferenceValues={setReferenceValues}
                        referenceValues={referenceValues}
                        openModalReference={openModalReference}
                        setOpenModalReference={setOpenModalReference}
                        openModalEditReference={openModalEditReference}
                        setOpenModalEditReference={setOpenModalEditReference}
                      />
                    </div>
                  ),
                )
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenModalReference(true)}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.add}
                </p>
              </Space>
            </div>
          </div>
          <ModalReference
            openModalReference={openModalReference}
            setOpenModalReference={setOpenModalReference}
            setReferenceValues={setReferenceValues}
          />

          <ModalEditReference
            openModalEditReference={openModalEditReference}
            setOpenModalEditReference={setOpenModalEditReference}
            setReferenceValues={setReferenceValues}
          />

          <ModalDeleteReferences
            openModalDeleteReferences={openModalDeleteReferences}
            setOpenModalDeleteReferences={setOpenModalDeleteReferences}
            referenceId={profileMoreV3?.profilesReferences?.map(
              (item: any, index: number) => {
                return item?.id;
              },
            )}
            deleteAll={true}
          />
        </Skeleton>

        {/* Internships section */}
        {/* <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-4"
            className="div-profile-info"
            style={{
              display: sections.includes(4) ? 'block' : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div className="profile-info-title">
                <h3>{languageRedux === 1 ? 'Thực tập' : 'Internships'}</h3>
                <div className="profile-info-title_actions">
                   <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> 
                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(4)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="internship-list">
              {internshipValues && internshipValues?.length !== 0 ? (
                internshipValues?.map((item: IInternship, index: number) => (
                  <div className="skill-item" key={index}>
                    <InternshipItem
                      typeItem={1}
                      index={index}
                      item={item}
                      setInternshipValues={setInternshipValues}
                      internshipValues={internshipValues}
                      activityValues={activityValues}
                      setActivityValues={setActivityValues}
                    />
                  </div>
                ))
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenModalInternship(true)}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.add}
                </p>
              </Space>
            </div>
          </div>
          <ModalInternship
            openModalInternship={openModalInternship}
            setOpenModalInternship={setOpenModalInternship}
            setInternshipValues={setInternshipValues}
          />
        </Skeleton>  */}

        {/* Activities section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-5"
            className="div-profile-info"
            style={{
              display:
                profileMoreV3?.profileActivities?.length !== 0 ||
                sections.includes(5)
                  ? 'block'
                  : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div className="profile-info-title">
                <h3>{languageRedux === 1 ? 'Các hoạt động' : 'Activities'}</h3>
                <div className="profile-info-title_actions">
                  {/* <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> */}
                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(5)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="internship-list">
              {profileMoreV3 &&
              profileMoreV3?.profileActivities?.length !== 0 ? (
                profileMoreV3?.profileActivities?.map(
                  (item: IInternship, index: number) => (
                    <InternshipItem
                      typeItem={0}
                      index={index}
                      item={item}
                      setInternshipValues={setInternshipValues}
                      internshipValues={internshipValues}
                      activityValue={item}
                      setActivityValues={setActivityValues}
                    />
                    // <div className="skill-item" key={index}>
                    // </div>
                  ),
                )
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenModalActivity(true)}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.add}
                </p>
              </Space>
            </div>
          </div>
          <ModalActivity
            openModalActivity={openModalActivity}
            setOpenModalActivity={setOpenModalActivity}
            setActivityValues={setActivityValues}
          />
          <ModalDeleteActivities
            openModalDeleteActivities={openModalDeleteActivities}
            setOpenModalDeleteActivities={setOpenModalDeleteActivities}
            activitiesId={profileMoreV3?.profileActivities?.map(
              (item: any, index: number) => {
                return item?.id;
              },
            )}
            activityValue={null}
            deleteAll={true}
          />
        </Skeleton>

        {/* Courses section */}
        {/* <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-6"
            className="div-profile-info"
            style={{
              display: sections.includes(6) ? 'block' : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div className="profile-info-title">
                <h3>{languageRedux === 1 ? 'Các khóa học' : 'Courses'}</h3>
                <div className="profile-info-title_actions">
                  <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> 
                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(6)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="skill-list">
              {courseValues && courseValues?.length !== 0 ? (
                courseValues?.map((item: ICourse, index: number) => (
                  <div className="skill-item" key={index}>
                    <CourseItem
                      item={item}
                      index={index}
                      setCourseValues={setCourseValues}
                      courseValues={courseValues}
                    />
                  </div>
                ))
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenModalCourse(true)}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.add}
                </p>
              </Space>
            </div>
          </div>
          <ModalCourse
            openModalCourse={openModalCourse}
            setOpenModalCourse={setOpenModalCourse}
            setCourseValues={setCourseValues}
          />
        </Skeleton> */}

        {/* Awards section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-7"
            className="div-profile-info"
            style={{
              display:
                profileMoreV3?.profileAwards?.length !== 0 ||
                sections.includes(7)
                  ? 'block'
                  : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div className="profile-info-title">
                <h3>{languageRedux === 1 ? 'Các giải thưởng' : 'Awards'}</h3>
                <div className="profile-info-title_actions">
                  {/* <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> */}
                  <div
                    className="delete-icon"
                    onClick={() => handleCloseSection(7)}
                  >
                    <SectionDeleteIcon width={16} height={16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="internship-list">
              {profileMoreV3 && profileMoreV3?.profileAwards?.length !== 0 ? (
                profileMoreV3?.profileAwards?.map(
                  (item: IAward, index: number) => (
                    <div className="skill-item" key={index}>
                      <AwardItem
                        item={item}
                        index={index}
                        setAwardValues={setAwardValues}
                        awardValue={item}
                      />
                    </div>
                  ),
                )
              ) : (
                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Space
                style={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenModalAward(true)}
              >
                <PlusCircleOutlined size={10} style={{ color: '#0D99FF' }} />

                <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                  {language?.add}
                </p>
              </Space>
            </div>
          </div>
          <ModalAward
            openModalAward={openModalAward}
            setOpenModalAward={setOpenModalAward}
            setAwardValues={setAwardValues}
          />
          <ModalDeleteAwards
            openModalDeleteAwards={openModalDeleteAwards}
            setOpenModalDeleteAwards={setOpenModalDeleteAwards}
            awardsId={profileMoreV3?.profileAwards?.map(
              (item: any, index: number) => {
                return item?.id;
              },
            )}
            awardValue={null}
            deleteAll={true}
          />
        </Skeleton>
      </div>
      <Skeleton className="skeleton-item" loading={loading} active>
        <div className="div-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <h3>{languageRedux === 1 ? 'Thêm mục' : 'Add section'}</h3>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={1}
              sx={{
                justifyContent: {
                  xs: 'space-between',
                  sm: 'unset',
                  md: 'unset',
                },
              }}
            >
              <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
                    profileMoreV3?.profilesLanguages?.length !== 0 ||
                    sections.includes(1)
                      ? 'section-item disable'
                      : 'section-item'
                  }
                  onClick={() => handleSection(1)}
                >
                  <SectionLanguageIcon />
                  <h3>{languageRedux === 1 ? 'Ngoại ngữ' : 'Languages'}</h3>
                </div>
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
                    profileMoreV3?.profileHobbies !== null ||
                    sections.includes(2)
                      ? 'section-item disable'
                      : 'section-item'
                  }
                  onClick={() => handleSection(2)}
                >
                  <SectionHobbiesIcon />
                  <h3>{languageRedux === 1 ? 'Sở thích' : 'Hobbies'}</h3>
                </div>
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
                    profileMoreV3?.profilesReferences?.length !== 0 ||
                    sections.includes(3)
                      ? 'section-item disable'
                      : 'section-item'
                  }
                  onClick={() => handleSection(3)}
                >
                  <SectionReferencesIcon />
                  <h3>
                    {languageRedux === 1 ? 'Người giới thiệu' : 'References'}
                  </h3>
                </div>
              </Grid>
              {/* <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
                    sections.includes(4)
                      ? 'section-item disable'
                      : 'section-item'
                  }
                  onClick={() => handleSection(4)}
                >
                  <SectionInternshipsIcon />
                  <h3>{languageRedux === 1 ? 'Thực tập' : 'Internships'}</h3>
                </div>
              </Grid> */}
              <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
                    profileMoreV3?.profileActivities?.length !== 0 ||
                    sections.includes(5)
                      ? 'section-item disable'
                      : 'section-item'
                  }
                  onClick={() => handleSection(5)}
                >
                  <SectionActivitiesIcon />
                  <h3>
                    {languageRedux === 1 ? 'Các hoạt động' : 'Activities'}
                  </h3>
                </div>
              </Grid>
              {/* <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
                    sections.includes(6)
                      ? 'section-item disable'
                      : 'section-item'
                  }
                  onClick={() => handleSection(6)}
                >
                  <SectionCoursesIcon />
                  <h3>{languageRedux === 1 ? 'Các khóa học' : 'Courses'}</h3>
                </div>
              </Grid> */}
              <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
                    profileMoreV3?.profileAwards?.length !== 0 ||
                    sections.includes(7)
                      ? 'section-item disable'
                      : 'section-item'
                  }
                  onClick={() => handleSection(7)}
                >
                  <SectionAwardsIcon />
                  <h3>{languageRedux === 1 ? 'Các giải thưởng' : 'Awards'}</h3>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Skeleton>
    </>
  );
};

export default SectionCv;
