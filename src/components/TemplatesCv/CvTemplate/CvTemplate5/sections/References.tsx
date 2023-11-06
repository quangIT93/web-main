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

const References: React.FC<ICvExperience> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginBottom: '24.69pt',
      // marginLeft: '0.9cm',
    },
    reference: {
      display: 'flex',
      flexDirection: 'row',
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
      height: '90%',
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
      marginRight: '0.671cm',
    },
    lineWhite: {
      width: 1,
      height: '70%',
      backgroundColor: '#FFFFFF',
      marginRight: '0.671cm',
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
      marginBottom: 5,
      // border: '1px solid red',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'flex-start',
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
      color: '#777878',
      // border: '1px solid red',
    },
    phone: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      width: '100%',
      textAlign: 'justify',
      color: '#777878',
      marginTop: '15.766pt',
      // border: '1px solid red',
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
      <Text style={styles.title}>References</Text>
      <View style={styles.borderBot}></View>
      {profile?.profilesReferences &&
        profile?.profilesReferences.map((reference: any, i: any) => {
          return (
            <View style={styles.reference} key={i}>
              <View style={styles.right}>
                <View>
                  <Text style={styles.school}>{reference?.fullName}</Text>
                  <Text style={styles.phone}>{reference?.phone}</Text>
                  <Text style={styles.detail}>{reference?.email}</Text>
                  {/* <View style={styles.achievements}>
                                <Text style={styles.detail}>
                                    {`(*)Achievements: `}
                                </Text>
                                <List>
                                    {reference.achievements.map((iem: any, i: any) => (
                                        <Item key={i}>{iem}</Item>
                                    ))}
                                </List>
                            </View> */}
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default References;
