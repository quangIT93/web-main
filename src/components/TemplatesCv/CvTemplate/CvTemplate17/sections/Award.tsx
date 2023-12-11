import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvAward {
  color: any;
  profile: any;
  fontSize: any;
}
const Award: React.FC<ICvAward> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      // marginRight: -25,
    },
    divTitle: {
      position: 'relative',
      // backgroundColor:
      //   color === 1
      //     ? '#e5f6fe'
      //     : color === 2
      //     ? '#D6EAF8'
      //     : color === 3
      //     ? '#FCF3CF'
      //     : color === 4
      //     ? '#D5F5E3'
      //     : '#FADBD8',
    },
    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color: '#000',
      fontFamily: 'Petrona Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divDes: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    textTitleDes: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
      color: '#000',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
    lineTitle: {
      position: 'absolute',
      height: '15pt',
      width: '200pt',
      backgroundColor:
        color === 1
          ? '#ffcf00'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#D4AC0D'
          : color === 4
          ? '#5CB265'
          : '#D80000',
      left: '15pt',
      top: '10pt',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.lineTitle}></View>
        <Text style={styles.title}>Award</Text>
      </View>
      {profile?.profileAwards?.map((ward: any) => (
        <View>
          <View style={styles.divDes}>
            <Text style={styles.textTitleDes}>{ward?.title}</Text>
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
