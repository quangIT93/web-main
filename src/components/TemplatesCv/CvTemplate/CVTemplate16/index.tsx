import React, { memo, useEffect, useState } from 'react';

import { Avatar } from '@mui/material';
import {
    Text,
    Font,
    Page,
    View,
    Image,
    Document,
    StyleSheet,
    Svg,
    Circle,
    Polygon,
    Ellipse,
} from '@react-pdf/renderer';
import Petrona from '../Fonts/Petrona-Bold.ttf';
import Fahkwang from '../Fonts/Fahkwang-medium.ttf';
import FahkwangBold from '../Fonts/Fahkwang-bold.ttf';
import AbhayaLibreExtraBold from '../Fonts/AbhayaLibreExtraBold.ttf';
import MontserratRegular from '../Fonts/MontserratRegular.ttf';
import MontserratBold from '../Fonts/MontserratBold.ttf';
import Archivo from '../Fonts/Archivo_Condensed-Regular.ttf';
import OpenSansBold from '../Fonts/OpenSans-Bold.ttf';
import OpenSansRegular from '../Fonts/OpenSans-Regular.ttf';
import OpenSansSemiBold from '../Fonts/OpenSans-SemiBold.ttf';
import MontserratSemiBold from '../Fonts/Montserrat-SemiBold.ttf';
import MontserratSemiBoldItalic from '../Fonts/Montserrat-SemiBoldItalic.ttf';

import { Provider, useSelector } from 'react-redux';
import { RootState, store } from 'store';
import profileApi from 'api/profileApi';

import Header from './sections/Header';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Profile from './sections/Profile';
import Language from './sections/Language';
import Activities from './sections/Activities';
import Hobies from './sections/Hobies';
import Skill from './sections/Skill';
import Reference from './sections/Reference';
import Award from './sections/Award';
import Contact from './sections/Contact';

interface CvTemplate {
    color: any;
    fontSize: number;
    profile: any;
    profileMore: any;
}
const CvTemplate16: React.FC<CvTemplate> = (props) => {
    const { color, fontSize, profile, profileMore } = props;
    const styles = StyleSheet.create({
        page: {
            padding: '30 0 30 30',
            position: 'relative',
            backgroundColor: '#fff',
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            zIndex: 0,
            //   paddingLeft: '14.279pt',
            //   paddingRight: '14.279pt',
            //   paddingTop: '68.34pt',
            //   gap: '48.781pt',
        },
        leftColumn: {
            flexDirection: 'column',
            width: '60%',
            paddingRight: 20,
            backgroundColor: 'transparent',
            gap: '20.495pt',
        },
        rightColumn: {
            flexDirection: 'column',
            width: '40%',
            // paddingTop: '1.094cm',
            // marginTop: '1cm',
            // paddingLeft: '24.809pt',
            backgroundColor: color === 1
                ? '#fffdf2'
                : color === 2
                    ? '#EBF5FB'
                    : color === 3
                        ? '#FEF9E7'
                        : color === 4
                            ? '#EAFAF1'
                            : '#F9EBEA',
            gap: '20.495pt',
            zIndex: 1,
        },
        pageNumber: {
            position: 'absolute',
            fontSize: fontSize - 8,
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
        lineFooter: {
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: color === 1
                ? '#ffcf00'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            zIndex: 2,
            // textAlign: 'center',
            // color: 'grey',
        },
        squareTop: {
            position: 'absolute',
            top: 230,
            right: 0,
            height: 100,
            width: '40%',
            backgroundColor: color === 1
                ? '#fffdf2'
                : color === 2
                    ? '#EBF5FB'
                    : color === 3
                        ? '#FEF9E7'
                        : color === 4
                            ? '#EAFAF1'
                            : '#F9EBEA',
            zIndex: 1,
        },
        squareBottom: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: 30,
            width: '40%',
            // paddingTop: '1.094cm',
            // marginTop: '1cm',
            // paddingLeft: '24.809pt',
            // backgroundColor: '#fffdf2',
            backgroundColor: color === 1
                ? '#fffdf2'
                : color === 2
                    ? '#EBF5FB'
                    : color === 3
                        ? '#FEF9E7'
                        : color === 4
                            ? '#EAFAF1'
                            : '#F9EBEA',
            gap: '20.495pt',
            zIndex: 1,
        },
        hijob: {
            position: 'absolute',
            fontSize: fontSize - 12,
            bottom: 0,
            // left: 0,
            right: 25,
            textAlign: 'center',
            color: 'grey',
        },
    });
    Font.register({
        family: 'Abhaya Libre ExtraBold',
        src: AbhayaLibreExtraBold,
        fontWeight: 'bold',
    });

    Font.register({
        family: 'Petrona Bold',
        src: Petrona,
        fontWeight: 'bold',
    });

    Font.register({
        family: 'Fahkwang Bold',
        src: FahkwangBold,
        fontWeight: 'bold',
    });

    Font.register({
        family: 'Fahkwang Medium',
        src: Fahkwang,
        fontWeight: 'bold',
    });

    Font.register({
        family: 'Montserrat SemiBold',
        src: MontserratSemiBold,
        fontWeight: 'bold',
    });
    Font.register({
        family: 'OpenSans-Regular',
        src: OpenSansRegular,
    });
    const Resume = (props: any) => (
        <Page {...props} style={styles.page}>
            <Header
                profile={profile}
                fontSize={fontSize}
                color={color}
                profileMore={profileMore}
            />
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    {profileMore?.profilesEducations &&
                        profileMore.profilesEducations?.length !== 0 ? (
                        <View>
                            <Education
                                profile={profile}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}

                    {profileMore?.profilesExperiences &&
                        profileMore.profilesExperiences?.length !== 0 ? (
                        <View>
                            <Experience
                                profile={profileMore}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}

                    {profileMore?.profileActivities &&
                        profileMore.profileActivities?.length !== 0 ? (
                        <View>
                            <Activities
                                profile={profileMore}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
                <View style={styles.rightColumn}>
                    <View>
                        <Profile
                            profile={profile}
                            fontSize={fontSize}
                            color={color}
                            profileMore={profileMore}
                        />
                    </View>
                    {profileMore?.profilesLanguages &&
                        profileMore.profilesLanguages?.length !== 0 ? (
                        <View>
                            <Language
                                profile={profileMore}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}
                    {profileMore?.profileHobbies &&
                        profileMore.profileHobbies?.length !== 0 ? (
                        <View>
                            <Hobies
                                profile={profileMore}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}
                    {profileMore?.profilesSkills &&
                        profileMore.profilesSkills?.length !== 0 ? (
                        <View>
                            <Skill
                                profile={profileMore}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}
                    {profileMore?.profilesReferences &&
                        profileMore.profilesReferences?.length !== 0 ? (
                        <View>
                            <Reference
                                profile={profileMore}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}

                    {profileMore?.profileAwards &&
                        profileMore.profileAwards?.length !== 0 ? (
                        <View>
                            <Award
                                profile={profileMore}
                                fontSize={fontSize}
                                color={color}
                                profileMore={profileMore}
                            />
                        </View>
                    ) : (
                        <></>
                    )}

                    <Contact
                        profile={profile}
                        fontSize={fontSize}
                        color={color}
                        profileMore={profileMore}
                    />
                </View>
            </View>
            <View fixed style={styles.lineFooter}></View>
            <View fixed style={styles.squareBottom}></View>
            <View fixed style={styles.squareTop}></View>
            <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                fixed
            />
            <Text
                style={styles.hijob}
                render={({ pageNumber, totalPages }) => `hijob.site`}
                fixed
            />
        </Page>
    );

    return (
        <Provider store={store}>
            <Document
                author="Luke Skywalker"
                keywords="awesome, resume, start wars"
                subject="The resume of Luke Skywalker"
                title="Resume"
                style={{
                    width: '100%',
                    height: '100%',
                    border: '1px solid #000000',
                }}
            >
                <Resume size="A4" />
                {/* <Resume orientation="landscape" size="A4" />
            <Resume size={[380, 1250]} /> */}
            </Document>
        </Provider>
    );
};

export default memo(CvTemplate16);
