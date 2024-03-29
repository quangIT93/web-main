import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Polygon,
  Svg,
  Rect,
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
      // marginBottom: '32.041pt',
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

    divTextName: {
      maxWidth: '310pt',
    },
    textName: {
      fontSize: '42pt',
      color:
        color === 1
          ? '#4A55A2'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontWeight: 'extrabold',
      fontFamily: 'Montserrat SemiBold',
    },
    divTextJobTypeName: {
      height: '35.786pt',
      backgroundColor:
        color === 1
          ? '#c5dff8'
          : color === 2
            ? '#D6EAF8'
            : color === 3
              ? '#FCF3CF'
              : color === 4
                ? '#D5F5E3'
                : '#FADBD8',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '-47.137pt',
      marginTop: '12pt',
      paddingLeft: '61.137pt',
    },
    textPosition: {
      fontSize: '18pt',
      letterSpacing: '4pt',
      // marginTop: '20pt',
      color:
        color === 1
          ? '#4A55A2'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      fontFamily: 'Montserrat SemiBold',
      maxWidth: '310pt',
    },
    divImage: {
      position: 'absolute',
      backgroundColor: 'transparent',
      height: '195.489pt',
      width: '168.594pt',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: '47.936pt',
      top: '47.936pt',
      border: `2px solid ${color === 1
        ? '#4A55A2'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
        }`,
      padding: '11.844pt',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    line1: {
      position: 'absolute',
      left: 0,
      top: 165,
      width: '63.8%',
      height: '1px',
      backgroundColor: color === 1
        ? '#4A55A2'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
    },
    line2: {
      position: 'absolute',
      right: 0,
      top: 220,
      width: '8.3%',
      height: '1px',
      backgroundColor: color === 1
        ? '#4A55A2'
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
      {/* <Svg style={{ position: 'absolute', width: 400, height: 400, left: '0' }}>
        <Polygon
          points="0,0 0,70 30,110 120,110 180,30 160,0"
          fill={
            color === 1
              ? '#8dc5fe'
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
              ? '#8dc5fe'
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

      <Svg
        style={{
          position: 'absolute',
          width: '200',
          height: '100%',
          right: '0',
          top: '0',
        }}
      >
        <Polygon
          points="100,0 0,200 200,200 200,0"
          fill={
            color === 1
              ? '#8dc5fe'
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
              ? '#8dc5fe'
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

      <Svg
        style={{
          position: 'absolute',
          width: '300',
          height: '100%',
          right: '0',
          top: '0',
        }}
      >
        <Polygon
          points="0,200 50,250 120,250 120,100 50,100 "
          fill={
            color === 1
              ? '#e1f1ff'
              : color === 2
              ? '#85C1E9'
              : color === 3
              ? '#F7DC6F'
              : color === 4
              ? '#ABEBC6'
              : '#EC7063'
          }
          stroke={
            color === 1
              ? '#e1f1ff'
              : color === 2
              ? '#85C1E9'
              : color === 3
              ? '#F7DC6F'
              : color === 4
              ? '#ABEBC6'
              : '#EC7063'
          }
          strokeWidth={1}
        />
      </Svg> */}

      <Svg
        viewBox="0 0 220 100"
        style={{
          position: 'absolute',
          width: '500',
          height: '160',
          right: '-188',
          top: '-22',
        }}
      >
        <Rect
          width="146"
          height="100"
          fill={
            color === 1
              ? '#c5dff8'
              : color === 2
                ? '#D6EAF8'
                : color === 3
                  ? '#FCF3CF'
                  : color === 4
                    ? '#D5F5E3'
                    : '#FADBD8'
          }
        />
      </Svg>
      <View style={styles.line1}></View>
      <View style={styles.line2}></View>

      <View style={styles.divInfo}>
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <View style={styles.divTextName}>
            <Text style={styles.textName}>
              {' '}
              {profile?.name?.split(' ').length > 2
                ? profile?.name?.split(' ').slice(0, -2).join(' ')
                : profile?.name?.split(' ').slice(0, -1).join(' ')}
            </Text>
          </View>
          <View style={styles.divTextName}>
            <Text style={styles.textName}>
              {' '}
              {profile?.name?.split(' ').length > 2
                ? profile?.name?.split(' ').slice(-2).join(' ')
                : profile?.name?.split(' ').slice(-1).join(' ')}
            </Text>
          </View>
        </View>
        <View style={styles.divTextJobTypeName}>
          <Text style={styles.textPosition}>{profile?.jobTypeName}</Text>
        </View>
      </View>

      <View style={styles.divImage}>
        <View
          style={{
            // padding: '9.955pt',
            backgroundColor: '#ccc',
            height: '175.489pt',
            width: '148.594pt',
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
      </View>
    </View>
  );
};

export default Header;
