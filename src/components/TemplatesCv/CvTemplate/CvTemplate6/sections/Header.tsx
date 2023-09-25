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
      width: '100%',
      height: '175.166pt',
      // marginTop: '32.041pt',
      // paddingLeft: '35.745pt',
      // border: '1px solid red'
    },
    content: {
      width: '100%',
      height: '100%',

      // paddingTop: '47,291pt',
      // paddingLeft: '103.428pt',
      // border: '1px solid green'
    },
    info: {
      // border: '1px solid red',
      display: 'flex',
      flexDirection: 'column',
      // gap: '38.471pt',
      // width: '100%',
    },
    name: {
      color:
        color === 1
          ? '#213555'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      // marginTop: '12.404px',
      // border: '1px solid red',
      width: '100%',
    },
    lastName: {
      fontSize: 33,
      fontFamily: 'OpenSans-Regular',
      width: '100%',
      // background: 'red',
      // border: '1px solid black',
    },
    firstName: {
      fontSize: 29,
      fontFamily: 'OpenSans-Bold',
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
      color: '#213555',
      textDecoration: 'none',
    },
    bigTitle: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 15,
      color: '#213555',
      marginTop: '7.191pt',
      textTransform: 'uppercase'
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
      backgroundColor: color === 1
        ? '#213555'
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
      // alignItems: 'flex-start',
      // justifyContent: 'center',
      // paddingLeft: '55pt',
      // paddingRight: '1.136cm',
      gap: '19.752pt',
      // border: '1px solid black',
      zIndex: 1,
    },
    rightDiv: {
      position: 'absolute',
      top: '-1.2cm',
      right: 0,
      width: '237.179pt',
      height: '221.179pt',
      backgroundColor: '#213555',
      borderBottomRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      zIndex: 2,
    },
    avatarDiv: {
      // position: 'absolute',
      // top: '1.66cm',
      // right: '4.023cm',
      width: '160.755pt',
      height: '157.94pt',
      // backgroundColor: '#FFFFFF',
      // border: '1px solid #AAAAAA',
      backgroundColor: '#213555',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 1,
    },
    leftDiv: {
      flex: 2.5,
      width: '100%',
      height: '100%',
      // backgroundColor: '#213555',
      display: 'flex',
      flexDirection: 'column',
      gap: '19.471pt',
    },
    lineHead: {
      width: '100%',
      height: '19.494pt',
      backgroundColor: color === 1
        ? '#213555'
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
      fontFamily: 'OpenSans-Regular',
      fontSize: 9,
      textTransform: 'uppercase',
    },
    languageDetailRight: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 9,
      marginLeft: '0.345cm',
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
          <View style={styles.avatarDiv}>
            <Image src={profile?.avatarPath} style={styles.image} />
          </View>
          <View style={styles.leftDiv}>
            <View style={styles.lineHead}></View>
            <View style={styles.info}>
              <View style={styles.name}>
                <Text style={styles.firstName}>
                  {profile?.name}
                </Text>
              </View>
              <Text style={styles.bigTitle}>{profile?.jobTypeName}</Text>
              <View style={styles.contact}>
                {profile?.facebook ? (
                  <>
                    <Image
                      src={fb}
                      style={styles.icon5}
                    />
                    <Link style={styles.subtitle} src={profile?.facebook}>
                      Facebook
                    </Link>
                  </>
                ) : (
                  <></>
                )}
                {profile?.linkedin ? (
                  <>
                    <Image
                      src={linkedin}
                      style={styles.icon4}
                    />
                    <Link style={styles.subtitle} src={profile?.linkedin}>
                      Linkedin
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
    </View>
  );
};

export default Header;
