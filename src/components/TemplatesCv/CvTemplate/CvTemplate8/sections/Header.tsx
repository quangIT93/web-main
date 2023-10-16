import React, { useEffect } from 'react';

import { Image, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

import fb from '../../images/fb.png';
import linkedin from '../../images/in.png';
import null_avatar from '../../images/null_avatar.png';

interface ICvHeader {
  color: any;
  profile: any;
}

const Header: React.FC<ICvHeader> = (props) => {
  const { color, profile } = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '103.526pt',
      marginTop: 40,
      marginBottom: '32.041pt',
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
      width: '100%',
      paddingLeft: '10.702pt',
    },
    name: {
      color: '#505050',
      // marginTop: '12.404px',
      // border: '1px solid red',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    lastName: {
      fontSize: 33,
      fontFamily: 'Montserrat Semi Bold',
      width: '100%',
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
      fontFamily: 'Montserrat Bold',
      fontSize: 15,
      color:
        color === 1
          ? '#404BA0'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
      marginTop: '7.191pt',
      textTransform: 'uppercase',
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
      // justifyContent: 'center',
      // paddingLeft: '55pt',
      // paddingRight: '1.136cm',
      gap: '19.752pt',
      // border: '1px solid black',
      zIndex: 1,
    },
    avatarDiv: {
      width: '103.526pt',
      height: '103.526pt',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      borderWidth: '2px',
      borderColor:
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
    rightDiv: {
      flex: 2.5,
      width: '100%',
      height: '100%',
      // backgroundColor: '#404BA0',
      display: 'flex',
      flexDirection: 'column',
      gap: '19.471pt',
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
                <Text style={styles.lastName}>
                  {profile?.name?.split(' ').length > 2
                    ? profile?.name?.split(' ').slice(0, -2).join(' ')
                    : profile?.name?.split(' ').slice(0, -1).join(' ')}
                </Text>
                <Text> </Text>
                <Text style={styles.firstName}>
                  {profile?.name?.split(' ').length > 2
                    ? profile?.name?.split(' ').slice(-2).join(' ')
                    : profile?.name?.split(' ').slice(-1).join(' ')}
                </Text>
              </View>
              <Text style={styles.bigTitle}>{profile?.jobTypeName}</Text>
            </View>
            <View style={styles.lineHead}></View>
          </View>
          <View style={styles.avatarDiv}>
            <Image
              src={{
                uri:
                  profile.avatarPath !== null
                    ? profile.avatarPath
                    : null_avatar,
                method: 'GET',
                body: '',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Cache-Control': 'no-cache',
                  // 'Access-Control-Allow-Methods': '*',
                  // 'Access-Control-Allow-Headers': '*',
                },
              }}
              style={styles.image}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
