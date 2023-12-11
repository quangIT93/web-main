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
const Education: React.FC<ICvHeader> = (props) => {
  const { color, profile, fontSize, profileMore } = props;
  const styles = StyleSheet.create({
    container: {
      marginLeft: -25,
    },
    content: {
      borderBottom: `2px solid ${color === 1
        ? '#09009B'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
        }`,
      marginLeft: '45.839pt',
      paddingBottom: '15.362pt',
    },
    divTitle: {
      marginRight: '20pt',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5pt',
    },
    title: {
      padding: '9.209pt 0',
      fontSize: '16pt',
      color:
        color === 1
          ? '#09009B'
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
      marginTop: '10.17pt',
      display: 'flex',
      flexDirection: 'row',
      gap: '10pt',
    },
    leftInfo: {
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    rightInfo: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    textLeft: {
      fontSize: '11pt',
      color:
        color === 1
          ? '#09009B'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Fahkwang Bold',
      wordwrap: 'break-word',
      // textAlign: 'justify',
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
      width: '100%'
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
      backgroundColor: color === 1
        ? '#09009B'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.divTitle}>
          <View style={styles.square} />
          <Text style={styles.title}>Educations</Text>
        </View>

        {profileMore?.profilesEducations?.map((education: any) => {
          return (
            <View style={styles.divInfo}>
              <View style={styles.leftInfo}>
                <Text style={styles.textLeft}>
                  {moment(education?.startDate).format('YYYY')}
                  {'-'}
                  {moment(education?.endDate).format('YYYY')}
                </Text>
                <Text style={styles.textRight}>{education?.major}</Text>
              </View>
              <View style={styles.rightInfo}>
                <View style={styles.divTextTitleRight}>
                  <Text style={styles.textLeft}>{education?.companyName}</Text>
                </View>
                <View style={styles.divTextRight}>
                  <Text style={styles.textRight}>
                    {education?.extraInformation}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Education;
