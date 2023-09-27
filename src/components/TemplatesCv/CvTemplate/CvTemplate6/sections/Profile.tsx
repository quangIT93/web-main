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
      borderWidth: '1px',
      borderColor: color === 1
        ? '#213555'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      paddingTop: '16.085pt',
      paddingBottom: '21.351pt',
      paddingLeft: '15.463pt',
      paddingRight: '15.463pt',
      // marginLeft: '1.583cm',
      // border: '1px solid red'
    },
    content: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20.398pt',
    },
    title: {
      fontFamily: 'OpenSans-Semi-Bold',
      fontSize: 16,
      textTransform: 'uppercase',
      width: '100%',
      textAlign: 'justify',
      color:
        color === 1
          ? '#213555'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
    },
    profile: {
      fontFamily: 'OpenSans-Semi-Bold',
      fontSize: 10,
      width: '100%',
      textAlign: 'justify',
      color: '#4A4747',
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
