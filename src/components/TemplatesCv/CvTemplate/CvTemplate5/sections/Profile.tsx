/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';

interface ICvSkills {
  color: any;
  profile: any;
}

const Profile: React.FC<ICvSkills> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      marginBottom: '24.69pt',
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
    title: {
      fontFamily: 'Montserrat Regular',
      fontSize: 13,
      letterSpacing: '2px',
      // marginBottom: '0.476cm',
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
    profile: {
      fontFamily: 'Montserrat Regular',
      fontSize: 9,
      wordBreak: 'break-word',
      width: '100%',
      textAlign: 'justify',
      paddingLeft: '49.757pt',
      paddingRight: '49.757pt',
      color: '#777878'
    },
    borderBot: {
      width: '159.407pt',
      height: 1.25,
      backgroundColor: color === 1 ?
        "#112D4E" :
        color === 2 ?
          "#0D99FF" :
          color === 3 ?
            "#FBBC04" :
            color === 4 ?
              "#5CB265" : "#D80000",
      marginTop: '6.745pt',
      marginBottom: '0.476cm'
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>PROFILE</Text>
        <View style={styles.borderBot}></View>
        <Text style={styles.profile}>
          {profile?.introduction}
        </Text>
      </View>
    </View>
  );
};

export default Profile;
