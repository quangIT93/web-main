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
      marginBottom: 10,
      marginLeft: '30pt',
    },
    language: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 5,
      // border: '1px solid red'
    },
    not: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      // border: '1px solid red',
      // width: 10,
      // fontSize: 20,
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      // border: '1px solid red'
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginLeft: '0.658cm',
    },
    time: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 13,
      letterSpacing: '2px',
      marginBottom: '2px',
    },
    school: {
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
    achievements: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      marginTop: '16.92pt',
      width: '100%',
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
              <View style={styles.left}>
                {/* <Text style={styles.not}>•</Text> */}
                <Svg viewBox="0 0 2 2" style={{ width: 10 }}>
                  <Circle
                    cx="1"
                    cy="1"
                    r="0.5"
                    fill={
                      color === 1
                        ? '#252525'
                        : color === 2
                          ? '#0D99FF'
                          : color === 3
                            ? '#FBBC04'
                            : color === 4
                              ? '#5CB265'
                              : '#D80000'
                    }
                    stroke="none"
                  />
                </Svg>
              </View>
              <View style={styles.right}>
                <Text style={styles.school}>{item?.languageName}</Text>
                <Text style={styles.detail}>{item?.dataLevel?.data}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default Languages;
