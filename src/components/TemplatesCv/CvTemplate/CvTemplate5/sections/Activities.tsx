/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Line, Circle, Svg } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';
import moment from 'moment';

interface ICvExperience {
  color: any;
  profile: any;
  fontSize: any;
}

const Activities: React.FC<ICvExperience> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginBottom: '24.69pt',
      // marginLeft: '0.9cm',
      // border: '1px solid red'
    },
    experience: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '15.263pt',
      width: '100%',
      marginLeft: '9.141pt',
      // border: '1px solid red'
    },
    not: {
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'flex-end',
      // border: '1px solid red'
      // border: '1px solid red',
      width: 10,
      // fontSize: 20,
      // gap: '0.516cm'
      position: 'absolute',
      left: '-4.25px',
      top: 0,
      zIndex: 2,
    },
    line: {
      width: 1,
      height: '95%',
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
      // marginRight: '0.671cm',
    },
    lineWhite: {
      width: 1,
      height: '70%',
      backgroundColor: '#FFFFFF',
      // marginRight: '0.671cm',
      zIndex: 1,
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
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      // marginLeft: '0.658cm'
      marginBottom: 5,
      position: 'relative',
    },
    info: {
      // border: '1px solid red',
      width: '100%',
      // paddingRight: '0.671cm',
      paddingLeft: '0.671cm',
    },
    time: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 13,
      letterSpacing: '2px',
      marginBottom: '2px',
    },
    school: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 12,
      textAlign: 'justify',
      width: '100%',
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
    detail: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      width: '100%',
      textAlign: 'justify',
      // border: '1px solid red'
      color: '#777878',
      marginTop: '15.766pt',
    },
    achievements: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      // marginTop: '16.92pt',
      width: '100%',
      // border: '1px solid red'
    },
    title: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 11,
      width: '159.407pt',
      textAlign: 'center',
      letterSpacing: '2px',
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
      <Text style={styles.title}>Activities</Text>
      <View style={styles.borderBot}></View>
      {profile?.profileActivities &&
        profile?.profileActivities.map((experience: any, i: any) => {
          return (
            <View style={styles.experience} key={i}>
              <View style={styles.right}>
                <Text style={styles.school}>{experience?.title}</Text>
                <Text style={styles.time}>
                  {moment(experience?.startDate).format('YYYY')}
                  {' - '}
                  {moment(experience?.endDate).format('YYYY')}
                </Text>
                <Text style={styles.detail}>{experience?.description}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default Activities;
