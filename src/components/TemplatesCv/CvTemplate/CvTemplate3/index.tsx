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
} from '@react-pdf/renderer';

import Header from './sections/Header';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Experience from './sections/Experience';

import AbhayaLibreExtraBold from '../Fonts/AbhayaLibreExtraBold.ttf';
import MontserratRegular from '../Fonts/MontserratRegular.ttf';
import MontserratBold from '../Fonts/MontserratBold.ttf';
import Archivo from '../Fonts/Archivo_Condensed-Regular.ttf';
import Social from './sections/Social';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from 'store';
import profileApi from 'api/profileApi';
import Activities from './sections/Activities';
import Awards from './sections/Awards';
import Profile from './sections/Profile';
import Hobbies from './sections/Hobbies';
import References from './sections/References';
import Languages from './sections/Language';

interface CvTemplate {
  color: any;
  fontSize: number;
  profile: any;
  profileMore: any;
}

const CvTemplate3: React.FC<CvTemplate> = (props) => {
  const { color, fontSize, profile, profileMore } = props;
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      position: 'relative',
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
      left: 30,
      width: '237.179pt',
      height: '221.179pt',
      backgroundColor: '#F4FCD9',
      borderTopRightRadius: '20px',
      borderTopLeftRadius: '20px',
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
      '@media max-width: 400': {
        flexDirection: 'column',
      },
      borderTopWidth: '0.5px',
      borderTopColor: '#282828',
      marginTop: '1cm',
      marginLeft: '30pt',
      marginRight: '30pt',
    },
    image: {
      marginBottom: 10,
    },
    leftColumn: {
      flexDirection: 'column',
      width: '35%',
      // paddingRight: '0.905cm',
      borderRight: '0.5px solid #282828',
    },
    leftColumnContent: {
      width: '100%',
      marginTop: '24.532pt',
    },
    rightColumnContent: {
      width: '100%',
      marginTop: '24.532pt',
    },
    rightColumn: {
      flexDirection: 'column',
      width: '65%',
      // paddingTop: '1.094cm',
      // marginTop: '1cm',
      // paddingRight: '0.905cm',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: fontSize - 12,
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    hijob: {
      position: 'absolute',
      fontSize: fontSize - 12,
      bottom: 10,
      // left: 0,
      right: 25,
      textAlign: 'center',
      color: '#000000',
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

  const Resume = (props: any) => (
    <Page {...props} style={styles.page}>
      <Header color={color} profile={profile} fontSize={fontSize} />
      <View style={styles.rightDiv} fixed>
        <View style={styles.topLine} fixed></View>
      </View>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {/* <Image
                        src="https://react-pdf.org/images/logo.png"
                        style={styles.image}
                    /> */}
          <View style={styles.leftColumnContent}>
            <Profile color={color} profile={profile} fontSize={fontSize} />
            {profileMore?.profilesLanguages &&
              profileMore?.profilesLanguages?.length > 0 ? (
              <Languages
                color={color}
                profile={profileMore}
                fontSize={fontSize}
              />
            ) : (
              <></>
            )}
            <View style={styles.borderBot}></View>
            {profileMore?.profilesEducations &&
              profileMore?.profilesEducations?.length !== 0 ? (
              <Education
                color={color}
                profile={profileMore}
                fontSize={fontSize}
              />
            ) : (
              <></>
            )}
            <View style={styles.borderBot}></View>
            {profileMore?.profilesSkills &&
              profileMore?.profilesSkills?.length > 0 ? (
              <>
                <Skills
                  color={color}
                  profile={profileMore}
                  fontSize={fontSize}
                />
                <View style={styles.borderBot}></View>
              </>
            ) : (
              <></>
            )}
            {profileMore?.profileAwards &&
              profileMore?.profileAwards?.length > 0 ? (
              <>
                <Awards
                  color={color}
                  profile={profileMore}
                  fontSize={fontSize}
                />
                <View style={styles.borderBot}></View>
              </>
            ) : (
              <></>
            )}
            {/* <Social color={color} profile={profile} /> */}
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.rightColumnContent}>
            <Experience
              color={color}
              profile={profileMore}
              fontSize={fontSize}
            />
            <View style={styles.borderBot}></View>
            {profileMore?.profileActivities &&
              profileMore?.profileActivities?.length > 0 ? (
              <>
                <Activities
                  color={color}
                  profile={profileMore}
                  fontSize={fontSize}
                />
                <View style={styles.borderBot}></View>
              </>
            ) : (
              <></>
            )}
            {profileMore?.profileHobbies &&
              profileMore?.profileHobbies?.length !== 0 ? (
              <>
                <Hobbies
                  color={color}
                  profile={profileMore}
                  fontSize={fontSize}
                />
                <View style={styles.borderBot}></View>
              </>
            ) : (
              <></>
            )}
            {profileMore?.profilesReferences &&
              profileMore?.profilesReferences?.length > 0 ? (
              <>
                <References
                  color={color}
                  profile={profileMore}
                  fontSize={fontSize}
                />
                <View style={styles.borderBot}></View>
              </>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
      <View style={styles.footer} fixed></View>
      <View style={styles.line} fixed></View>
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

export default memo(CvTemplate3);
