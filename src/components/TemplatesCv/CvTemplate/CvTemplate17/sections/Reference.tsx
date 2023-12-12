import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvReference {
  color: any;
  profile: any;
  fontSize: any;
}
const Reference: React.FC<ICvReference> = (props) => {
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
    divName: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    divPhone: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
    divWrapItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12pt',
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
      top: '5pt',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.lineTitle}></View>
        <Text style={styles.title}>Reference</Text>
      </View>
      <View style={styles.divWrapItem}>
        {profile?.profilesReferences?.map((reference: any) => (
          <View>
            <View style={styles.divName}>
              <Text style={styles.textDes}>{reference?.fullName}</Text>
            </View>
            <View style={styles.divPhone}>
              <Text style={styles.textDes}>{reference?.phone}</Text>
            </View>
            <View style={styles.divDes}>
              <Text style={styles.textDes}>{reference?.description}</Text>
            </View>
          </View>
        ))}
        <View
          style={{
            height: '12pt',
            width: '60pt',
            display: 'flex',
            alignItems: 'center',
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
          }}
        ></View>
      </View>
    </View>
  );
};

export default Reference;
