import React from 'react';
import { Text, View, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

// import List, { Item } from './List';

import profile from '../../images/template2/profile.png';

interface IProfileCv {
  color: number;
  fontSize: number;
}

const ProfileCv: React.FC<IProfileCv> = (props) => {
  const { color, fontSize } = props;
  console.log('color: ', color);

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
    text: {
      fontSize: '7.81pt',
      // marginBottom: 10,
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

  const ProfileEntry = ({ introduce }: { introduce: string }) => (
    <View
      style={{
        marginTop: '0.626cm',
        flexGrow: 1,
        textAlign: 'justify', // Căn đều văn bản
      }}
    >
      <Text style={styles.text}>{introduce}</Text>
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
        <Image style={styles.image} src={profile} />
        <Text
          // style={{
          //   marginLeft: '0.4cm',
          //   fontSize: '13.67pt',
          //   fontFamily: 'Montserrat Bold',
          // }}

          style={styles.title}
        >
          Profile
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
        <ProfileEntry
          introduce="
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio provident officia debitis. Ad saepe nam culpa ipsum rem earum enim adipisci minima alias illo blanditiis minus ut, quaerat, recusandae pariatur.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio provident officia debitis. Ad saepe nam culpa ipsum rem earum enim adipisci minima alias illo blanditiis minus ut, quaerat, recusandae pariatur.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio provident officia debitis. Ad saepe nam culpa ipsum rem earum enim adipisci minima alias illo blanditiis minus ut, quaerat, recusandae pariatur.
        Lorem ipsum dolor, sit amet consectetur adipisici
        Lorem ipsum dolor, sit amet consectetur adipisici
        Lorem ipsum dolor, sit amet consectetur adipisici
        Lorem ipsum dolor, sit amet consectetur adipisici
        Lorem ipsum dolor, sit amet consectetur adipisici
        "
        />
      </View>
    </View>
  );
};

export default ProfileCv;
