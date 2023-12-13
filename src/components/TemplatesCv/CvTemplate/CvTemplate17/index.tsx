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
const CvTemplate17: React.FC<CvTemplate> = (props) => {
  const { color, fontSize, profile, profileMore } = props;
  const styles = StyleSheet.create({
    page: {
      padding: '30 20 30 30',
      position: 'relative',
      backgroundColor: 'rgba(255,255,255,0.4)',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      zIndex: 2,
      //   paddingLeft: '14.279pt',
      //   paddingRight: '14.279pt',
      //   paddingTop: '68.34pt',
      //   gap: '48.781pt',
      position: 'relative',
      gap: '9.2pt',
    },
    leftColumn: {
      position: 'relative',
      flexDirection: 'column',
      width: '65%',
      // paddingRight: 10,
      backgroundColor:
        color === 1
          ? '#f4f4f4'
          : color === 2
            ? '#E9F5FE'
            : color === 3
              ? '#FDF9E7'
              : color === 4
                ? '#F1FDF2'
                : '#FDE9E9',
      // borderRight: `1px solid ${
      //   color === 1
      //     ? '#cee8ff'
      //     : color === 2
      //     ? '#AED6F1'
      //     : color === 3
      //     ? '#F9E79F'
      //     : color === 4
      //     ? '#ABEBC6'
      //     : '#F1948A'
      // }`,
      gap: '20.495pt',
      paddingTop: '20pt',
      marginLeft: -30,
    },
    rightColumn: {
      position: 'relative',
      paddingTop: '20pt',
      flexDirection: 'column',
      display: 'flex',
      width: '40%',
      // paddingTop: '1.094cm',
      // marginTop: '1cm',
      // paddingLeft: '24.809pt',
      backgroundColor:
        color === 1
          ? '#f4f4f4'
          : color === 2
            ? '#E9F5FE'
            : color === 3
              ? '#FDF9E7'
              : color === 4
                ? '#F1FDF2'
                : '#FDE9E9',
      gap: '35pt',
      marginRight: -30,
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
    hijob: {
      position: 'absolute',
      bottom: 0,
      // left: 0,
      right: 0,
      // textAlign: 'center',
      height: 25,
      paddingRight: 25,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#D4AC0D'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      width: '42%',
    },
    hijobText: {
      color: '#000000',
      fontSize: fontSize - 12,
      height: 17,
      textAlign: 'right',
      // border: '1px solid red'
    },
    lineTopRight: {
      position: 'absolute',
      height: '9pt',
      width: '100%',
      backgroundColor:
        color === 1
          ? '#ffcf00'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#D4AC0D'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      zIndex: 3,
      marginLeft: 0,
      // marginRight: 1,
    },
    lineBottomRight: {
      position: 'absolute',
      height: '9pt',
      width: '100%',
      backgroundColor:
        color === 1
          ? '#ffcf00'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#D4AC0D'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      zIndex: 3,
      marginLeft: 0,
      bottom: 0,
      // left: 0,
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
      <Header profile={profile} fontSize={fontSize} color={color} />
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <View style={styles.lineTopRight}></View>
          <View style={styles.lineBottomRight} fixed></View>
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
      <View
        style={styles.hijob}
        fixed>
        <Text
          style={styles.hijobText}
          render={({ pageNumber, totalPages }) => `hijob.site`}
        />
      </View>
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

export default memo(CvTemplate17);
