import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvReference {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Reference: React.FC<ICvReference> = (props) => {
  const { color, profile, fontSize, profileMore } = props;

  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    divTitle: {
      marginRight: '20pt',
      width: '180pt',
      marginLeft: '20pt',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5pt',
      borderBottomWidth: '1pt',
      borderBottomColor: color === 1
        ? '#437901'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
    },
    title: {
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color:
        color === 1
          ? '#437901'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      letterSpacing: '4pt',
      fontFamily: 'Fahkwang Bold',
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
      fontFamily: 'Fahkwang Medium',
    },
    divWrapItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12pt',
    },
    square: {
      width: '10px',
      height: '10px',
      backgroundColor: '#FE6829'
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.square} />
        <Text style={styles.title}>Reference</Text>
      </View>
      <View style={styles.divWrapItem}>
        {profileMore?.profilesReferences?.map((reference: any) => (
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
      </View>
    </View>
  );
};

export default Reference;
