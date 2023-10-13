import React, { useEffect } from 'react';

import { Image, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

import fb from '../../images/fb.png';
import linkedin from '../../images/in.png';
interface ICvHeader {
  color: any;
  profile: any;
}

const Header: React.FC<ICvHeader> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      // width: '100%',
      height: '176.728',
      marginTop: -30,
      // marginBottom: '32.041pt',
      position: 'relative',
      marginRight: 30,
      // border: '1px solid red',
    },
    content: {
      width: '100%',
      // height: '100%',

      // paddingLeft: '103.428pt',
      // border: '1px solid green'
    },
    info: {
      // border: '1px solid red',
      display: 'flex',
      flexDirection: 'column',
      // gap: '38.471pt',
      width: '100%',
    },
    name: {
      color: '#505050',
      // marginTop: '12.404px',
      // border: '1px solid red',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '20pt',
    },
    lastName: {
      fontSize: 31,
      fontFamily: 'OpenSans-Semi-Bold',
      width: '100%',
      textTransform: 'uppercase',
      color:
        color === 1
          ? '#152D35'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
      // background: 'red',
      // border: '1px solid black',
    },
    firstName: {
      fontSize: 33,
      fontFamily: 'Montserrat Regular',
      width: '100%',
      letterSpacing: '2px',
      // marginBottom: '0.5cm',
      // background: 'red',
      // border: '1px solid black',
    },
    subtitle: {
      fontSize: 9,
      justifySelf: 'flex-end',
      fontFamily: 'OpenSans-Regular',
      color: '#404BA0',
      textDecoration: 'none',
    },
    bigTitle: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 17,
      letterSpacing: 4,
      color: '#152D35',
      marginTop: '18.468pt',
      textTransform: 'uppercase',
      marginLeft: '40pt',
      // border: '1px solid black',
    },
    topLeftDiv: {
      // marginTop: '2.066cm',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      // gap: '0.25cm',
      // border: '1px solid green',
      width: '100%',
    },
    botLeftDiv: {
      // marginTop: '0.553cm',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      // marginBottom: '46.086px',
      gap: '0.418cm',
    },
    line: {
      width: '100%',
      height: '1px',
      backgroundColor:
        color === 1
          ? '#404BA0'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
      marginTop: '14.411pt',
    },
    contact: {
      marginTop: '15.094pt',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.284cm',
      fontSize: '7px',
      fontFamily: 'OpenSans-Regular',
    },
    topHead: {
      // transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      marginTop: '87,319pt',
      // justifyContent: 'center',
      // paddingLeft: '55pt',
      // paddingRight: '1.136cm',
      // gap: '19.752pt',
      // border: '1px solid black',
      zIndex: 1,
    },
    avatarDiv: {
      position: 'absolute',
      top: '41.23pt',
      right: 0,
      width: '176.728pt',
      height: '176.728pt',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: '1.5px solid #aaaaaa',
    },
    rightDiv: {
      maxWidth: '70%',
      // height: '100%',
      // backgroundColor: '#404BA0',
      display: 'flex',
      flexDirection: 'column',
      // gap: '18.468pt',
      // border: '1px solid red',
    },
    lineHead: {
      width: '100%',
      height: '2px',
      backgroundColor:
        color === 1
          ? '#404BA0'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
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
    borderBot: {
      width: 63.42,
      height: 2.25,
      backgroundColor: '#000000',
      marginTop: '0.12cm',
    },
    icon4: {
      height: '10.664pt',
      objectFit: 'contained',
      // marginLeft: '4pt',
      // marginRight: '1pt',
    },
    icon5: {
      height: '12.751pt',
      objectFit: 'contained',
      // marginLeft: '5pt',
      // marginRight: '5pt',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topHead}>
          <View style={styles.rightDiv}>
            <View style={styles.info}>
              <View style={styles.name}>
                <Text style={styles.lastName}>{profile?.name}</Text>
              </View>
              <Text style={styles.bigTitle}>{profile?.jobTypeName}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.avatarDiv}>
        <Image
          src={profile.avatarPath ? profile.avatarPath : 'a'}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Header;
