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
      marginLeft: '-30',
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: '#cee8ff',
      // backgroundColor: '#cee8ff',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: '0',
    },
    divInfo: {
      width: '80%',
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      gap: '7.017pt',
      border: `1px solid ${color === 1
        ? '#437901'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
        }`,
      borderRadius: '100px',
      height: '70%',
      paddingLeft: '50%',
      position: 'absolute',
      top: '70pt',
      left: '10%',
      zIndex: 3
    },
    name: {
      display: 'flex',
      justifyContent: 'flex-start',
      border: '1px solid red'
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
      fontFamily: 'Fahkwang Bold',
      textAlign: 'left',
      // border: '1px solid red'
    },
    textPosition: {
      fontSize: '18pt',
      letterSpacing: '4pt',
      // marginTop: '20pt',
      color: color === 1
        ? '#437901'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
      fontFamily: 'Petrona Bold',
    },
    divImage: {
      margin: '44.762pt 48.768pt 43pt 45.839pt',
      backgroundColor: '#fff',
      borderRadius: '50%',
      height: '205pt',
      minWidth: '205pt',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 1,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
      backgroundColor: '#4A772F'
    },
    halfCircle: {
      position: 'absolute',
      bottom: '-25pt',
      right: '-25pt',
      width: '215pt',
      height: '215pt',
      border: `1px solid ${color === 1
        ? '#437901'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'}`,
      borderRadius: '50%',
      zIndex: 2,
      backgroundColor: '#FFFFFF',
    },
  });
  return (
    <View style={styles.container}>

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
      <View style={styles.divInfo}>
        <View style={styles.name}>
          {/* <View> */}
          <Text style={styles.textName}>
            {profile?.name?.split(' ').length > 2
              ? profile?.name?.split(' ').slice(0, -2).join(' ')
              : profile?.name?.split(' ').slice(0, -1).join(' ')}
          </Text>
          {/* </View> */}
          {/* <View> */}
          <Text style={styles.textName}>
            {profile?.name?.split(' ').length > 2
              ? profile?.name?.split(' ').slice(-2).join(' ')
              : profile?.name?.split(' ').slice(-1).join(' ')}
          </Text>
          {/* </View> */}
        </View>
        <View>
          <Text style={styles.textPosition}>{profile?.jobTypeName}</Text>
        </View>
      </View>

    </View>
  );
};

export default Header;
