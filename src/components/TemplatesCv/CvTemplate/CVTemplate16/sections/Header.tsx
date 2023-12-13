import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Polygon,
  Svg,
} from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvHeader {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Header: React.FC<ICvHeader> = (props) => {
  const { profile, fontSize, color, profileMore } = props;
  const styles = StyleSheet.create({
    container: {
      // width: '100%',
      height: '269.934',
      marginTop: -30,
      marginBottom: '60.041pt',
      marginRight: 0,
      marginLeft: -30,
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: '#cee8ff',
      // backgroundColor: '#cee8ff',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: '0',
    },
    divInfo: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '47.137pt',
    },
    textName: {
      fontSize: '42pt',
      color: '#000000',
      fontFamily: 'OpenSans-Regular',
    },
    line: {
      marginTop: '10pt',
      height: '5px',
      width: '250px',
      borderRadius: '3px',
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
      ,
    },
    textPosition: {
      fontSize: '18pt',
      letterSpacing: '4pt',
      marginTop: '10pt',
      color: '#000000',
      fontFamily: 'OpenSans-Regular',
    },
    divImage: {
      margin: '60pt 48.768pt 43pt 0',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      height: '205pt',
      minWidth: '205pt',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    borderImage: {
      backgroundColor: 'transparent',
      borderRadius: '50%',
      height: '205pt',
      minWidth: '205pt',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      border: '5px solid #FFFFFF',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    topRightView1: {
      position: 'absolute',
      width: '400px',
      height: '200px',
      right: 32,
      top: -59,
      transform: 'rotate(-45deg)',
      backgroundColor: '#FFFFFF',
      borderRadius: '30px',
      zIndex: '2',
    },
    topRightView2: {
      position: 'absolute',
      width: '400px',
      height: '200px',
      right: -210,
      top: -20,
      transform: 'rotate(-45deg)',
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      borderRadius: '30px',
      zIndex: '1'
    },
    topRightView3: {
      position: 'absolute',
      width: '80%',
      height: '40px',
      right: '10%',
      top: 240,
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      // borderRadius: '50%',
      zIndex: '2'
    },
    topRightView4: {
      position: 'absolute',
      width: '150px',
      height: '70px',
      right: 155,
      top: 171,
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      zIndex: '3'
    },
    topRightView5: {
      position: 'absolute',
      width: '150px',
      height: '40px',
      left: -55,
      top: 279,
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      transform: 'rotate(-45deg)',
      borderRadius: '30px',
      zIndex: '1'
    },
    topRightView6: {
      position: 'absolute',
      width: '150px',
      height: '40px',
      left: -40,
      top: 319,
      backgroundColor: '#FFFFFF',
      transform: 'rotate(-45deg)',
      borderRadius: '30px',
      zIndex: '1',
    },
    topRightView7: {
      position: 'absolute',
      width: '40px',
      height: '40px',
      left: 33,
      top: 280,
      backgroundColor: color === 1
        ? '#ffcf00'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      zIndex: '3'
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.topRightView1} />
      <View style={styles.topRightView2} />
      <View style={styles.topRightView3} />
      <View style={styles.topRightView4} />
      <View style={styles.topRightView5} />
      <View style={styles.topRightView6} />
      <View style={styles.topRightView7} />

      <View style={styles.divInfo}>
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <View>
            <Text style={styles.textName}>
              {profile?.name?.split(' ').length > 2
                ? profile?.name?.split(' ').slice(0, -2).join(' ')
                : profile?.name?.split(' ').slice(0, -1).join(' ')}
            </Text>
          </View>
          <View>
            <Text style={styles.textName}>
              {profile?.name?.split(' ').length > 2
                ? profile?.name?.split(' ').slice(-2).join(' ')
                : profile?.name?.split(' ').slice(-1).join(' ')}
            </Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View>
          <Text style={styles.textPosition}>{profile?.jobTypeName}</Text>
        </View>
      </View>

      <View style={styles.divImage}>
        <View
          style={{
            // padding: '9.955pt',
            borderRadius: '50%',
            backgroundColor: '#ccc',
            height: '185pt',
            width: '185pt',
          }}
        >
          <Image
            src={{
              uri:
                profile.avatarPath !== null ? profile.avatarPath : null_avatar,
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
        <View style={styles.borderImage}></View>
      </View>
    </View>
  );
};

export default Header;
