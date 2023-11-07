import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvAward {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Award: React.FC<ICvAward> = (props) => {
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
      color: '#000',
      letterSpacing: '4pt',
      fontFamily: 'Fahkwang Bold',
      fontWeight: 'extrabold',
    },
    divDes: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    TextTitleDes: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
      color:
        color === 1
          ? '#004080'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
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
        <Text style={styles.title}>Award</Text>
      </View>
      {profileMore?.profileAwards?.map((ward: any) => (
        <View>
          <View style={styles.divDes}>
            <Text style={styles.TextTitleDes}>{ward?.title}</Text>
          </View>
          <View style={styles.divDes}>
            <Text style={styles.textDes}>{ward?.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Award;
