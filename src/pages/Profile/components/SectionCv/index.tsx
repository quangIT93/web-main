import React, { useState } from "react";
import SkillItem from "../SkillItem/SkillItem";
import { Skeleton, Space, Switch } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalSkills from "#components/Profile/ModalSkills";
import { SectionActivitiesIcon, SectionAwardsIcon, SectionCoursesIcon, SectionDeleteIcon, SectionEditIcon, SectionHobbiesIcon, SectionInternshipsIcon, SectionLanguageIcon, SectionReferencesIcon } from "#components/Icons";
import LanguageItem from "../LanguageItem";
import ModalLanguages from "#components/Profile/ModalLanguages";
import { Box, Grid } from "@mui/material";

interface ISectionCv {
    loading: boolean;
    languageRedux: any;
    language: any
}

interface ISkills {
    skill: string;
    level: string;
}
interface Ilanguages {
    language: string;
    level: string;
}

const SectionCv: React.FC<ISectionCv> = (props) => {
    const { loading, languageRedux, language } = props;
    const [skillValues, setSkillValues] = useState<any[]>([]);
    const [languageValues, setLanguageValues] = useState<any[]>([]);
    const [sections, setSections] = useState<any[]>([]);
    const [showSkill, setShowSkill] = useState<boolean>(false);
    const [showLanguage, setShowLanguage] = useState<boolean>(false);
    const [openModalSkills, setOpenModalSkills] = useState(false);
    const [openModallanguages, setOpenModallanguages] = useState(false);

    const onChangeShowSkill = () => {
        setShowSkill(!showSkill);
    }
    const onChangeShowLanguage = () => {
        setShowLanguage(!showLanguage);
    }

    const handleCloseSection = (section: number) => {
        if (sections.includes(section)) {
            setSections(sections.filter((item: any) => {
                return item !== section
            }))
        }
    }

    const handleSection = (section: any) => {
        setSections((prev: any) => [
            ...prev,
            section
        ])

        // Create a text node:
        const section_div = document.getElementById(`section-${section}`);

        // Append the "li" node to the list:
        const sections = document.getElementById("sections")
        if (sections !== null && section_div !== null) {
            sections?.appendChild(section_div);
        }
    }
    return (
        <>
            <Skeleton className="skeleton-item" loading={loading} active>
                <div className="div-profile-info">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: '16px'
                        }}
                    >
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Kỹ năng" :
                                    "Skills"
                            }
                        </h3>
                        <div className="donot-show"
                            style={{
                                display: skillValues?.length !== 0 ? "flex" : "none"
                            }}
                        >
                            <p>
                                {
                                    languageRedux === 1 ?
                                        "không hiện kỹ năng" :
                                        "Don’t show experience skills"
                                }
                            </p>
                            <Switch onChange={onChangeShowSkill} />
                        </div>
                    </div>
                    <div className="skill-list">
                        {skillValues?.length !== 0 ? (
                            skillValues?.map((item: ISkills, index: number) => (
                                <div className="skill-item" key={index}>
                                    <SkillItem
                                        item={item}
                                        index={index}
                                        setSkillValues={setSkillValues}
                                        skillValues={skillValues}
                                    />
                                </div>
                            ))
                        ) :
                            (
                                <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                            )
                        }
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
            </Skeleton>

            <div id="sections" style={{ width: "100%" }}>

                {/* language section */}
                <Skeleton className="skeleton-item" loading={loading} active>
                    <div id="section-1" className="div-profile-info"
                        style={{
                            display: sections.includes(1) ? "block" : "none"
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: '16px'
                            }}
                        >
                            <div className="profile-info-title">
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Ngoại ngữ" :
                                            "Languages"
                                    }
                                </h3>
                                <div className="profile-info-title_actions">
                                    <div className="edit-icon">
                                        <SectionEditIcon />
                                    </div>
                                    <div className="delete-icon" onClick={() => handleCloseSection(1)}>
                                        <SectionDeleteIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="donot-show"
                                style={{
                                    display: languageValues?.length !== 0 ? "flex" : "none"
                                }}
                            >
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "không hiện ngoại ngữ" :
                                            "Don’t show experience languages"
                                    }
                                </p>
                                <Switch onChange={onChangeShowLanguage} />
                            </div>
                        </div>
                        <div className="language-list">
                            {languageValues?.length !== 0 ? (
                                languageValues?.map((item: Ilanguages, index: number) => (
                                    <div className="skill-item" key={index}>
                                        <LanguageItem
                                            item={item}
                                            index={index}
                                            setLanguageValues={setLanguageValues}
                                            languageValues={languageValues}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                                )
                            }
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
                                onClick={() => setOpenModallanguages(true)}
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
                    />
                </Skeleton>

                {/* Hobbies section */}
                <Skeleton className="skeleton-item" loading={loading} active>
                    <div id="section-2" className="div-profile-info"
                        style={{
                            display: sections.includes(2) ? "block" : "none"
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: '16px'
                            }}
                        >
                            <div className="profile-info-title">
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Sở thích" :
                                            "Hobbies"
                                    }
                                </h3>
                                <div className="profile-info-title_actions">
                                    <div className="edit-icon">
                                        <SectionEditIcon />
                                    </div>
                                    <div className="delete-icon" onClick={() => handleCloseSection(2)}>
                                        <SectionDeleteIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="donot-show"
                                style={{
                                    display: skillValues?.length !== 0 ? "flex" : "none"
                                }}
                            >
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "không hiện kỹ năng" :
                                            "Don’t show experience level"
                                    }
                                </p>
                                <Switch onChange={onChangeShowSkill} />
                            </div>
                        </div>
                        <div className="skill-list">
                            {skillValues?.length !== 0 ? (
                                skillValues?.map((item: ISkills, index: number) => (
                                    <div className="skill-item" key={index}>
                                        <SkillItem
                                            item={item}
                                            index={index}
                                            setSkillValues={setSkillValues}
                                            skillValues={skillValues}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                                )
                            }
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
                    {/* <ModalSkills
            openModalSkills={openModalSkills}
            setOpenModalSkills={setOpenModalSkills}
            setSkillValues={setSkillValues}
          /> */}
                </Skeleton>

                {/* References section */}
                <Skeleton className="skeleton-item" loading={loading} active>
                    <div id="section-3" className="div-profile-info"
                        style={{
                            display: sections.includes(3) ? "block" : "none"
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: '16px'
                            }}
                        >
                            <div className="profile-info-title">
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Người giới thiệu" :
                                            "References"
                                    }
                                </h3>
                                <div className="profile-info-title_actions">
                                    <div className="edit-icon">
                                        <SectionEditIcon />
                                    </div>
                                    <div className="delete-icon" onClick={() => handleCloseSection(3)}>
                                        <SectionDeleteIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="donot-show"
                                style={{
                                    display: skillValues?.length !== 0 ? "flex" : "none"
                                }}
                            >
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "không hiện kỹ năng" :
                                            "Don’t show experience level"
                                    }
                                </p>
                                <Switch onChange={onChangeShowSkill} />
                            </div>
                        </div>
                        <div className="skill-list">
                            {skillValues?.length !== 0 ? (
                                skillValues?.map((item: ISkills, index: number) => (
                                    <div className="skill-item" key={index}>
                                        <SkillItem
                                            item={item}
                                            index={index}
                                            setSkillValues={setSkillValues}
                                            skillValues={skillValues}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                                )
                            }
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
                    {/* <ModalSkills
            openModalSkills={openModalSkills}
            setOpenModalSkills={setOpenModalSkills}
            setSkillValues={setSkillValues}
          /> */}
                </Skeleton>

                {/* Internships section */}
                <Skeleton className="skeleton-item" loading={loading} active>
                    <div id="section-4" className="div-profile-info"
                        style={{
                            display: sections.includes(4) ? "block" : "none"
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: '16px'
                            }}
                        >
                            <div className="profile-info-title">
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Thực tập" :
                                            "Internships"
                                    }
                                </h3>
                                <div className="profile-info-title_actions">
                                    <div className="edit-icon">
                                        <SectionEditIcon />
                                    </div>
                                    <div className="delete-icon" onClick={() => handleCloseSection(4)}>
                                        <SectionDeleteIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="donot-show"
                                style={{
                                    display: skillValues?.length !== 0 ? "flex" : "none"
                                }}
                            >
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "không hiện kỹ năng" :
                                            "Don’t show experience level"
                                    }
                                </p>
                                <Switch onChange={onChangeShowSkill} />
                            </div>
                        </div>
                        <div className="skill-list">
                            {skillValues?.length !== 0 ? (
                                skillValues?.map((item: ISkills, index: number) => (
                                    <div className="skill-item" key={index}>
                                        <SkillItem
                                            item={item}
                                            index={index}
                                            setSkillValues={setSkillValues}
                                            skillValues={skillValues}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                                )
                            }
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
                    {/* <ModalSkills
            openModalSkills={openModalSkills}
            setOpenModalSkills={setOpenModalSkills}
            setSkillValues={setSkillValues}
          /> */}
                </Skeleton>

                {/* Activities section */}
                <Skeleton className="skeleton-item" loading={loading} active>
                    <div id="section-5" className="div-profile-info"
                        style={{
                            display: sections.includes(5) ? "block" : "none"
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: '16px'
                            }}
                        >
                            <div className="profile-info-title">
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Các hoạt động" :
                                            "Activities"
                                    }
                                </h3>
                                <div className="profile-info-title_actions">
                                    <div className="edit-icon">
                                        <SectionEditIcon />
                                    </div>
                                    <div className="delete-icon" onClick={() => handleCloseSection(5)}>
                                        <SectionDeleteIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="donot-show"
                                style={{
                                    display: skillValues?.length !== 0 ? "flex" : "none"
                                }}
                            >
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "không hiện kỹ năng" :
                                            "Don’t show experience level"
                                    }
                                </p>
                                <Switch onChange={onChangeShowSkill} />
                            </div>
                        </div>
                        <div className="skill-list">
                            {skillValues?.length !== 0 ? (
                                skillValues?.map((item: ISkills, index: number) => (
                                    <div className="skill-item" key={index}>
                                        <SkillItem
                                            item={item}
                                            index={index}
                                            setSkillValues={setSkillValues}
                                            skillValues={skillValues}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                                )
                            }
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
                    {/* <ModalSkills
            openModalSkills={openModalSkills}
            setOpenModalSkills={setOpenModalSkills}
            setSkillValues={setSkillValues}
          /> */}
                </Skeleton>

                {/* Courses section */}
                <Skeleton className="skeleton-item" loading={loading} active>
                    <div id="section-6" className="div-profile-info"
                        style={{
                            display: sections.includes(6) ? "block" : "none"
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: '16px'
                            }}
                        >
                            <div className="profile-info-title">
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Các khóa học" :
                                            "Courses"
                                    }
                                </h3>
                                <div className="profile-info-title_actions">
                                    <div className="edit-icon">
                                        <SectionEditIcon />
                                    </div>
                                    <div className="delete-icon" onClick={() => handleCloseSection(6)}>
                                        <SectionDeleteIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="donot-show"
                                style={{
                                    display: skillValues?.length !== 0 ? "flex" : "none"
                                }}
                            >
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "không hiện kỹ năng" :
                                            "Don’t show experience level"
                                    }
                                </p>
                                <Switch onChange={onChangeShowSkill} />
                            </div>
                        </div>
                        <div className="skill-list">
                            {skillValues?.length !== 0 ? (
                                skillValues?.map((item: ISkills, index: number) => (
                                    <div className="skill-item" key={index}>
                                        <SkillItem
                                            item={item}
                                            index={index}
                                            setSkillValues={setSkillValues}
                                            skillValues={skillValues}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                                )
                            }
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
                    {/* <ModalSkills
            openModalSkills={openModalSkills}
            setOpenModalSkills={setOpenModalSkills}
            setSkillValues={setSkillValues}
          /> */}
                </Skeleton>

                {/* Awards section */}
                <Skeleton className="skeleton-item" loading={loading} active>
                    <div id="section-7" className="div-profile-info"
                        style={{
                            display: sections.includes(7) ? "block" : "none"
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: '16px'
                            }}
                        >
                            <div className="profile-info-title">
                                <h3>
                                    {
                                        languageRedux === 1 ?
                                            "Các giải thưởng" :
                                            "Awards"
                                    }
                                </h3>
                                <div className="profile-info-title_actions">
                                    <div className="edit-icon">
                                        <SectionEditIcon />
                                    </div>
                                    <div className="delete-icon" onClick={() => handleCloseSection(7)}>
                                        <SectionDeleteIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="donot-show"
                                style={{
                                    display: skillValues?.length !== 0 ? "flex" : "none"
                                }}
                            >
                                <p>
                                    {
                                        languageRedux === 1 ?
                                            "không hiện kỹ năng" :
                                            "Don’t show experience level"
                                    }
                                </p>
                                <Switch onChange={onChangeShowSkill} />
                            </div>
                        </div>
                        <div className="skill-list">
                            {skillValues?.length !== 0 ? (
                                skillValues?.map((item: ISkills, index: number) => (
                                    <div className="skill-item" key={index}>
                                        <SkillItem
                                            item={item}
                                            index={index}
                                            setSkillValues={setSkillValues}
                                            skillValues={skillValues}
                                        />
                                    </div>
                                ))
                            ) :
                                (
                                    <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
                                )
                            }
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
                    {/* <ModalSkills
            openModalSkills={openModalSkills}
            setOpenModalSkills={setOpenModalSkills}
            setSkillValues={setSkillValues}
          /> */}
                </Skeleton>
            </div>
            <Skeleton className="skeleton-item" loading={loading} active>
                <div className="div-profile-info">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: '16px'
                        }}
                    >
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Thêm mục" :
                                    "Add section"
                            }
                        </h3>
                    </div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}
                            sx={{
                                justifyContent: { xs: 'space-between', sm: 'unset', md: 'unset' }
                            }}
                        >
                            <Grid item xs={2} sm={3} md={3}>
                                <div className={
                                    sections.includes(1) ?
                                        "section-item disable" : "section-item"
                                }
                                    onClick={() => handleSection(1)}>
                                    <SectionLanguageIcon />
                                    <h3>{languageRedux === 1 ? "Ngoại ngữ" : "Languages"}</h3>
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={3} md={3}>
                                <div className={
                                    sections.includes(2) ?
                                        "section-item disable" : "section-item"
                                }
                                    onClick={() => handleSection(2)}>
                                    <SectionHobbiesIcon />
                                    <h3>{languageRedux === 1 ? "Sở thích" : "Hobbies"}</h3>
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={3} md={3}>
                                <div className={
                                    sections.includes(3) ?
                                        "section-item disable" : "section-item"
                                }
                                    onClick={() => handleSection(3)}>
                                    <SectionReferencesIcon />
                                    <h3>{languageRedux === 1 ? "Người giới thiệu" : "References"}</h3>
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={3} md={3}>
                                <div className={
                                    sections.includes(4) ?
                                        "section-item disable" : "section-item"
                                }
                                    onClick={() => handleSection(4)}>
                                    <SectionInternshipsIcon />
                                    <h3>{languageRedux === 1 ? "Thực tập" : "Internships"}</h3>
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={3} md={3}>
                                <div className={
                                    sections.includes(5) ?
                                        "section-item disable" : "section-item"
                                }
                                    onClick={() => handleSection(5)}>
                                    <SectionActivitiesIcon />
                                    <h3>{languageRedux === 1 ? "Các hoạt động" : "Activities"}</h3>
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={3} md={3}>
                                <div className={
                                    sections.includes(6) ?
                                        "section-item disable" : "section-item"
                                }
                                    onClick={() => handleSection(6)}>
                                    <SectionCoursesIcon />
                                    <h3>{languageRedux === 1 ? "Các khóa học" : "Courses"}</h3>
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={3} md={3}>
                                <div className={
                                    sections.includes(7) ?
                                        "section-item disable" : "section-item"
                                }
                                    onClick={() => handleSection(7)}>
                                    <SectionAwardsIcon />
                                    <h3>{languageRedux === 1 ? "Các giải thưởng" : "Awards"}</h3>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Skeleton>
        </>
    )
}

export default SectionCv;