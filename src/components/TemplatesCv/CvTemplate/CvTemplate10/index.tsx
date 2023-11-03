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

interface CvTemplate {
  color: any;
  fontSize: number;
  profile: any;
}
const CvTemplate9: React.FC<CvTemplate> = (props) => {
  const { color, fontSize, profile } = props;
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      position: 'relative',
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      zIndex: 2,
      //   paddingLeft: '14.279pt',
      //   paddingRight: '14.279pt',
      //   paddingTop: '68.34pt',
      //   gap: '48.781pt',
    },
    leftColumn: {
      flexDirection: 'column',
      width: '65%',
      // paddingRight: 10,
      backgroundColor: '#fff',
      borderRight: '1px solid #34899d',
      gap: '20.495pt',
    },
    rightColumn: {
      flexDirection: 'column',
      width: '35%',
      // paddingTop: '1.094cm',
      // marginTop: '1cm',
      // paddingLeft: '24.809pt',
      backgroundColor: '#fff',
      gap: '20.495pt',
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
          <View>
            <Education profile={profile} fontSize={fontSize} color={color} />
          </View>
          <View>
            <Experience profile={profile} fontSize={fontSize} color={color} />
          </View>
          <View>
            <Activities profile={profile} fontSize={fontSize} color={color} />
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View>
            <Profile profile={profile} fontSize={fontSize} color={color} />
          </View>
          <View>
            <Language profile={profile} fontSize={fontSize} color={color} />
          </View>
          <View>
            <Hobies profile={profile} fontSize={fontSize} color={color} />
          </View>
          <View>
            <Skill profile={profile} fontSize={fontSize} color={color} />
          </View>
          <View>
            <Reference profile={profile} fontSize={fontSize} color={color} />
          </View>
          <View>
            <Award profile={profile} fontSize={fontSize} color={color} />
          </View>
        </View>
      </View>
      <Text
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
