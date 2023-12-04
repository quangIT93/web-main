import React, { useEffect } from 'react';

import { Image, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import profileApi from 'api/profileApi';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import null_avatar from '../../images/null_avatar.png';
import mail from '../../images/mail.png';
import phone from '../../images/phone.png';
import home from '../../images/home.png';
import fb from '../../images/fb.png';
import linkedin from '../../images/in.png';
import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
interface ICvHeader {
  color: any;
  profile: any;
  fontSize: any;
}

const Header: React.FC<ICvHeader> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      // height: '190.699pt',
      marginBottom: '44.003pt',
      // paddingLeft: '35.745pt',
      // border: '1px solid red'
    },
    content: {
      width: '100%',
      // height: '100%',
      // position: 'relative',

      // paddingTop: '47,291pt',
      // paddingLeft: '103.428pt',
      // border: '1px solid green'
    },
    info: {
      marginTop: '58.298pt',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // border: '1px solid red'
    },
    name: {
      color:
        color === 1
          ? '#112D4E'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      // marginTop: '12.404px',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // border: '1px solid red',
      width: '100%',
      gap: '8.819pt',
    },
    lastName: {
      fontSize: fontSize + 2,
      fontFamily: 'Montserrat Regular',
      width: '100%',
      letterSpacing: '2px',
      textAlign: 'center',
      // marginBottom: '8.819pt',
      // background: 'red',
      // border: '1px solid black',
    },
    firstName: {
      fontSize: fontSize + 2,
      fontFamily: 'Montserrat Regular',
      width: '100%',
      letterSpacing: '2px',
      textAlign: 'center',
      // background: 'red',
      // border: '1px solid black',
    },
    subtitle: {
      fontSize: fontSize - 15,
      justifySelf: 'flex-end',
      fontFamily: 'Montserrat Regular',
      color: '#1B1212',
      textDecoration: 'none',
      textAlign: 'justify',
    },
    bigTitle: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 14,
      // letterSpacing: '4px',
      color: '#777878',
      marginTop: '13.947pt',
    },
    topLeftDiv: {
      // marginTop: '2.066cm',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      // gap: '0.25cm',
      // border: '1px solid blue',
      width: '100%',
    },
    botLeftDiv: {
      marginTop: '41.543pt',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // marginBottom: '46.086px',
      // gap: '0.418cm',
      flexWrap: 'wrap',
      // border: '1px solid blue',
      width: '100%',
    },
    // lineRight: {
    //   position: 'absolute',
    //   top: '107.31pt',
    //   right: -30,
    //   width: '46pt',
    //   height: '9pt',
    //   backgroundColor: '#F9F7F7',
    // },
    // lineLeft: {
    //   position: 'absolute',
    //   top: '107.31pt',
    //   left: -30,
    //   width: '108pt',
    //   height: '9pt',
    //   backgroundColor: '#F9F7F7',
    // },
    contact: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.284cm',
      fontSize: fontSize - 14,
      fontFamily: 'Montserrat Regular',
      width: '100%',
      marginTop: '25.021pt',
      color:
        color === 1
          ? '#112D4E'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',

      // border: '1px solid #000',
    },
    contactTitle: {
      fontSize: fontSize - 11,
      fontFamily: 'Montserrat Regular',
      width: '100%',
      letterSpacing: '2px',
      textAlign: 'center',
      color:
        color === 1
          ? '#112D4E'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      textTransform: 'uppercase',
      // border: '1px solid red',
    },
    midDiv: {
      width: '100%',
      marginTop: '66.894pt',
      // height: '100%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'flex-start',
      // justifyContent: 'center',
      // paddingLeft: '90pt',
      // paddingTop: 15,
      // paddingRight: '1.136cm',
      // gap: '20.229pt',
      // border: '1px solid black',
      zIndex: 1,
    },
    rightDiv: {
      position: 'absolute',
      top: '27.31pt',
      right: -30,
      width: '46pt',
      height: '78pt',
      backgroundColor: '#F9F7F7',
    },
    leftDiv: {
      position: 'absolute',
      top: '27.31pt',
      left: -30,
      width: '108pt',
      height: '78pt',
      backgroundColor: '#F9F7F7',
    },
    avatarDiv: {
      width: '159.407pt',
      height: '159.407pt',
      backgroundColor: '#F9F7F7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
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
      fontSize: fontSize - 12,
      letterSpacing: '2px',
    },
    languageDetail: {
      marginTop: '0.319cm',
      display: 'flex',
      flexDirection: 'row',
    },
    languageDetailLeft: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      textTransform: 'uppercase',
    },
    languageDetailRight: {
      fontFamily: 'Montserrat Regular',
      fontSize: fontSize - 15,
      marginLeft: '0.345cm',
    },
    borderBot: {
      width: '159.407pt',
      height: 1.25,
      backgroundColor:
        color === 1
          ? '#112D4E'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      marginTop: '6.745pt',
    },
    icon1: {
      height: '15.71pt',
      objectFit: 'contained',
    },
    icon2: {
      height: '10.222pt',
      objectFit: 'contained',
    },
    icon3: {
      height: '13.763pt',
      objectFit: 'contained',
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
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 8,
      width: '149.407pt',
      color: '#777878',
      border: '1px solid #ffffff',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.midDiv}>
          <View style={styles.topLeftDiv}>
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
              <View style={styles.borderBot}></View>
              <Text style={styles.bigTitle}>{profile?.jobTypeName}</Text>
            </View>
          </View>
          <View style={styles.botLeftDiv}>
            <Text style={styles.contactTitle}>Contact</Text>
            <View style={styles.borderBot}></View>
            <View style={styles.contact}>
              <View style={styles.item}>
                <Image src={phone} style={styles.icon1} />
                <Text style={styles.subtitle}>{profile?.phone}</Text>
              </View>
              <View style={styles.item}>
                <Image src={mail} style={styles.icon2} />
                <Text style={styles.subtitle}>{profile?.email}</Text>
              </View>
              <View style={styles.item}>
                <Image src={home} style={styles.icon3} />
                <Text style={styles.subtitle}>
                  {profile?.addressText?.fullName}
                </Text>
              </View>
              {profile?.linkedin ? (
                <View style={styles.item}>
                  <Image src={linkedin} style={styles.icon4} />
                  <Link style={styles.subtitle} src={profile?.linkedin}>
                    Linkedin
                  </Link>
                </View>
              ) : (
                <></>
              )}
              {profile?.facebook ? (
                <View style={styles.item}>
                  <Image src={fb} style={styles.icon5} />
                  <Link style={styles.subtitle} src={profile?.facebook}>
                    Facebook
                  </Link>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
