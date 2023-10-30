import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

import List, { Item } from './List';
import moment from 'moment';
interface ICvEducation {
  color: any;
  profile: any;
  fontSize: any;
}

const Awards: React.FC<ICvEducation> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginBottom: '24.69pt',
      // paddingRight: '0.905cm'
      // marginLeft: '1.583cm',
    },
    content: {
      width: '100%',
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
      paddingLeft: '49.757pt',
      paddingRight: '49.757pt',
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
      color: '#777878',
      marginTop: '15.766pt',
      paddingLeft: '49.757pt',
      paddingRight: '49.757pt',
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
      <View style={styles.content}>
        <Text style={styles.title}>Awards</Text>
        <View style={styles.borderBot}></View>
        {profile?.profileAwards &&
          profile?.profileAwards.map((education: any, i: any) => {
            return (
              <View style={styles.education} key={i}>
                <View style={styles.right}>
                  {/* <Text style={styles.time}>
                                    {moment(education?.startDate).format('YYYY')}{" - "}
                                    {moment(education?.endDate).format('YYYY')}
                                </Text> */}
                  <Text style={styles.school}>{education?.title}</Text>
                  <Text style={styles.detail}>{education?.description}</Text>
                  {/* <View style={styles.achievements}>
                                <Text style={styles.detail}>
                                    {`(*)Achievements: `}
                                </Text>
                                <List>
                                    {education.achievements.map((iem: any, i: any) => (
                                        <Item key={i}>{iem}</Item>
                                    ))}
                                </List>
                            </View> */}
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default Awards;
