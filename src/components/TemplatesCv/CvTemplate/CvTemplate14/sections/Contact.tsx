import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

interface ICvContact {
  color: any;
  profile: any;
  fontSize: any;
}
const Contact: React.FC<ICvContact> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      // marginRight: -25,
    },
    divWrapInfo: {
      border: `1px solid '#000000'`,
      maxWidth: '100%',
      padding: '13.021pt',
      display: 'flex',
      flexDirection: 'column',
      gap: '6.762pt',
      borderRadius: '8px'
    },
    divInfo: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
      maxWidth: '110pt',
    },
    textInfo: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
      maxWidth: '110pt',
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
