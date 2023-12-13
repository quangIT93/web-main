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
      marginRight: -30,
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
      color:
        color === 1
          ? '#437901'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontWeight: 'extrabold',
      fontFamily: 'Petrona Bold',
    },
    textPosition: {
      fontSize: '18pt',
      letterSpacing: '4pt',
      marginTop: '20pt',
      color: '#FE6829',
      fontFamily: 'Petrona Bold',
    },
    divImage: {
      margin: '43.762pt 48.768pt 43pt 0',
      backgroundColor: '#fff',
      borderRadius: '50%',
      height: '205pt',
      minWidth: '205pt',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    halfCircle: {
      position: 'absolute',
      bottom: '-15pt',
      left: '-15pt',
      width: '235pt',
      height: '235pt',
      border: '2pt solid #FFFFFF',
      borderBottomColor: '#FE6829',
      borderRightColor: '#FE6829',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRadius: '50%',
      transform: 'rotate(100deg)',
    },
    topRightView1: {
      position: 'absolute',
      width: '400px',
      height: '200px',
      right: -170,
      top: -50,
      transform: 'rotate(30deg)',
      backgroundColor: color === 1
        ? '#437901'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      borderRadius: '30px'
    },
    topRightView2: {
      position: 'absolute',
      width: '200px',
      height: '80px',
      right: -20,
      top: 100,
      transform: 'rotate(90deg)',
      backgroundColor: color === 1
        ? '#437901'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      borderRadius: '40px',
    },
    topRightView3: {
      position: 'absolute',
      width: '30px',
      height: '30px',
      right: 11,
      top: 170,
      transform: 'rotate(90deg)',
      backgroundColor: '#FFFFFF',
      borderRadius: '50%',
      zIndex: '1'
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.topRightView1} />
      <View style={styles.topRightView3} />
      <View style={styles.topRightView2} />
      <Svg
        style={{
          position: 'absolute',
          width: '500',
          height: '100',
          right: '-180',
          top: '100',
          transform: 'rotate(-45deg)',
          zIndex: '2'
        }}
      >
        <Polygon
          points="250,0 500,500 160,200"
          fill={
            color === 1
              ? '#437901'
              : color === 2
                ? '#0D99FF'
                : color === 3
                  ? '#FBBC04'
                  : color === 4
                    ? '#5CB265'
                    : '#D80000'
          }
          stroke={
            color === 1
              ? '#437901'
              : color === 2
                ? '#0D99FF'
                : color === 3
                  ? '#FBBC04'
                  : color === 4
                    ? '#5CB265'
                    : '#D80000'
          }
          strokeWidth={1}
        />
      </Svg>

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
            height: '205pt',
            width: '205pt',
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
        <View style={styles.halfCircle} />
      </View>
    </View>
  );
};

export default Header;
