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
      marginLeft: -30,
    },
    divTitle: {
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5pt',
      marginRight: -10
    },
    title: {
      padding: '9.209pt 0',
      fontSize: '16pt',
      color:
        color === 1
          ? '#037385'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
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
      width: '25%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    rightInfo: {
      width: '75%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    textLeft: {
      fontSize: '11pt',
      color:
        color === 1
          ? '#037385'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      wordwrap: 'break-word',
      textAlign: 'justify',
      fontFamily: 'Petrona Bold',
      marginRight: '10pt',
    },
    textTitleRight: {
      fontSize: '11pt',
      color:
        color === 1
          ? '#037385'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Petrona Bold',
    },
    divTextTitleRight: {
      maxWidth: '180pt',
    },
    divTextRight: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4.028pt',
      // maxWidth: '180pt',
    },
    textRight: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
    square: {
      marginLeft: '45.839pt',
      width: '10px',
      height: '10px',
      backgroundColor: color === 1
        ? '#037385'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.square} />
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
