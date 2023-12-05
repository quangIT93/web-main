import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Polygon,
  Svg,
  Rect,
  Circle,
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
      //
      width: '100%',
      height: '269.934',
      marginTop: -30,
      // marginBottom: '32.041pt',
      marginRight: -10,
      marginLeft: -10,
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: '#cee8ff',
      // backgroundColor: '#cee8ff',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 2,
    },

    divTextJobTypeName: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '12pt',
      flexWrap: 'wrap',
    },

    divImage: {
      width: '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0pt 10pt 0 45pt',
    },
    wrapImage: {
      height: '180pt',
      width: '180pt',
      borderRadius: '50%',
      backgroundColor:
        color === 1
          ? '#b4d9a1'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      objectFit: 'cover',
      border: '1px solid black',
      borderRadius: '50%',
      height: '170pt',
      width: '170pt',
    },

    divInfo: {
      height: '100%',
      width: '60%',
      justifyContent: 'center',
      marginLeft: '20pt',
    },
    divTextName: {
      maxWidth: '300pt',
    },
    textName: {
      fontSize: '32pt',
      color:
        color === 1
          ? '#377a40'
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
    divPosition: {
      backgroundColor:
        color === 1
          ? '#b4d9a1'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      borderRadius: '15px',
      padding: '9pt 11pt',
      marginTop: '18pt',
    },
    textPosition: {
      color:
        color === 1
          ? '#377a40'
          : color === 2
            ? '#ffffff'
            : color === 3
              ? '#ffffff'
              : color === 4
                ? '#ffffff'
                : '#ffffff',
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

      <View style={styles.divImage}>
        <View style={styles.wrapImage}>
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
      <View style={styles.divInfo}>
        <View style={styles.divTextName}>
          <Text style={styles.textName}>
            {profile?.name?.split(' ').length > 2
              ? profile?.name?.split(' ').slice(0, -2).join(' ')
              : profile?.name?.split(' ').slice(0, -1).join(' ')}
          </Text>
          <Text style={styles.textName}>
            {profile?.name?.split(' ').length > 2
              ? profile?.name?.split(' ').slice(-2).join(' ')
              : profile?.name?.split(' ').slice(-1).join(' ')}
          </Text>
        </View>
        <View style={styles.divPosition}>
          <Text style={styles.textPosition}>Software engineer</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
