import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvHobies {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Hobies: React.FC<ICvHobies> = (props) => {
  const { color, profile, fontSize, profileMore } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    divTitle: {
      backgroundColor:
        color === 1
          ? '#8dc5fe'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color:
        color === 1
          ? '#000000'
          : color === 2
          ? '#000000'
          : color === 3
          ? '#ffffff'
          : color === 4
          ? '#000000'
          : '#ffffff',
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
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <Text style={styles.title}>Hobies</Text>
      </View>

      <View style={styles.divDes}>
        <Text style={styles.textDes}>
          {profileMore?.profileHobbies?.description}
        </Text>
      </View>
    </View>
  );
};

export default Hobies;
