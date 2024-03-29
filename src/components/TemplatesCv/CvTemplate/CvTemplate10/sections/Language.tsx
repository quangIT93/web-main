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
      marginRight: -30,
    },
    divTitle: {
      backgroundColor:
        color === 1
          ? '#e5f6fe'
          : color === 2
            ? '#D6EAF8'
            : color === 3
              ? '#FCF3CF'
              : color === 4
                ? '#D5F5E3'
                : '#FADBD8',
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
          ? '#037385'
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
    divInfo: {
      marginTop: '10.408pt',
      marginLeft: '20pt',
    },
    TextTitleInfo: {
      fontSize: '16pt',
      width: 'auto',
      color:
        color === 1
          ? '#037385'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Petrona Bold',
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
          ? '#037385'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      margin: '7pt 0',
    },
    square: {
      marginLeft: '20pt',
      width: '10px',
      height: '10px',
      backgroundColor: color === 1
        ? '#037385'
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
        <Text style={styles.title}>Languages</Text>
      </View>
      {profile?.profilesLanguages?.map((language: any) => (
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
