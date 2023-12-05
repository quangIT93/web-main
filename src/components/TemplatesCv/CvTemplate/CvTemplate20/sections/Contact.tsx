import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
interface ICvContact {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Contact: React.FC<ICvContact> = (props) => {
  const { color, profile, fontSize, profileMore } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
      border: `1px solid ${color === 1
          ? '#437901'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000'
        }`,
      paddingBottom: '17.404pt',
    },
    divWrapInfo: {
      marginLeft: '20pt',
      width: '137pt',
      padding: '13.021pt',
      display: 'flex',
      flexDirection: 'column',
      gap: '6.762pt',
    },
    divInfo: {
      fontSize: '11pt',
      //   wordwrap: 'break-all',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
      color: '',
    },
    textInfo: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
      width: '110pt',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divWrapInfo}>
        <View style={styles.divInfo}>
          <Text style={styles.textInfo}>{profile?.phone}</Text>
        </View>
        <View style={styles.divInfo}>
          <Text style={styles.textInfo}>{profile?.email}</Text>
        </View>
        <View style={styles.divInfo}>
          <Text style={styles.textInfo}>{profile?.addressText?.fullName}</Text>
        </View>
      </View>
    </View>
  );
};

export default Contact;
