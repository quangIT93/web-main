import React from 'react';
import { Text, View, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import fb from '../../images/fb.png';
import ins from '../../images/insta.png';
import linked from '../../images/in.png';
import twit from '../../images/twitter.png';

interface ISocial {
  color: number;
  fontSize: any;
}

const SocialCv: React.FC<ISocial> = (props) => {
  const styles = StyleSheet.create({
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: '0.1cm',
      width: '100%',
      // height: ' 100%',
      justifyContent: 'space-between',
    },
    icon4: {
      height: '0.465cm',
      objectFit: 'contained',
    },
  });

  const SocialCvEntry = () => {
    return (
      <View
        style={{
          marginTop: '0.626cm',
          display: 'flex',
          flexDirection: 'row',
          // backgroundColor: 'red',
          // height: '2cm',
          alignItems: 'center',
        }}
      >
        <View style={styles.item}>
          <View style={{ paddingLeft: 6 }}>
            <Image style={styles.icon4} src={twit} />
          </View>
          <View>
            <Image style={styles.icon4} src={fb} />
          </View>
          <View>
            <Image style={styles.icon4} src={linked} />
          </View>
          <View>
            <Text
              style={{
                fontSize: '7.81pt',
                fontFamily: 'Montserrat Regular',
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
              }}
            >
              hijob.site
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const { color, fontSize } = props;
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '0.226cm',
          // marginTop: '1.53cm',
          marginTop: '0.3cm',

          overflow: 'hidden',
        }}
      ></View>

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
      <SocialCvEntry />
    </View>
  );
};

export default SocialCv;
