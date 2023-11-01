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
} from '@react-pdf/renderer';

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
      border: '1px solid #ccc',
    },
    leftColumn: {
      flexDirection: 'column',
      width: '65%',
      // paddingRight: 10,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
    },
    rightColumn: {
      flexDirection: 'column',
      width: '35%',
      // paddingTop: '1.094cm',
      // marginTop: '1cm',
      // paddingLeft: '24.809pt',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
    },
  });
  Font.register({
    family: 'Abhaya Libre ExtraBold',
    src: AbhayaLibreExtraBold,
    fontWeight: 'bold',
  });

  //   Font.register({
  //     family: 'Montserrat Regular',
  //     src: MontserratRegular,
  //   });

  //   Font.register({
  //     family: 'Montserrat Bold',
  //     src: MontserratBold,
  //   });
  //   Font.register({
  //     family: 'Archivo SemiExpanded Regular',
  //     src: Archivo,
  //   });
  //   Font.register({
  //     family: 'Montserrat Semi Bold',
  //     src: MontserratSemiBold,
  //   });
  //   Font.register({
  //     family: 'OpenSans-Bold',
  //     src: OpenSansBold,
  //   });
  //   Font.register({
  //     family: 'OpenSans-Regular',
  //     src: OpenSansRegular,
  //   });
  //   Font.register({
  //     family: 'OpenSans-Semi-Bold',
  //     src: OpenSansSemiBold,
  //   });
  //   Font.register({
  //     family: 'OpenSans-Semi-Bold-Italic',
  //     src: MontserratSemiBoldItalic,
  //   });

  const Resume = (props: any) => (
    <Page {...props} style={styles.page}>
      <Header profile={profile} fontSize={fontSize} color={color} />
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Education profile={profile} fontSize={fontSize} color={color} />
        </View>
        <View style={styles.rightColumn}></View>
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
