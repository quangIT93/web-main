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
import ArchivoBold from '../Fonts/Archivo_Condensed-Bold.ttf';
import ArchivoExpandRegular from '../Fonts/Archivo_SemiExpanded-Regular.ttf';

import Sitka from '../Fonts/Sitka.ttf';
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

interface CvTemplate {
    color: any;
    fontSize: number;
    profile: any;
}

const CvTemplate5: React.FC<CvTemplate> = (props) => {

    const { color, fontSize, profile } = props;
    const styles = StyleSheet.create({
        page: {
            // padding: 30,
            paddingTop: 30,
            paddingBottom: 30,
            position: 'relative'
        },
        footer: {
            position: 'absolute',
            // width: '100%',
            height: '14pt',
            backgroundColor: '#DBE2EF',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            // left: 0,
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
        container: {
            flex: 1,
            flexDirection: 'row',
            '@media max-width: 400': {
                flexDirection: 'column',
            },
            // borderTopWidth: '0.5px',
            // borderTopColor: '#282828',
            // marginTop: '1cm',
            // marginLeft: '30pt',
            // marginRight: '30pt',
            paddingRight: '52.531pt',
            // zIndex: 2
        },
        image: {
            marginBottom: 10,
        },
        leftColumn: {
            flexDirection: 'column',
            width: "248.6pt",
            backgroundColor: "transparent",
            // paddingRight: '0.905cm',
            // backgroundColor: "#F9F7F7"
        },
        bgLeft: {
            width: "248.6pt",
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "#F9F7F7",
            // zIndex: 1,
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
            width: "55%",
            // paddingTop: '1.094cm',
            // marginTop: '1cm',
            paddingRight: '52.531pt',
            paddingLeft: '29.612pt'
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 10,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
            zIndex: 2,
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
    // Font.register({
    //     family: 'Archivo SemiExpanded Regular',
    //     src: Archivo,
    // });
    Font.register({
        family: 'Archivo SemiExpanded Bold',
        src: ArchivoBold,
    });
    Font.register({
        family: 'Archivo SemiExpanded Regular',
        src: ArchivoExpandRegular,
    });

    console.log(profile);


    const Resume = (props: any) => (
        <Page {...props} style={styles.page}>
            <View style={styles.bgLeft} fixed></View>
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    {/* <Image
                        src="https://react-pdf.org/images/logo.png"
                        style={styles.image}
                    /> */}
                    <View style={styles.leftColumnContent}>
                        <Header color={color} profile={profile} />
                        <Profile color={color} profile={profile} />
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
                            profile?.profilesLanguages && profile?.profilesLanguages?.length > 0 ?
                                <Languages color={color} profile={profile} /> :
                                <></>
                        }
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


export default memo(CvTemplate5);