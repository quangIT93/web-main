import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvHobies {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Hobies: React.FC<ICvHobies> = (props) => {
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
      fontFamily: 'Fahkwang Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divDes: {
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
        <Text style={styles.title}>Hobies</Text>
      </View>

      <View style={styles.divDes}>
        <Text style={styles.textDes}>
          {profileMore?.profileHobbies?.description}
        </Text>
      </View>
    </View>
  );
};

export default Hobies;
