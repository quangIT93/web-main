import React from 'react';
import { Text, View, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

// import List, { Item } from './List';

import profileImage from '../../images/template2/profile.png';

interface IHobbieCv {
  color: number;
  fontSize: number;
  profile: any;
}

const HobbieCv: React.FC<IHobbieCv> = (props) => {
  const { color, fontSize, profile } = props;

  const styles = StyleSheet.create({
    title: {
      // fontFamily: 'Lato Bold',
      fontSize: '13.67pt',
      fontFamily: 'Montserrat Medium',
      marginLeft: '0.4cm',
      textTransform: 'uppercase',
      letterSpacing: '1px',
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
      // fontFamily: "Mon"
      // marginBottom: 10,
    },
    wrapText: {
      marginTop: '0.626cm',
      flexGrow: 1,
      textAlign: 'justify',
      wordWrap: 'break-word',
      width: '100%',
      overflow: 'hidden',
      // Cho phép xuống dòng// Ẩn nội dung vượt quá chiều rộng
    },
    text: {
      fontSize: '7.81pt',
      // marginBottom: 10,
      wordWrap: 'break-word',
      width: '100%',
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
  });

  const ProfileEntry = () => (
    <View style={styles.wrapText}>
      <Text style={styles.text}>{profile?.profileHobbies?.description}</Text>
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
        }}
      >
        {/* <Image src="./images/image 51.png" style={styles.image} /> */}
        <Image style={styles.image} src={profileImage} />
        <Text
          // style={{
          //   marginLeft: '0.4cm',
          //   fontSize: '13.67pt',
          //   fontFamily: 'Montserrat Bold',
          // }}

          style={styles.title}
        >
          Hobbies
        </Text>
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
      <View style={{ flexDirection: 'row', fontFamily: 'Montserrat Regular' }}>
        <ProfileEntry />
      </View>
    </View>
  );
};

export default HobbieCv;
