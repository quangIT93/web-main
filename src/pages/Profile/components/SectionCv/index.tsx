import React, { useState } from 'react';

import SkillItem from '../SkillItem/SkillItem';
import { Skeleton, Space, Switch } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ModalSkills from '#components/Profile/ModalSkills';
import ModalEditSkills from '#components/Profile/ModalEditSkills';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../../store/reducer';

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
import ReferenceItem from '../ReferenceItem';
import ModalInternship from '#components/Profile/ModalInternship';
import InternshipItem from '../InternshipItem';
import ModalActivity from '#components/Profile/ModalActivity';
import ModalCourse from '#components/Profile/ModalCourse';
import CourseItem from '../CourseItem';
import ModalAward from '#components/Profile/ModalAward';
import AwardItem from '../AwardItem';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
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
  company: string;
}
interface IInternship {
  title: string;
  employer: string;
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
  title: string;
  company: string;
  description: string;
}

const SectionCv: React.FC<ISectionCv> = (props) => {
  const { loading, languageRedux, language } = props;
  const [skillValues, setSkillValues] = useState<any[]>([]);
  const [languageValues, setLanguageValues] = useState<any[]>([]);
  const [hobbieValues, setHobbieValues] = useState<any>('');
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
  const [openModalInternship, setOpenModalInternship] = useState(false);
  const [openModalActivity, setOpenModalActivity] = useState(false);
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [openModalAward, setOpenModalAward] = useState(false);

  const dispatch = useDispatch();

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  console.log('profileV3', profileV3);

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

  const handleCloseSection = async (section: number) => {
    if (sections.includes(section)) {
      setSections(
        sections.filter((item: any) => {
          return item !== section;
        }),
      );

      if (section === 1) {
        const item =
          profileV3 && profileV3.profilesLanguages.map((item: any) => item.id);

        const result = await apiCv.deleteProfileLanguage(item);
        if (result) {
          const resultProfile = await profileApi.getProfileV3(
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (resultProfile) {
            dispatch(setProfileV3(resultProfile));
          }
        }

        // profileV3.profilesLanguages.map(
        //   (item: {
        //     id: number;
        //     languageName: string;
        //     dataLevel: {
        //       id: number;
        //       data: string;
        //     };
        //   }) => {
        //   },
        // );
      }
    }
    if (section === 0) {
      const item =
        profileV3 && profileV3.profilesSkills.map((item: any) => item.id);

      const result = await apiCv.deleteProfileSkill(item);
      if (result) {
        const resultProfile = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (resultProfile) {
          dispatch(setProfileV3(resultProfile));
        }
      }
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
                <div
                  className="delete-icon"
                  onClick={() => handleCloseSection(0)}
                >
                  <SectionDeleteIcon width={16} height={16} />
                </div>
              </div>
            </div>
          </div>
          <div className="skill-list">
            {profileV3 && profileV3?.profilesSkills?.length !== 0 ? (
              profileV3?.profilesSkills?.map((item: ISkills, index: number) => (
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
      </Skeleton>

      <div id="sections" style={{ width: '100%' }}>
        {/* language section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-1"
            className="div-profile-info"
            style={{
              display: sections.includes(1) ? 'block' : 'none',
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
              {profileV3 && profileV3?.profilesLanguages?.length !== 0 ? (
                profileV3?.profilesLanguages?.map(
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
        </Skeleton>

        {/* Hobbies section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-2"
            className="div-profile-info"
            style={{
              display: sections.includes(2) ? 'block' : 'none',
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
                // onPressEnter={(e: any) => handleKeyPress(e)}
                onChange={handleOnChangeHobbie}
                placeholder={
                  languageRedux === 1
                    ? 'VD: Âm nhạc, Hội họa, Khiêu vũ'
                    : 'Ex: Music, Painting, Dancing'
                }
                autoSize={{ minRows: 6, maxRows: 9 }}
              />
            </div>
          </div>
        </Skeleton>

        {/* References section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-3"
            className="div-profile-info"
            style={{
              display: sections.includes(3) ? 'block' : 'none',
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
              {referenceValues && referenceValues?.length !== 0 ? (
                referenceValues?.map((item: IReferences, index: number) => (
                  <div className="skill-item" key={index}>
                    <ReferenceItem
                      item={item}
                      index={index}
                      setReferenceValues={setReferenceValues}
                      referenceValues={referenceValues}
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
        </Skeleton>

        {/* Internships section */}
        <Skeleton className="skeleton-item" loading={loading} active>
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
                  {/* <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> */}
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
        </Skeleton>

        {/* Activities section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-5"
            className="div-profile-info"
            style={{
              display: sections.includes(5) ? 'block' : 'none',
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
              {activityValues && activityValues?.length !== 0 ? (
                activityValues?.map((item: IInternship, index: number) => (
                  <div className="skill-item" key={index}>
                    <InternshipItem
                      typeItem={0}
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
        </Skeleton>

        {/* Courses section */}
        <Skeleton className="skeleton-item" loading={loading} active>
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
                  {/* <div className="edit-icon">
                    <SectionEditIcon width={16} height={16} />
                  </div> */}
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
        </Skeleton>

        {/* Awards section */}
        <Skeleton className="skeleton-item" loading={loading} active>
          <div
            id="section-7"
            className="div-profile-info"
            style={{
              display: sections.includes(7) ? 'block' : 'none',
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
              {awardValues && awardValues?.length !== 0 ? (
                awardValues?.map((item: IAward, index: number) => (
                  <div className="skill-item" key={index}>
                    <AwardItem
                      item={item}
                      index={index}
                      setAwardValues={setAwardValues}
                      awardValues={awardValues}
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
              <Grid item xs={2} sm={3} md={3}>
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
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
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
              <Grid item xs={2} sm={3} md={3}>
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
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <div
                  className={
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
