import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

import List, { Item } from './List';
import moment from 'moment';
interface ICvEducation {
  color: any;
  profile: any;
}

const Languages: React.FC<ICvEducation> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      marginBottom: '24.69pt',
      // marginLeft: '1.583cm',
      // paddingRight: '0.905cm'
    },
    content: {
      width: '100%',
      // height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // border: '1px solid red',
    },
    language: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15.263pt',
      marginLeft: '9.141pt',

      // border: '1px solid red'
    },
    top: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // border: '1px solid red'
      marginBottom: '8.17pt',
      width: '100%',
      gap: '5mm',
    },
    bot: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      gap: '10pt',
      // border: '1px solid red'
      // marginLeft: '0.658cm'
    },
    line: {
      width: '70pt',
      height: '2px',
      backgroundColor:
        color === 1
          ? '#112D4E'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
    name: {
      fontFamily: 'Montserrat Regular',
      fontSize: 13,
      textAlign: 'justify',
      color: '#112D4E',
    },
    detail: {
      fontFamily: 'Montserrat Regular',
      fontSize: 9,
      // wordBreak: "break-word",
      // width: '100%',
      textAlign: 'justify',
      color: '#777878',
      // border: '1px solid red'
    },
    title: {
      fontFamily: 'Montserrat Regular',
      fontSize: 13,
      width: '159.407pt',
      textAlign: 'center',
      letterSpacing: '2px',
      // marginBottom: '0.658cm',
      textTransform: 'uppercase',
      color:
        color === 1
          ? '#112D4E'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
    borderBot: {
      width: '159.407pt',
      height: 1.25,
      backgroundColor:
        color === 1
          ? '#112D4E'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
      marginTop: '6.745pt',
      marginBottom: '0.476cm',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Languages</Text>
      <View style={styles.borderBot}></View>
      {profile?.profilesLanguages &&
        profile?.profilesLanguages?.map((item: any, i: any) => {
          return (
            <View style={styles.language} key={i}>
              <View style={styles.top}>
                <Text style={styles.name}>
                  {item?.languageName}
                  {/* {' - '} */}
                </Text>
                {'-'}
                <Text style={styles.detail}>{item?.dataLevel?.data}</Text>
              </View>
              {/* <View style={styles.bot}>
                                    <View style={styles.line}></View>
                                    <Text style={styles.detail}>{item?.dataLevel?.data}</Text>
                                </View> */}
            </View>
          );
        })}
    </View>
  );
};

export default Languages;
