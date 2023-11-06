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
      marginRight: -25,
    },
    divWrapInfo: {
      border: `1px solid ${
        color === 1
          ? '#e5f6fe'
          : color === 2
          ? '#D6EAF8'
          : color === 3
          ? '#FCF3CF'
          : color === 4
          ? '#D5F5E3'
          : '#FADBD8'
      }`,
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
  });
  return (
    <View style={styles.container}>
      <View style={styles.divWrapInfo}>
        <View style={styles.divInfo}>
          <Text>0911878031</Text>
        </View>
        <View style={styles.divInfo}>
          <Text>quangbk54@gmail.com</Text>
        </View>
        <View style={styles.divInfo}>
          <Text>Thành Phố Hồ Chí Minh</Text>
        </View>
      </View>
    </View>
  );
};

export default Contact;
