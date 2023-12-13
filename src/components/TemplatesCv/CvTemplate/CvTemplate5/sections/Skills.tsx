import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

import List, { Item } from './List';
import moment from 'moment';
interface ICvEducation {
  color: any;
  profile: any;
  fontSize: any;
}

const Skills: React.FC<ICvEducation> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginBottom: '24.69pt',
      // paddingRight: '0.905cm'
      // marginLeft: '1.583cm',
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
    education: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 5,
      //   width: '100%',
      //   border: '1px solid red',
      width: '159.407pt',
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
      alignItems: 'flex-start',
      // flexDirection: 'row',
      //   width: '100%',
      // border: '1px solid blue',
      gap: '5px',
      justifyContent: 'center',
      // border: '1px solid red'
      marginBottom: '8.17pt',
      // marginLeft: '0.658cm'
      //   border: '1px solid blue',
    },
    time: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 13,
      letterSpacing: '2px',
      marginBottom: '2px',
    },
    school: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 11,
      textAlign: 'left',
      color: '#112D4E',
    },
    detail: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      // wordBreak: "break-word",
      // width: '100%',
      textAlign: 'left',
      color: '#112D4E',
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
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 11,
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
      <View style={styles.content}>
        <Text style={styles.title}>Skills</Text>
        <View style={styles.borderBot}></View>
        {profile?.profilesSkills &&
          profile?.profilesSkills.map((education: any, i: any) => {
            return (
              <View style={styles.education} key={i}>
                <View style={styles.right}>
                  <Text style={styles.school}>
                    {education?.skillName}
                  </Text>
                  <Text style={styles.detail}>
                    {education?.dataLevel?.data}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default Skills;
