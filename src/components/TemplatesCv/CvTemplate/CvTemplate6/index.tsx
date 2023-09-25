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

const CvTemplate6: React.FC<CvTemplate> = (props) => {

    const { color, fontSize, profile } = props;
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            paddingBottom: '70pt',
            position: 'relative'
        },
        rightDiv: {
            position: 'absolute',
            top: 0,
            right: 30,
            width: '237.179pt',
            height: '221.179pt',
            backgroundColor: '#F4FCD9',
            borderBottomRightRadius: '20px',
            borderBottomLeftRadius: '20px',
            zIndex: 2,
        },
        borderBot: {
            width: '100%',
            height: '0.5px',
            backgroundColor: '#282828',
            marginBottom: '27.255pt',
            zIndex: 2,
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '38.287pt',
            backgroundColor: color === 1
                ? '#213555'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            zIndex: 1,
        },
        lineFooter: {
            position: 'absolute',
            bottom: '42.627',
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: color === 1
                ? '#213555'
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
            position: 'absolute',
            bottom: 0,
            left: 40,
            width: '3.351pt',
            height: '112pt',
            backgroundColor: 'transparent',
            borderLeftWidth: '1px',
            borderLeftColor: '#282828',
            borderRightWidth: '1px',
            borderRightColor: '#282828',
        },
        topLine: {
            position: 'absolute',
            top: 15,
            right: '15pt',
            width: '3.351pt',
            height: '112pt',
            backgroundColor: 'transparent',
            borderLeftWidth: '1px',
            borderLeftColor: '#282828',
            borderRightWidth: '1px',
            borderRightColor: '#282828',
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            marginTop: '14.547pt',
        },
        image: {
            marginBottom: 10,
        },
        leftColumn: {
            flexDirection: 'column',
            width: "40%",
            paddingRight: '55.021pt',
            borderRightWidth: '1px',
            borderRightColor: color === 1 ?
                "#213555" :
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
            width: "60%",
            // paddingTop: '1.094cm',
            // marginTop: '1cm',
            // paddingRight: '0.905cm',
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


    const Resume = (props: any) => (
        <Page {...props} style={styles.page}>
            <Header color={color} profile={profile} />
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <View style={styles.leftColumnContent}>
                        <Contact color={color} profile={profile} />
                        <Profile color={color} profile={profile} />
                        {
                            profile?.profilesLanguages && profile?.profilesLanguages?.length > 0 ?
                                <Languages color={color} profile={profile} /> :
                                <></>
                        }
                        {
                            profile?.profilesSkills && profile?.profilesSkills?.length > 0 ?
                                <>
                                    <Skills color={color} profile={profile} />
                                </> :
                                <></>
                        }
                        {
                            profile?.profileAwards && profile?.profileAwards?.length > 0 ?
                                <>
                                    <Awards color={color} profile={profile} />
                                </> :
                                <></>
                        }
                        {/* <Social color={color} profile={profile} /> */}
                    </View>
                </View>
                <View style={styles.rightColumn}>
                    <View style={styles.rightColumnContent}>
                        <Experience color={color} profile={profile} />
                        <Education color={color} profile={profile} />
                        {
                            profile?.profileActivities && profile?.profileActivities?.length > 0 ?
                                <>
                                    <Activities color={color} profile={profile} />
                                </>
                                :
                                <></>
                        }
                        {
                            profile?.profileHobbies ?
                                <>
                                    <Hobbies color={color} profile={profile} />
                                </> :
                                <></>
                        }
                        {
                            profile?.profilesReferences && profile?.profilesReferences?.length > 0 ?
                                <>
                                    <References color={color} profile={profile} />
                                </> :
                                <></>
                        }
                    </View>
                </View>
            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
            <View style={styles.lineFooter} fixed></View>
            <View style={styles.footer} fixed></View>
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


export default memo(CvTemplate6);