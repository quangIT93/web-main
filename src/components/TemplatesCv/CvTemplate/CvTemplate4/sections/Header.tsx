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
      height: '190.699pt',
      // marginTop: '32.041pt',
      // paddingLeft: '35.745pt',
      // border: '1px solid red'
    },
    content: {
      width: '100%',
      height: '100%',
      position: 'relative',

      // paddingTop: '47,291pt',
      // paddingLeft: '103.428pt',
      // border: '1px solid green'
    },
    info: {
      marginLeft: '25pt',
      // border: '1px solid red'
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
      // marginTop: '12.404px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      // border: '1px solid red',
      width: '100%',
      gap: '9.447px',
    },
    lastName: {
      fontSize: 33,
      fontFamily: 'Archivo SemiExpanded Bold',
      width: '100%',
      letterSpacing: '2px',
      // background: 'red',
      // border: '1px solid black',
    },
    firstName: {
      fontSize: 33,
      fontFamily: 'Archivo SemiExpanded Bold',
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
      fontFamily: 'Archivo SemiExpanded Regular',
      fontSize: 15,
      letterSpacing: '4px',
      color: '#1B1212',
      marginTop: '12.34px',
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
      flexWrap: 'wrap',
    },
    lineRight: {
      position: 'absolute',
      top: '107.31pt',
      right: -30,
      width: '46pt',
      height: '9pt',
      backgroundColor: '#DBE2EF',
    },
    lineLeft: {
      position: 'absolute',
      top: '107.31pt',
      left: -30,
      width: '108pt',
      height: '9pt',
      backgroundColor: '#DBE2EF',
    },
    contact: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.284cm',
      fontSize: '7px',
      fontFamily: 'Montserrat Regular',
    },
    midDiv: {
      position: 'absolute',
      top: '0',
      left: '0',
      // transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'flex-start',
      // justifyContent: 'center',
      paddingLeft: '90pt',
      paddingTop: 15,
      // paddingRight: '1.136cm',
      gap: '20.229pt',
      // border: '1px solid black',
      zIndex: 1,
    },
    rightDiv: {
      position: 'absolute',
      top: '27.31pt',
      right: -30,
      width: '46pt',
      height: '78pt',
      backgroundColor: '#DBE2EF',
    },
    leftDiv: {
      position: 'absolute',
      top: '27.31pt',
      left: -30,
      width: '108pt',
      height: '78pt',
      backgroundColor: '#DBE2EF',
    },
    avatarDiv: {
      width: '112pt',
      height: '112pt',
      backgroundColor: '#DBE2EF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        <View style={styles.leftDiv}></View>
        <View style={styles.lineLeft}></View>
        <View style={styles.midDiv}>
          <View style={styles.topLeftDiv}>
            <View style={styles.avatarDiv}>
              <Image
                src={profile.avatarPath !== null ? profile.avatarPath : 'a'}
                style={styles.image}
              />
            </View>
            <View style={styles.info}>
              <View style={styles.name}>
                <Text style={styles.lastName}>
                  {profile?.name?.split(' ').length > 2
                    ? profile?.name?.split(' ').slice(0, -2).join(' ')
                    : profile?.name?.split(' ').slice(0, -1).join(' ')}
                </Text>
                <Text style={styles.firstName}>
                  {profile?.name?.split(' ').length > 2
                    ? profile?.name?.split(' ').slice(-2).join(' ')
                    : profile?.name?.split(' ').slice(-1).join(' ')}
                </Text>
              </View>
              <Text style={styles.bigTitle}>{profile?.jobTypeName}</Text>
            </View>
          </View>
          <View style={styles.botLeftDiv}>
            <View style={styles.contact}>
              <Text style={styles.subtitle}>{profile?.phone}</Text>
              <Text style={styles.subtitle}>|</Text>
              <Text style={styles.subtitle}>{profile?.email}</Text>
              <Text style={styles.subtitle}>|</Text>
              <Text style={styles.subtitle}>
                {profile?.addressText?.fullName}
              </Text>
              {profile?.linkedin ? (
                <>
                  <Text style={styles.subtitle}>|</Text>
                  <Link style={styles.subtitle} src={profile?.linkedin}>
                    Linkedin
                  </Link>
                </>
              ) : (
                <></>
              )}
              {profile?.facebook ? (
                <>
                  <Text style={styles.subtitle}>|</Text>
                  <Link style={styles.subtitle} src={profile?.facebook}>
                    Facebook
                  </Link>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View style={styles.rightDiv}></View>
        <View style={styles.lineRight}></View>
      </View>
    </View>
  );
};

export default Header;
