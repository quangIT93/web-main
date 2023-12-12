import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import moment from 'moment';

interface ICvProfile {
  color: any;
  profile: any;
  fontSize: any;
}
interface ICvActivities {
  color: any;
  profile: any;
  fontSize: any;
}
const Activities: React.FC<ICvActivities> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginLeft: -25,
    },
    divTitle: {
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
      position: 'relative',
    },
    title: {
      marginLeft: '45.839pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      color: '#000',
      fontFamily: 'Petrona Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divInfo: {
      marginLeft: '45.839pt',
      marginTop: '10.17pt',
      display: 'flex',
      flexDirection: 'row',
    },
    leftInfo: {
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    rightInfo: {
      width: '60%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    textLeft: {
      fontSize: '11pt',
      color: '#000',
      wordwrap: 'break-word',
      textAlign: 'justify',
      fontFamily: 'Petrona Bold',
      marginRight: '10pt',
    },
    textTitleRight: {
      fontSize: '11pt',
      color: '#000',
      fontFamily: 'Petrona Bold',
    },
    divTextTitleRight: {
      maxWidth: '180pt',
    },
    divTextRight: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4.028pt',
      maxWidth: '180pt',
    },
    textRight: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
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
      left: '40pt',
      top: '5pt',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.lineTitle}></View>
        <Text style={styles.title}>Activities</Text>
      </View>
      {profile?.profileActivities?.map((activities: any) => (
        <View style={styles.divInfo}>
          <View style={styles.leftInfo}>
            <Text style={styles.textLeft}>
              {' '}
              {moment(activities?.startDate).format('YYYY')}
              {'-'}
              {moment(activities?.endDate).format('YYYY')}
            </Text>
            <Text style={styles.textLeft}>{activities?.title}</Text>
          </View>
          <View style={styles.rightInfo}>
            <View style={styles.divTextTitleRight}>
              <Text style={styles.textLeft}>{activities?.organization}</Text>
            </View>
            <View style={styles.divTextRight}>
              <Text style={styles.textRight}>{activities?.description}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Activities;
