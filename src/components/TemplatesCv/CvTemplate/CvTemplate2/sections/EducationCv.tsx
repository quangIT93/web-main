import React from 'react';
import { Text, View, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import education from '../../images/template2/education.png';

import moment from 'moment';
// import List, { Item } from './List';
interface IEducation {
  color: any;
  fontSize: any;
  profile: any;
}
const Education: React.FC<IEducation> = (props) => {
  const { color, fontSize, profile } = props;
  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Montserrat Medium',
      fontSize: '13.67pt',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      marginLeft: '0.4cm',
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
    },
    textTitleLeft: {
      fontSize: '7.81pt',
      marginBottom: '0.37cm',
      fontFamily: 'Montserrat Medium',
      color: '#252525',
      width: '80%',
    },
    textTitleLeftTime: {
      fontSize: '7.81pt',
      marginBottom: '0.37cm',
      fontFamily: 'Montserrat Regular',
      color: '#252525',
    },
    textTitleRight: {
      fontSize: '10pt',
      marginBottom: '0.18cm',
      fontFamily: 'Montserrat Medium',
      color: '#252525',
      fontWeight: 'bold',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '8.3cm',
      whiteSpace: 'wrap',
      wordWrap: 'break-word',
    },
    textRight: {
      fontSize: '7.81pt',
      fontFamily: 'Montserrat Regular',
      flexGrow: 1,
      textAlign: 'justify',
    },
    itemRight: {
      // display: 'flex',
    },
    itemsText: {
      // display: 'flex',
    },
    paragraph: {
      // textIndent: 20,
      fontSize: '7.81pt', // Độ lệch của gạch đầu dòng
      fontFamily: 'Montserrat Regular',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '8.3cm',
      whiteSpace: 'wrap',
      wordWrap: 'break-word',
    },
    itemText: {
      display: 'flex',
      flexDirection: 'row',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '8.3cm',
      whiteSpace: 'wrap',
      wordWrap: 'break-word',
    },
    image: {
      width: '1cm',
      height: '1cm',
      padding: 6,
      border: `2px solid ${
        color === 1
          ? '#252525'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000'
      }`,
      borderRadius: '50%',
      backgroundColor:
        color === 1
          ? '#252525'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
    columnLeft: {
      width: '30%',
      // width: '60px',
    },
    columnRight: {
      width: '70%',
    },
  });

  const EducationCvEntry = () => (
    <View style={{ marginTop: '0.626cm' }}>
      {profile &&
        profile?.profilesEducations?.map((edu: any) => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                // border: '1px solid #ccc',
                // paddingBottom: '10mm',
              }}
            >
              <View style={styles.columnLeft}>
                <Text style={styles.textTitleLeft}>{edu?.companyName}</Text>
                <Text style={styles.textTitleLeftTime}>
                  {`${moment(edu?.startDate).format('YYYY')} - ${moment(
                    edu?.endDate,
                  ).format('YYYY')}`}
                </Text>
              </View>
              <View style={styles.columnRight}>
                <View style={styles.itemRight}>
                  <Text style={styles.textTitleRight}>{edu?.major}</Text>
                  <View style={styles.itemsText}>
                    <View style={styles.itemText}>
                      <Text style={styles.textRight}>
                        <Text style={styles.paragraph}>
                          {edu?.extraInformation}
                        </Text>
                      </Text>
                    </View>
                    ;
                  </View>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '0.226cm',
          marginTop: '1.53cm',
          overflow: 'hidden',
        }}
      >
        <Image style={styles.image} src={education} />

        <Text style={styles.title}>Education</Text>
      </View>
      <Svg height="1cm" width="100%">
        <Line
          x1="0"
          y1="0.5cm" // Đặt tọa độ y1 giữa trang
          x2="549" // Chiều rộng của trang A4
          y2="0.5cm" // Đặt tọa độ y2 giữa trang
          strokeWidth={2}
          stroke={
            color === 1
              ? '#252525'
              : color === 2
              ? '#0D99FF'
              : color === 3
              ? '#FBBC04'
              : color === 4
              ? '#5CB265'
              : '#D80000'
          }
        />
      </Svg>
      <EducationCvEntry />
    </View>
  );
};

export default Education;
