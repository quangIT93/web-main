import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

interface ICvLanguage {
  color: any;
  profile: any;
  fontSize: any;
}
const Language: React.FC<ICvLanguage> = (props) => {
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    divTitle: {
      backgroundColor: '#e5f6fe',
    },
    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color: '#34899d',
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
      color: '#34899d',
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
      backgroundColor: '#34899d',
      margin: '7pt 0',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <Text style={styles.title}>Languages</Text>
      </View>
      <View style={styles.divInfo}>
        <View>
          <Text style={styles.TextTitleInfo}>English</Text>
        </View>
        <View style={styles.BorderLine}></View>
        <View>
          <Text style={styles.TextInfo}>Trình độ trung cấp</Text>
        </View>
      </View>
    </View>
  );
};

export default Language;
