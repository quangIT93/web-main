import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
import moment from 'moment';
interface ICvHeader {
  color: any;
  profile: any;
  fontSize: any;
}
const Experience: React.FC<ICvHeader> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginLeft: -25,
    },
    divTitle: {},
    title: {
      marginLeft: '45.839pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      color:
        color === 1
          ? '#000000'
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
      color:
        color === 1
          ? '#000000'
          : color === 2
            ? '#000000'
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
          ? '#000000'
          : color === 2
            ? '#000000'
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
      maxWidth: '180pt',
    },
    textRight: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.divTitle}>
          <Text style={styles.title}>Experience</Text>
        </View>
        {profile?.profilesExperiences?.map((Experience: any) => (
          <View style={styles.divInfo}>
            <View style={styles.leftInfo}>
              <Text style={styles.textLeft}>
                {moment(Experience?.startDate).format('YYYY')}
                {'-'}
                {moment(Experience?.endDate).format('YYYY')}
              </Text>
              <Text style={styles.textLeft}>{Experience?.title}</Text>
            </View>
            <View style={styles.rightInfo}>
              <View style={styles.divTextTitleRight}>
                <Text style={styles.textLeft}>{Experience?.companyName}</Text>
              </View>
              <View style={styles.divTextRight}>
                <Text style={styles.textRight}>
                  {Experience?.extraInformation}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Experience;
