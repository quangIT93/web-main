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
      // marginLeft: '1.583cm',
      // border: '1px solid red'
      paddingRight: '0.905cm'
    },
    title: {
      fontFamily: 'Montserrat Bold',
      fontSize: 12,
      letterSpacing: '2px',
      marginBottom: '0.476cm',
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
    profile: {
      fontFamily: 'Montserrat Regular',
      fontSize: 9,
      wordBreak: 'break-word',
      width: '100%',
      textAlign: 'justify'
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROFILE</Text>
      <Text style={styles.profile}>
        {profile?.introduction}
      </Text>
    </View>
  );
};

export default Profile;
