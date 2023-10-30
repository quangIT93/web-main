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

const Experience: React.FC<ICvExperience> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      marginBottom: '24.69pt',
      // marginLeft: '0.9cm',
      // border: '1px solid red',
    },
    experience: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15.263pt',
      marginLeft: '9.141pt',
      // border: '1px solid red'
    },
    timeCompany: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      gap: '4px',
      flexWrap: 'wrap',
      // border: '1px solid red'
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      // marginLeft: '0.671cm',
      // marginBottom: 5,
      // marginLeft: '34.638pt',
      // border: '1px solid red',
      // position: 'relative',
    },
    time: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 14,
      letterSpacing: '2px',
      marginBottom: '2px',
      textAlign: 'justify',
      color: '#777878',
    },
    school: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 12,
      // flexGrow: 1,
      textAlign: 'justify',
      // wordBreak: "break-all",
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
    companyName: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 14,
      textAlign: 'justify',
      color: '#777878',
    },
    line: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 14,
      textAlign: 'justify',
      color: '#777878',
    },
    detail: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      color: '#777878',
      marginTop: '15.766pt',
      // wordBreak: "break-word",
      width: '100%',
      // flexGrow: 1,
      textAlign: 'justify',
      // border: '1px solid red'
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
      <Text style={styles.title}>Experience</Text>
      <View style={styles.borderBot}></View>
      {profile?.profilesExperiences &&
        profile?.profilesExperiences.map((experience: any, i: any) => {
          return (
            <View style={styles.experience} key={i}>
              <View style={styles.right}>
                <Text style={styles.school}>{experience?.title}</Text>
                <View style={styles.timeCompany}>
                  <Text style={styles.companyName}>
                    {experience?.companyName}
                  </Text>
                  <Text style={styles.line}>|</Text>
                  <Text style={styles.time}>
                    {moment(experience?.startDate).format('YYYY')}
                    {'-'}
                    {moment(experience?.endDate).format('YYYY')}
                  </Text>
                </View>
                <Text style={styles.detail}>
                  {experience?.extraInformation}
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default Experience;
