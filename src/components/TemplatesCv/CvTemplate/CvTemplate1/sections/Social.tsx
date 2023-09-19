import React from 'react';
import { Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

import List, { Item } from './List';

import fb from '../../images/fb.png';
import ins from '../../images/insta.png';
import linked from '../../images/in.png';
import twit from '../../images/twitter.png';

interface ICvEducation {
  color: any;
  profile: any;
}

const Social: React.FC<ICvEducation> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      // marginBottom: 10,
    },
    content: {
      width: '8.78cm',
      height: '2.241cm',
      padding: ' 0.291cm 0.607cm',
      backgroundColor: '#D0E3FF',
      // border: '1px solid red',
      display: 'flex',
      flexDirection: 'column',
    },
    line: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      // border: '1px solid pink',
      gap: '0.985cm',
      // height: '50%',
      height: '100%',
    },
    item1: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.345cm',
      width: '50%',
      height: ' 100%',
      borderBottom: '1px solid #282828',
    },
    item2: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.345cm',
      width: '50%',
      height: ' 100%',
    },
    icon1: {
      height: '0.333cm',
      objectFit: 'contained',
    },
    icon2: {
      height: '0.422cm',
      objectFit: 'contained',
    },
    icon3: {
      height: '0.386cm',
      objectFit: 'contained',
    },
    icon4: {
      height: '0.465cm',
      objectFit: 'contained',
    },
    text: {
      fontFamily: 'Montserrat Regular',
      fontSize: 8,
      color: '#000000',
      textDecoration: 'none'
      // letterSpacing: '2px',
    },
    title: {
      fontFamily: 'Montserrat Bold',
      fontSize: 12,
      letterSpacing: '2px',
      marginBottom: '0.472cm',
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
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social</Text>

      <View style={styles.content}>
        {/* <View style={styles.line}>
          <View style={styles.item1}>
            <Image style={styles.icon1} src={twit} />
            <Text style={styles.text}>dangvanabc</Text>
          </View>
          <View style={styles.item1}>
            <Image style={styles.icon2} src={ins} />
            <Text style={styles.text}>dangvanabc</Text>
          </View>
        </View> */}
        <View style={styles.line}>
          <View style={styles.item2}>
            <Image style={styles.icon3} src={linked} />
            <Link
              style={styles.text}
              src={profile?.linkedin}
            >
              www.linkedin.com
            </Link>
          </View>
          <View style={styles.item2}>
            <Image style={styles.icon4} src={fb} />
            <Link
              style={styles.text}
              src={profile?.facebook}
            >
              www.facebook.com
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Social;
