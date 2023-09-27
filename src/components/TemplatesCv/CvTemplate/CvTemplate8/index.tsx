import React, { memo, useEffect, useState } from "react";

import { Avatar } from "@mui/material";
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
} from '@react-pdf/renderer';

import Header from "./sections/Header";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Experience from "./sections/Experience";

import AbhayaLibreExtraBold from '../Fonts/AbhayaLibreExtraBold.ttf';
import MontserratRegular from '../Fonts/MontserratRegular.ttf';
import MontserratBold from '../Fonts/MontserratBold.ttf';
import Archivo from '../Fonts/Archivo_Condensed-Regular.ttf';
import OpenSansBold from '../Fonts/OpenSans-Bold.ttf';
import OpenSansRegular from '../Fonts/OpenSans-Regular.ttf';
import OpenSansSemiBold from '../Fonts/OpenSans-SemiBold.ttf';
import MontserratSemiBold from '../Fonts/Montserrat-SemiBold.ttf';
import MontserratSemiBoldItalic from '../Fonts/Montserrat-SemiBoldItalic.ttf';

import Social from "./sections/Social";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "store";
import profileApi from "api/profileApi";
import Activities from "./sections/Activities";
import Awards from "./sections/Awards";
import Profile from "./sections/Profile";
import Hobbies from "./sections/Hobbies";
import References from "./sections/References";
import Languages from "./sections/Language";
import Contact from "./sections/Contact";

interface CvTemplate {
    color: any;
    fontSize: number;
    profile: any;
}

const CvTemplate8: React.FC<CvTemplate> = (props) => {

    const { color, fontSize, profile } = props;
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            position: 'relative'
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 30,
            right: 30,
            height: '38.287pt',
            backgroundColor: color === 1
                ? '#404BA0'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            zIndex: 1,
        },
        line: {
            width: '100%',
            // height: '2px',
            borderBottomColor: color === 1 ?
                '#8090C8' :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
            borderBottomStyle: 'dotted',
            borderBottomWidth: '2px',
            // backgroundColor: '#8090C8',
            marginBottom: '22.426pt',
            zIndex: 2,
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            // marginTop: '14.547pt',
        },
        image: {
            marginBottom: 10,
        },
        leftColumn: {
            flexDirection: 'column',
            width: "35%",
            paddingRight: 10,
            borderRightWidth: '2px',
            borderRightColor: color === 1 ?
                "#404BA0" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
        },
        leftColumnContent: {
            width: '100%',
            // marginTop: '24.532pt'
        },
        rightColumnContent: {
            width: '100%',
            // marginTop: '24.532pt'
        },
        rightColumn: {
            flexDirection: 'column',
            width: "65%",
            // paddingTop: '1.094cm',
            // marginTop: '1cm',
            paddingLeft: '24.809pt',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 10,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#ffffff',
        },
        circleTop: {
            position: 'absolute',
            top: -195,
            left: -60,
            right: -60,
            zIndex: 4,
        },
        circleBot: {
            position: 'absolute',
            bottom: -195,
            left: -60,
            right: -60,
            zIndex: 4,
        },
    });
    Font.register({
        family: 'Abhaya Libre ExtraBold',
        src: AbhayaLibreExtraBold,
        fontWeight: 'bold',
    });

    Font.register({
        family: 'Montserrat Regular',
        src: MontserratRegular,
    });

    Font.register({
        family: 'Montserrat Bold',
        src: MontserratBold,
    });
    Font.register({
        family: 'Archivo SemiExpanded Regular',
        src: Archivo,
    });
    Font.register({
        family: 'Montserrat Semi Bold',
        src: MontserratSemiBold,
    });
    Font.register({
        family: 'OpenSans-Bold',
        src: OpenSansBold,
    });
    Font.register({
        family: 'OpenSans-Regular',
        src: OpenSansRegular,
    });
    Font.register({
        family: 'OpenSans-Semi-Bold',
        src: OpenSansSemiBold,
    });
    Font.register({
        family: 'OpenSans-Semi-Bold-Italic',
        src: MontserratSemiBoldItalic,
    });
    console.log(profile);


    const Resume = (props: any) => (
        <Page {...props} style={styles.page}>
            <Header color={color} profile={profile} />
            <Svg viewBox="0 0 8000 8000" style={styles.circleTop} fixed>
                <Circle
                    cx="4000"
                    cy="20"
                    r="4000"
                    fill="#F2F4FA"
                    stroke="none"
                />
            </Svg>
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <View style={styles.leftColumnContent}>
                        <Contact color={color} profile={profile} />
                        <View style={styles.line}></View>
                        <Education color={color} profile={profile} />
                        <View style={styles.line}></View>
                        {
                            profile?.profilesLanguages && profile?.profilesLanguages?.length > 0 ?
                                <>
                                    <Languages color={color} profile={profile} />
                                    <View style={styles.line}></View>
                                </> :
                                <></>
                        }
                        {
                            profile?.profilesSkills && profile?.profilesSkills?.length > 0 ?
                                <>
                                    <Skills color={color} profile={profile} />
                                    <View style={styles.line}></View>
                                </> :
                                <></>
                        }
                        {
                            profile?.profileAwards && profile?.profileAwards?.length > 0 ?
                                <>
                                    <Awards color={color} profile={profile} />
                                    <View style={styles.line}></View>
                                </> :
                                <></>
                        }
                        {/* <Social color={color} profile={profile} /> */}
                    </View>
                </View>
                <View style={styles.rightColumn}>
                    <View style={styles.rightColumnContent}>
                        <Profile color={color} profile={profile} />
                        <View style={styles.line}></View>
                        <Experience color={color} profile={profile} />
                        <View style={styles.line}></View>
                        {
                            profile?.profileActivities && profile?.profileActivities?.length > 0 ?
                                <>
                                    <Activities color={color} profile={profile} />
                                    <View style={styles.line}></View>
                                </>
                                :
                                <></>
                        }
                        {
                            profile?.profileHobbies ?
                                <>
                                    <Hobbies color={color} profile={profile} />
                                    <View style={styles.line}></View>
                                </> :
                                <></>
                        }
                        {
                            profile?.profilesReferences && profile?.profilesReferences?.length > 0 ?
                                <>
                                    <References color={color} profile={profile} />
                                    <View style={styles.line}></View>
                                </> :
                                <></>
                        }
                    </View>
                </View>
            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
            <Svg viewBox="0 0 8000 8000" style={styles.circleBot} fixed>
                <Circle
                    cx="4000"
                    cy="7980"
                    r="4000"
                    fill="#F2F4FA"
                    stroke="none"
                />
            </Svg>
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
                    width: "100%",
                    height: "100%",
                    border: "1px solid #000000",
                }}
            >
                <Resume size="A4" />
                {/* <Resume orientation="landscape" size="A4" />
            <Resume size={[380, 1250]} /> */}
            </Document>
        </Provider>
    )
}


export default memo(CvTemplate8);