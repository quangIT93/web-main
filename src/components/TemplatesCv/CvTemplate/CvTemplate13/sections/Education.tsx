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
      backgroundColor: 'transparent',
      // backgroundColor: 'red',
      zIndex: 1,
      position: 'relative',
    },
    divTitle: {
      marginRight: '20pt',
      width: '280pt',
      position: 'relative',
      backgroundColor: 'transparent',
      marginLeft: '45.839pt',
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
      // backgroundColor: '#8dc5ff',
      // backgroundColor:
      //   color === 1
      //     ? '#c5dff8'
      //     : color === 2
      //     ? '#5DADE2'
      //     : color === 3
      //     ? '#FCF3CF'
      //     : color === 4
      //     ? '#D5F5E3'
      //     : '#FADBD8',

      width: '100%',
      zIndex: '0',
    },
    lineTitle: {
      position: 'absolute',
      backgroundColor:
        color === 1
          ? '#c5dff8'
          : color === 2
            ? '#5DADE2'
            : color === 3
              ? '#FCF3CF'
              : color === 4
                ? '#D5F5E3'
                : '#FADBD8',
      height: '10.977pt',
      width: '160.595pt',
      left: '40',
      top: '18',
      zIndex: '1',
    },
    divInfo: {
      marginLeft: '45.839pt',
      marginTop: '10.17pt',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
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
          ? '#377a40'
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
      // maxWidth: '180pt',
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
      <View>
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
                <Text style={styles.textLeft}>{education?.major}</Text>
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
