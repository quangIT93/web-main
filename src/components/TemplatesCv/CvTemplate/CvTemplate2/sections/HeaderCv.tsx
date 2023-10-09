import React from 'react';

import { Image, Text, View, StyleSheet, Svg, Line } from '@react-pdf/renderer';

interface IHeaderCv {
  fontSize: number;
  color: number;
  profile: any;
}

const HeaderCv: React.FC<IHeaderCv> = (props) => {
  const { fontSize, color, profile } = props;
  const styles = StyleSheet.create({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      // backgroundColor: 'blue',
      width: '100%',
      flexDirection: 'row',
      height: 'auto',
    },
    name: {
      fontSize: '37pt',
      marginBottom: '0.6cm',
      fontFamily: 'Montserrat Regular',
      textTransform: 'uppercase',
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
    nameJob: {
      fontFamily: 'Montserrat Regular',
      fontSize: '9pt',
      margin: '0.6cm 0',
    },
  });

  return (
    <View style={styles.header}>
      <View
        style={{
          display: 'flex',
          height: '4.5cm',
          // backgroundColor: 'red',
          width: '70%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.name}>
          {profile?.name?.split(' ').length > 2
            ? profile?.name?.split(' ').slice(0, -2).join(' ')
            : profile?.name?.split(' ').slice(0, -1).join(' ')}
        </Text>
        <Text style={styles.name}>
          {profile?.name?.split(' ').length > 2
            ? profile?.name?.split(' ').slice(-2).join(' ')
            : profile?.name?.split(' ').slice(-1).join(' ')}
        </Text>
        <Svg height="1cm" width="100%">
          <Line
            x1="0"
            y1="0.5cm" // Đặt tọa độ y1 giữa trang
            x2="1000" // Chiều rộng của trang A4
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

        <Text style={styles.nameJob}>{profile?.jobTypeName}</Text>

        <Svg height="1cm" width="100%">
          <Line
            x1="0"
            y1="0.5cm" // Đặt tọa độ y1 giữa trang
            x2="1000" // Chiều rộng của trang A4
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
      </View>
      <Image
        source={
          profile.avatarPath
            ? profile.avatarPath
            : // : './images/image 50.png'
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.alongwalker.co%2Fda-co-cach-chup-mat-dep-than-thanh-cho-buc-hinh-long-lanh-chang-kem-idol-s146496.html&psig=AOvVaw150dMJBBupQ3IgBEJoBlHI&ust=1696907177877000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKD61_3954EDFQAAAAAdAAAAABAE'
        }
        style={{ width: '5cm', height: '4.5cm', objectFit: 'cover' }}
      />
      ;
      {/* <View style={{ width: '5cm', height: '4.5cm' }}>
    </View> */}
    </View>
  );
};

export default HeaderCv;
