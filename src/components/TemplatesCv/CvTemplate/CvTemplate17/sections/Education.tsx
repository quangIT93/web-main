import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
import moment from 'moment';
interface ICvHeader {
  color: any;
  profile: any;
  fontSize: any;
}
const Education: React.FC<ICvHeader> = (props) => {
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
      color:
        color === 1
          ? '#000000'
          : color === 2
          ? '#000000'
          : color === 3
          ? '#000000'
          : color === 4
          ? '#000000'
          : '#000000',
      fontFamily: 'Petrona Bold',
      letterSpacing: '4pt',
      fontWeight: 'bold',
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
      <View>
        <View style={styles.divTitle}>
          <View style={styles.lineTitle}></View>
          <Text style={styles.title}>Education</Text>
        </View>
        {profile?.profilesEducations?.map((education: any) => (
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
        ))}
      </View>
    </View>
  );
};

export default Education;
