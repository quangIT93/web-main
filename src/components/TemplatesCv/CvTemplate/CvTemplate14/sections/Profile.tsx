import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvProfile {
  color: any;
  profile: any;
  fontSize: any;
}
const Profile: React.FC<ICvProfile> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      // marginRight: -25,
    },
    divTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5pt',
      // marginLeft: '20pt',
    },
    title: {
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color:
        color === 1
          ? '#000000'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Petrona Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divDes: {
      // marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '100%',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
    square: {
      width: '10px',
      height: '10px',
      backgroundColor: color === 1
        ? '#f7b3cc'
        : color === 2
          ? '#AED6F1'
          : color === 3
            ? '#F9E79F'
            : color === 4
              ? '#ABEBC6'
              : '#F1948A'
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.square} />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.divDes}>
        <Text style={styles.textDes}>{profile?.introduction}</Text>
      </View>
    </View>
  );
};

export default Profile;
