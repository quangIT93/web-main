import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

interface ICvLanguage {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Language: React.FC<ICvLanguage> = (props) => {
  const { color, profile, fontSize, profileMore } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },

    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '180pt',
      color:
        color === 1
          ? '#377a40'
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
    divInfo: {
      marginTop: '10.408pt',
      marginLeft: '20pt',
    },
    TextTitleInfo: {
      fontSize: '16pt',
      width: 'auto',
      color:
        color === 1
          ? '#377a40'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Fahkwang Bold',
      fontWeight: 'extrabold',
    },
    TextInfo: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
    },
    BorderLine: {
      width: '80px',
      height: '4pt',
      backgroundColor:
        color === 1
          ? '#f0f8eb'
          : color === 2
            ? '#D9EFFE'
            : color === 3
              ? '#FBF2DA'
              : color === 4
                ? '#E2FFE5'
                : '#FEE1E1',
      margin: '7pt 0',
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Languages</Text>
      </View>
      {profileMore?.profilesLanguages?.map((language: any) => (
        <View style={styles.divInfo}>
          <View>
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
