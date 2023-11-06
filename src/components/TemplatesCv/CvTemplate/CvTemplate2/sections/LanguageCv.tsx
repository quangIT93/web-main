import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Circle,
  Line,
} from '@react-pdf/renderer';

// import List, { Item } from './List';

import skill from '../../images/template2/skill.png';

interface ISkill {
  color: number;
  fontSize: any;
  profile: any;
}

const LanguageCv: React.FC<ISkill> = (props) => {
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
    text: {
      // fontFamily: 'Lato',
      fontSize: fontSize - 15,
      marginBottom: '1.53cm',
      fontFamily: 'Montserrat Regular',
    },
    textSkillName: {
      // fontFamily: 'Lato',
      fontSize: fontSize - 12,
      fontFamily: 'Montserrat Medium',
      wordWrap: 'break-word',
    },
    textSkill: {
      // fontFamily: 'Lato',
      fontSize: fontSize - 15,
      fontFamily: 'Montserrat Regular',
      wordWrap: 'break-word',
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
  });

  const SkillsCvEntry = () => (
    <View style={{ marginTop: '0.626cm' }}>
      {profile?.profilesLanguages?.map((lang: any) => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '2mm',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: '1mm',
            }}
          >
            <Svg viewBox="0 0 2 2" style={{ width: 10 }}>
              <Circle
                cx="1"
                cy="1"
                r="0.5"
                fill={
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
                stroke="none"
              />
            </Svg>
            <Text style={styles.textSkillName} wrap={true}>
              {lang.languageName}
            </Text>
          </View>
          {/* <Text style={styles.textSkill} wrap={true}>
            {' '}
            -{' '}
          </Text> */}
          <View style={{ marginLeft: '3mm' }}>
            <Text style={styles.textSkill} wrap={true}>
              {lang.dataLevel.data}
            </Text>
          </View>
        </View>
      ))}
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
        <Image style={styles.image} src={skill} />

        <Text style={styles.title}>Languages</Text>
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
      <SkillsCvEntry />
    </View>
  );
};

export default LanguageCv;
