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
      // marginRight: -25,
      width: '100%',
    },
    content: {
      borderBottom: `2px solid ${color === 1
        ? '#09009B'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
        }`,
      paddingBottom: '28.162pt',
    },
    divTitle: {
      // width: '180pt',
      // marginLeft: '20pt',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5pt',
    },
    title: {
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color:
        color === 1
          ? '#09009B'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Fahkwang Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divDes: {
      // marginLeft: '20pt',
      marginTop: '9.338pt',
      marginBottom: '28.162pt'
      // width: '137pt',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
    },
    square: {
      width: '10px',
      height: '10px',
      backgroundColor: color === 1
        ? '#09009B'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.divTitle}>
          <View style={styles.square} />
          <Text style={styles.title}>Profile</Text>
        </View>
        <View style={styles.divDes}>
          <Text style={styles.textDes}>{profile?.introduction}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
