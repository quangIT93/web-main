import React, { memo, useEffect, useState } from "react";

import './style.scss';
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

const CvTemplate1: React.FC<CvTemplate> = (props) => {

  const { color, fontSize, profile } = props;
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      '@media max-width: 400': {
        flexDirection: 'column',
      },

    },
    image: {
      marginBottom: 10,
    },
    leftColumn: {
      flexDirection: 'column',
      width: "49%",
      paddingTop: '1.094cm',
      marginTop: '1cm',
      paddingRight: '0.905cm',
      // '@media max-width: 400': {
      //     width: '100%',
      //     paddingRight: 0,
      // },
      // '@media orientation: landscape': {
      //     width: 200,
      // },
      // marginLeft: '1.583cm',
      borderRight: '0.5px solid #282828',
    },
    rightColumn: {
      flexDirection: 'column',
      width: "49%",
      paddingTop: '1.094cm',
      marginTop: '1cm',
      paddingRight: '0.905cm',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });

  Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
  });

  Font.register({
    family: 'Lato',
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
  });

  Font.register({
    family: 'Lato Italic',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
  });

  Font.register({
    family: 'Lato Bold',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
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

  console.log(profile);


  const Resume = (props: any) => (
    <Page {...props} style={styles.page}>
      <Header color={color} profile={profile} />
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {/* <Image
                        src="https://react-pdf.org/images/logo.png"
                        style={styles.image}
                    /> */}

          <Education color={color} profile={profile} />
          <Profile color={color} profile={profile} />
          {
            profile?.profilesLanguages && profile?.profilesLanguages?.length > 0 ?
              <Languages color={color} profile={profile} /> :
              <></>
          }
          {
            profile?.profilesSkills && profile?.profilesSkills?.length > 0 ?
              <Skills color={color} profile={profile} /> :
              <></>
          }
          {
            profile?.profileAwards && profile?.profileAwards?.length > 0 ?
              <Awards color={color} profile={profile} /> :
              <></>
          }
          {/* <Social color={color} profile={profile} /> */}
        </View>
        <View style={styles.rightColumn}>
          <Experience color={color} profile={profile} />
          {
            profile?.profileActivities && profile?.profileActivities?.length > 0 ?
              <Activities color={color} profile={profile} /> :
              <></>
          }
          {
            profile?.profileHobbies ?
              <Hobbies color={color} profile={profile} /> :
              <></>
          }
          {
            profile?.profilesReferences && profile?.profilesReferences?.length > 0 ?
              <References color={color} profile={profile} /> :
              <></>
          }
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


export default memo(CvTemplate1);