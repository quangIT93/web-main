/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

interface ICvSkills {
  color: any;
  profile: any;
}

const Profile: React.FC<ICvSkills> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: '24.235pt',
      // border: '1px solid red'
    },
    content: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      // gap: '20.398pt',
    },
    title: {
      fontFamily: 'OpenSans-Semi-Bold',
      fontSize: 15,
      width: '47%',
      marginBottom: '23.191pt',
      textTransform: 'uppercase',
      color: color === 1
        ? '#152D35'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      paddingTop: '7.211pt',
      paddingBottom: '7.211pt',
      paddingLeft: '5.954pt',
      paddingRight: '5.954pt',
      backgroundColor: '#D4ECDD'
    },
    profile: {
      fontFamily: "OpenSans-Regular",
      fontSize: 9,
      width: '100%',
      textAlign: 'justify',
      color: '#3B3A3C',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>PROFILE</Text>
        <Text style={styles.profile}>
          {profile?.introduction}
        </Text>
      </View>
    </View>
  );
};

export default Profile;
