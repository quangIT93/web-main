import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

import List, { Item } from './List';
import moment from 'moment';
interface ICvEducation {
  color: any;
  profile: any;
  fontSize: any;
}

const Languages: React.FC<ICvEducation> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginBottom: '24.69pt',
      // marginLeft: '1.583cm',
      paddingRight: '0.905cm',
    },
    language: {
      display: 'flex',
      flexDirection: 'column',
      // gap: '2px',
      marginBottom: 5,
      // border: '1px solid red'
    },
    top: {
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'flex-start',
      // justifyContent: 'flex-start'
      // border: '1px solid red'
      marginBottom: '8.17pt',
    },
    bot: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      gap: '4px',
      // marginLeft: '0.658cm'
    },
    line: {
      width: '126.84pt',
      height: '2px',
      backgroundColor:
        color === 1
          ? '#252525'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
    name: {
      fontFamily: 'Montserrat Bold',
      fontSize: fontSize - 14,
      textAlign: 'justify',
    },
    detail: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      wordBreak: 'break-word',
      width: '100%',
      textAlign: 'justify',
      // border: '1px solid red'
    },
    title: {
      fontFamily: 'Montserrat Bold',
      fontSize: fontSize - 12,
      letterSpacing: '2px',
      marginBottom: '0.658cm',
      textTransform: 'uppercase',
      color:
        color === 1
          ? '#252525'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Languages</Text>
      {profile?.profilesLanguages &&
        profile?.profilesLanguages?.map((item: any, i: any) => {
          return (
            <View style={styles.language} key={i}>
              <View style={styles.top}>
                <Text style={styles.name}>{item?.languageName}</Text>
              </View>
              <View style={styles.bot}>
                <View style={styles.line}></View>
                <Text style={styles.detail}>{item?.dataLevel?.data}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default Languages;
