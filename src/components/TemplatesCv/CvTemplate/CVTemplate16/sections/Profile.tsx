import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvProfile {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Profile: React.FC<ICvProfile> = (props) => {
  const { color, profile, fontSize, profileMore } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    divTitle: {
      marginRight: '20pt',
      width: '180pt',
      marginLeft: '20pt',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: '5pt',
    },
    title: {
      // padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color: '#000000',
      fontFamily: 'Fahkwang Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divDes: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
    },
    square: {
      width: '5px',
      height: '25px',
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.square} />
        <Text style={styles.title}>PROFILE</Text>
      </View>
      <View style={styles.divDes}>
        <Text style={styles.textDes}>{profile?.introduction}</Text>
      </View>
    </View>
  );
};

export default Profile;
