import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

interface ICvLanguage {
  color: any;
  profile: any;
  fontSize: any;
}
const Language: React.FC<ICvLanguage> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
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
      color:
        color === 1
          ? '#000000'
          : color === 2
          ? '#ffffff'
          : color === 3
          ? '#000000'
          : color === 4
          ? '#ffffff'
          : '#ffffff',
      fontFamily: 'Petrona Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divInfo: {
      marginTop: '10.408pt',
      marginLeft: '20pt',
    },
    DivTextTitleInfo: {
      // marginLeft: '20pt',
      // marginTop: '9.338pt',
      width: '137pt',
    },
    TextTitleInfo: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
      color: '#000',
      fontWeight: 'extrabold',
    },
    TextInfo: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
    BorderLine: {
      width: '80px',
      height: '4pt',
      backgroundColor:
        color === 1
          ? '#F8DE72'
          : color === 2
          ? '#D6EAF8'
          : color === 3
          ? '#FCF3CF'
          : color === 4
          ? '#D5F5E3'
          : '#FADBD8',
      margin: '7pt 0',
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
        <Text style={styles.title}>Languages</Text>
      </View>
      {profile?.profilesLanguages?.map((language: any) => (
        <View style={styles.divInfo}>
          <View style={styles.DivTextTitleInfo}>
            <Text style={styles.TextTitleInfo}>{language?.languageName}</Text>
          </View>
          <View style={styles.BorderLine}></View>
          <View>
            <Text style={styles.TextInfo}>{language?.dataLevel?.data}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Language;
