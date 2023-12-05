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
} from '@react-pdf/renderer';
import Petrona from '../Fonts/Petrona-Bold.ttf';
import Fahkwang from '../Fonts/Fahkwang-medium.ttf';
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
const CvTemplate9: React.FC<CvTemplate> = (props) => {
  const { color, fontSize, profile, profileMore } = props;
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      position: 'relative',
      zIndex: 1,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      //   paddingLeft: '14.279pt',
      //   paddingRight: '14.279pt',
      //   paddingTop: '68.34pt',
      //   gap: '48.781pt',
      // position: 'absolute',
    },
    leftColumn: {
      flexDirection: 'column',
      width: '65%',
      // paddingRight: 10,
      borderRight: `1px solid ${
        color === 1
          ? '#cee8ff'
          : color === 2
            ? '#AED6F1'
            : color === 3
              ? '#F9E79F'
              : color === 4
                ? '#ABEBC6'
                : '#F1948A'
      }`,
      gap: '20.495pt',
    },
    rightColumn: {
      flexDirection: 'column',
      width: '35%',
      // paddingTop: '1.094cm',
      // marginTop: '1cm',
      // paddingLeft: '24.809pt',
      gap: '20.495pt',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: fontSize - 8,
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    heart1: {
      width: 130,
      height: 130,
      right: '50%',
      top: 0,
      position: 'absolute',
      backgroundColor:
        color === 1
          ? '#f7b3cc'
          : color === 2
            ? '#AED6F1'
            : color === 3
              ? '#F9E79F'
              : color === 4
                ? '#ABEBC6'
                : '#F1948A',
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      zIndex: -1,
    },
    heart2: {
      width: 130,
      height: 130,
      right: 0,
      top: '50%',
      position: 'absolute',
      backgroundColor:
        color === 1
          ? '#f7b3cc'
          : color === 2
            ? '#AED6F1'
            : color === 3
              ? '#F9E79F'
              : color === 4
                ? '#ABEBC6'
                : '#F1948A',
      transform: 'rotate(-90deg)',
      borderTopLeftRadius: '60%',
      borderBottomLeftRadius: '30%',
    },
    heart3: {
      width: 130,
      height: 130,
      right: 1,
      top: 1,
      position: 'absolute',
      backgroundColor:
        color === 1
          ? '#f7b3cc'
          : color === 2
            ? '#AED6F1'
            : color === 3
              ? '#F9E79F'
              : color === 4
                ? '#ABEBC6'
                : '#F1948A',
    },
    heart11: {
      width: 130,
      height: 130,
      right: '50%',
      top: 0,
      position: 'absolute',
      backgroundColor: '#f0e3d0',
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      zIndex: -1,
    },
    heart22: {
      width: 130,
      height: 130,
      right: 0,
      top: '50%',
      position: 'absolute',
      backgroundColor: '#f0e3d0',
      transform: 'rotate(-90deg)',
      borderTopLeftRadius: '60%',
      borderBottomLeftRadius: '30%',
    },
    heart33: {
      width: 130,
      height: 130,
      right: 1,
      top: 1,
      position: 'absolute',
      backgroundColor: '#f0e3d0',
    },
    wrapHeart1: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 260,
      height: 260,
      zIndex: 0,
    },

    wrapHeart2: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 260,
      height: 260,
      transform: 'rotate(-180deg)',
      zIndex: 0,
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
    family: 'Fahkwang Medium',
    src: Fahkwang,
    fontWeight: 'bold',
  });

  const Resume = (props: any) => (
    <Page {...props} style={styles.page}>
      <View style={styles.wrapHeart1} fixed>
        <View style={styles.heart1}></View>
        <View style={styles.heart2}></View>
        <View style={styles.heart3}></View>
      </View>

      <View style={styles.wrapHeart2} fixed>
        <View style={styles.heart11}></View>
        <View style={styles.heart22}></View>
        <View style={styles.heart33}></View>
      </View>

      <Header profile={profile} fontSize={fontSize} color={color} />
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {profileMore?.profilesEducations &&
          profileMore.profilesEducations?.length !== 0 ? (
            <View>
              <Education
                profile={profileMore}
                fontSize={fontSize}
                color={color}
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
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.rightColumn}>
          <View>
            <Profile profile={profile} fontSize={fontSize} color={color} />
          </View>
          {profileMore?.profilesLanguages &&
          profileMore.profilesLanguages?.length !== 0 ? (
            <View>
              <Language
                profile={profileMore}
                fontSize={fontSize}
                color={color}
              />
            </View>
          ) : (
            <></>
          )}
          {profileMore?.profileHobbies &&
          profileMore.profileHobbies?.length !== 0 ? (
            <View>
              <Hobies profile={profileMore} fontSize={fontSize} color={color} />
            </View>
          ) : (
            <></>
          )}
          {profileMore?.profilesSkills &&
          profileMore.profilesSkills?.length !== 0 ? (
            <View>
              <Skill profile={profileMore} fontSize={fontSize} color={color} />
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
              />
            </View>
          ) : (
            <></>
          )}

          {profileMore?.profileAwards &&
          profileMore.profileAwards?.length !== 0 ? (
            <View>
              <Award profile={profileMore} fontSize={fontSize} color={color} />
            </View>
          ) : (
            <></>
          )}

          <Contact profile={profile} fontSize={fontSize} color={color} />
        </View>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
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

export default memo(CvTemplate9);
