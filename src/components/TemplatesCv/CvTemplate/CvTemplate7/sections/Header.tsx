import React, { useEffect } from 'react';

import { Image, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import profileApi from 'api/profileApi';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
interface ICvHeader {
  color: any;
  profile: any;
}

const Header: React.FC<ICvHeader> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: '15.468pt'
    },
    content: {
      width: '100%',
      // height: '100%',
      // position: 'relative',

      // paddingTop: '47,291pt',
      // paddingLeft: '103.428pt',
      // border: '1px solid green'
    },
    name: {
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
      // border: '1px solid red',
      width: '100%',
      marginTop: '7.383pt',
      marginBottom: '9.638pt',
    },
    lastName: {
      fontSize: 33,
      fontFamily: 'Montserrat Regular',
      width: '100%',
      letterSpacing: '2px',
      // background: 'red',
      // border: '1px solid black',
    },
    subtitle: {
      fontSize: 9,
      justifySelf: 'flex-end',
      fontFamily: 'Montserrat Regular',
      color: '#1B1212',
      textDecoration: 'none',
    },
    bigTitle: {
      fontFamily: 'Montserrat Regular',
      fontSize: 10,
      letterSpacing: '4px',
      color: '#1B1212',
      marginTop: '12.34px',
      textTransform: 'uppercase',
    },
    topLeftDiv: {
      // marginTop: '2.066cm',
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      // gap: '0.25cm',
      // border: '1px solid green',
      width: '100%',
      color: "#282828"
    },
    contact: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.284cm',
      fontSize: '7px',
      fontFamily: 'Montserrat Regular',
    },
    leftDiv: {
      width: '100%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: '20.229pt',
      zIndex: 1,
    },
    rightDiv: {
      position: 'absolute',
      top: '-1.2cm',
      right: 0,
      width: '237.179pt',
      height: '221.179pt',
      backgroundColor: '#282828',
      borderBottomRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      zIndex: 2,
    },
    avatarDiv: {
      // position: 'absolute',
      // top: '1.66cm',
      // right: '4.023cm',
      width: '101.260pt',
      height: '101.260pt',
      // backgroundColor: '#FFFFFF',
      // border: '1px solid #AAAAAA',
      borderRadius: '50%',
      backgroundColor: '#E6E7E8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '14.596pt'
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    language: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      bottom: 2,
      left: '55%',
    },
    languageTitle: {
      fontFamily: 'Montserrat Bold',
      fontSize: 12,
      letterSpacing: '2px',
    },
    languageDetail: {
      marginTop: '0.319cm',
      display: 'flex',
      flexDirection: 'row',
    },
    languageDetailLeft: {
      fontFamily: 'Montserrat Regular',
      fontSize: 9,
      textTransform: 'uppercase',
    },
    languageDetailRight: {
      fontFamily: 'Montserrat Regular',
      fontSize: 9,
      marginLeft: '0.345cm',
    },
    borderBot: {
      width: 63.42,
      height: 2.25,
      backgroundColor: '#000000',
      marginTop: '0.12cm',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftDiv}>
          <View style={styles.topLeftDiv}>
            <Text style={styles.bigTitle}>HELLO! I'M</Text>
            <View style={styles.name}>
              <Text style={styles.lastName}>
                {profile?.name}
              </Text>
            </View>
            <Text style={styles.bigTitle}>{profile?.jobTypeName}</Text>
            <View style={styles.avatarDiv}>
              <Image src={profile?.avatarPath} style={styles.image} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
