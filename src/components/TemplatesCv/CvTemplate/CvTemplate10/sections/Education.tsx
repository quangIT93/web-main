import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvHeader {
  color: any;
  profile: any;
  fontSize: any;
}
const Education: React.FC<ICvHeader> = (props) => {
  const styles = StyleSheet.create({
    container: {
      marginLeft: -30,
    },
    divTitle: {
      backgroundColor: '#e5f6fe',
    },
    title: {
      marginLeft: '45.839pt',
      padding: '9.209pt 0',
    },
    divInfo: {},
    leftInfo: {},
    rightInfo: {},
  });
  const { color, profile, fontSize } = props;

  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <Text style={styles.title}>Education</Text>
      </View>
      <View style={styles.divInfo}>
        <View style={styles.leftInfo}></View>
        <View style={styles.rightInfo}></View>
      </View>
    </View>
  );
};

export default Education;
