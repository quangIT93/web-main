import React from 'react';
import { Text, View, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import { ContactCvIcon } from '#components/Icons/iconCv';
// import List, { Item } from './List';

import contact from '../../images/template2/contact.png';
interface ISkills {
  fontSize: any;
  color: number;
  profile: any;
}

const svgToImageObject = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 76.03 109.83"
  >
    <defs>
      <style>fill:'#3b3b3b'</style>
    </defs>
    <title>đt</title>
    <path
      className="cls-1"
      d="M128.72,152.76H80.05a13.69,13.69,0,0,1-13.67-13.68V56.61A13.68,13.68,0,0,1,80.05,42.93h48.67A13.69,13.69,0,0,1,142.4,56.61v82.47A13.69,13.69,0,0,1,128.72,152.76ZM80.05,48.29a8.32,8.32,0,0,0-8.31,8.32v82.47a8.32,8.32,0,0,0,8.31,8.31h48.67a8.32,8.32,0,0,0,8.32-8.31V56.61a8.33,8.33,0,0,0-8.32-8.32Z"
      transform="translate(-66.38 -42.93)"
    />
    <rect className="cls-1" x="30.04" y="92.3" width="15.94" height="5.36" />
    <path
      className="cls-1"
      d="M104.39,64.05A4.61,4.61,0,1,1,109,59.44,4.6,4.6,0,0,1,104.39,64.05Z"
      transform="translate(-66.38 -42.93)"
    />
  </svg>
);

const ContactCv: React.FC<ISkills> = (props) => {
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
      // fontFamily: "Mon"
      // marginBottom: 10,
    },
    text: {
      fontSize: fontSize - 15,
      // marginBottom: '1.53cm',
      fontFamily: 'Montserrat Regular',
    },
    titleItem: {
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
      fontSize: fontSize - 12,
      fontFamily: 'Montserrat Medium',
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

  const ContactCvEntry = () => (
    <View style={{ marginTop: '0.626cm' }}>
      <View style={{ marginBottom: '2mm' }}>
        <Text style={styles.titleItem}>Address:</Text>
        <Text style={styles.text}>{profile?.addressText?.fullName}</Text>
      </View>
      <View style={{ marginBottom: '2mm' }}>
        <Text style={styles.titleItem}>Number Phone:</Text>
        <Text style={styles.text}>{profile?.phone}</Text>
      </View>

      <View style={{ marginBottom: '2mm' }}>
        <Text style={styles.titleItem}>Mail:</Text>
        <Text style={styles.text}>{profile?.email}</Text>
      </View>
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
        <Image style={styles.image} src={contact} />

        <Text
          // style={{
          //   marginLeft: '0.4cm',
          //   fontSize: '13.67pt',
          //   textTransform: 'uppercase',
          //   letterSpacing: '1px',
          //   fontFamily: 'Montserrat Medium',
          // }}

          style={styles.title}
        >
          Contact
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
      <ContactCvEntry />
    </View>
  );
};

export default ContactCv;
