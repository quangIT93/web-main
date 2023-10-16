import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

interface ICvEducation {
  color: any;
  profile: any;
}

const Languages: React.FC<ICvEducation> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    content: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      // gap: '20.712pt',
    },
    language: {
      display: 'flex',
      flexDirection: 'column',
      // gap: '8pt',
      marginBottom: 10,
      // border: '1px solid red'
    },
    top: {
      marginBottom: '8.17pt',
    },
    bot: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      // marginLeft: '0.658cm'
    },
    line: {
      width: '56.84pt',
      height: '4px',
      backgroundColor:
        color === 1
          ? '#404BA0'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
      borderRadius: '2px',
    },
    name: {
      fontFamily: 'Montserrat Regular',
      fontSize: 9,
      textAlign: 'justify',
      color: '#777878',
    },
    detail: {
      fontFamily: 'Montserrat Regular',
      fontSize: 9,
      textAlign: 'justify',
      width: '100%',
      color: '#777878',
      // border: '1px solid red'
    },
    title: {
      fontFamily: 'Montserrat Bold',
      fontSize: 14,
      marginBottom: '14.469pt',
      width: '100%',
      textTransform: 'uppercase',
      color:
        color === 1
          ? '#505050'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
    languageTop: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '9.702pt',
      gap: '14.426pt',
      border: '1px solid #ccc',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Languages</Text>
        {profile?.profilesLanguages &&
          profile?.profilesLanguages?.map((item: any, i: any) => {
            return (
              <View style={styles.language} key={i}>
                <View style={styles.languageTop}>
                  <Text style={styles.name}>{item?.languageName}</Text>
                  <View style={styles.line}></View>
                </View>
                <Text style={styles.detail}>{item?.dataLevel?.data}</Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default Languages;
