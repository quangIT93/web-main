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
      width: '280pt',
      marginLeft: '20pt',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5pt'
    },
    title: {
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
      letterSpacing: '4pt',
      fontFamily: 'Fahkwang Bold',
      fontWeight: 'extrabold',
    },
    divDes: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '180pt',
    },
    divName: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '180pt',
    },
    divPhone: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '180pt',
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
      borderRadius: '50%',
      border: `2px solid ${color === 1
        ? '#377a40'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
        }`,
      backgroundColor: color === 1
        ? '#b4d9a1'
        : '#ffffff',
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
        {/* <View
          style={{
            height: '12pt',
            width: '60pt',
            display: 'flex',
            alignItems: 'center',
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
          }}
        ></View> */}
      </View>
    </View>
  );
};

export default Reference;
