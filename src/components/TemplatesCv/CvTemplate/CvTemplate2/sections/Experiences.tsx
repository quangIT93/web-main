import React from 'react';
import { Text, View, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

// import List, { Item } from './List';

import experiences from '../../images/template2/experiences.png';
import moment from 'moment';
const lineHeightInCm = 1; // Chiều cao của đường ngang (1cm)
const lineHeightInPoints = lineHeightInCm * 28.3465; // 1cm ≈ 28.3465 points

interface IEducation {
  color: number;
  fontSize: any;
  profile: any;
}

const Experiences: React.FC<IEducation> = (props) => {
  const { color, fontSize, profile } = props;
  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Montserrat Medium',
      fontSize: fontSize - 10,
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
      fontSize: fontSize - 12,
      marginBottom: '0.37cm',
      fontFamily: 'Montserrat Medium',
      color: '#252525',
      width: '80%',
    },
    textTitleLeftTime: {
      fontSize: fontSize - 15,
      marginBottom: '0.37cm',
      fontFamily: 'Montserrat Regular',
      color: '#252525',
    },
    textTitleRight: {
      fontSize: fontSize - 12,
      marginBottom: '0.18cm',
      fontFamily: 'Montserrat Medium',
      color: '#252525',
      fontWeight: 'bold',
    },
    textRight: {
      fontSize: fontSize - 15,
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
      fontSize: fontSize - 15, // Độ lệch của gạch đầu dòng
      whiteSpace: 'nowrap',
      fontFamily: 'Montserrat Regular',
    },
    itemText: {
      display: 'flex',
      flexDirection: 'row',
    },
    image: {
      display: 'flex',
      alignItems: 'center',
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

  const ExperienceCvEntry = () => (
    <View style={{ marginTop: '0.626cm' }}>
      {profile &&
        profile?.profilesExperiences?.map((exp: any) => {
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
                <Text style={styles.textTitleLeft}>{exp?.companyName}</Text>
                <Text style={styles.textTitleLeftTime}>
                  {`${moment(exp?.startDate).format('YYYY')} - ${moment(
                    exp?.endDate,
                  ).format('YYYY')}`}
                </Text>
              </View>
              <View style={styles.columnRight}>
                <View style={styles.itemRight}>
                  <Text style={styles.textTitleRight}>{exp?.title}</Text>
                  <View style={styles.itemsText}>
                    <View style={styles.itemText}>
                      <Text style={styles.textRight}>
                        <Text style={styles.paragraph}>
                          {exp?.extraInformation}
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
        <Image style={styles.image} src={experiences} />

        <Text style={styles.title}>Experiences</Text>
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
      <ExperienceCvEntry />
    </View>
  );
};

export default Experiences;
