import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
import moment from 'moment';
interface ICvHeader {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Experience: React.FC<ICvHeader> = (props) => {
  const { color, profile, fontSize, profileMore } = props;

  const styles = StyleSheet.create({
    container: {
      marginLeft: -25,
    },
    divTitle: {
      marginRight: '20pt',
      width: '250pt',
      marginLeft: '45.839pt',
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
      fontFamily: 'Fahkwang Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divInfo: {
      marginLeft: '45.839pt',
      marginTop: '10.17pt',
      display: 'flex',
      flexDirection: 'row',
      gap: '10pt',
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
          ? '#437901'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Fahkwang Bold',
      wordwrap: 'break-word',
      textAlign: 'justify',
    },
    textTitleRight: {
      fontSize: '11pt',
      color:
        color === 1
          ? '#252525'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Fahkwang Bold',
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
      // wordwrap: 'break-all',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
    },
    square: {
      width: '10px',
      height: '10px',
      backgroundColor: '#FE6829'
    }
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.divTitle}>
          <View style={styles.square} />
          <Text style={styles.title}>Experiences</Text>
        </View>

        {profileMore?.profilesExperiences?.map((Experience: any) => (
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
