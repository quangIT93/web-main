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
}
const Header: React.FC<ICvHeader> = (props) => {
  const { profile, fontSize, color } = props;
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
      backgroundColor:
        color === 1
          ? '#cee8ff'
          : color === 2
          ? '#AED6F1'
          : color === 3
          ? '#F9E79F'
          : color === 4
          ? '#ABEBC6'
          : '#F1948A',
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
      fontSize: '46pt',
      color:
        color === 1
          ? '#037385'
          : color === 2
          ? '#0D99FF'
          : color === 3
          ? '#FBBC04'
          : color === 4
          ? '#5CB265'
          : '#D80000',
      fontFamily: 'Petrona Bold',
      fontWeight: 'extrabold',
    },
    textPosition: {
      fontSize: '20pt',
      letterSpacing: '4pt',
      marginTop: '20pt',
      color:
        color === 1
          ? '#037385'
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
      minHeight: '163.104pt',
      minWidth: '205.915pt',
      margin: '43.762pt 48.768pt 43pt 0',
      backgroundColor: '#fff',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  });
  return (
    <View style={styles.container}>
      {/* <Svg style={{ position: 'absolute', width: 400, height: 400 }}>
        <Polygon
          points="0,0 0,70 40,120 125,120 160,50 120,0"
          fill="#0d99ff"
          stroke="blue"
          strokeWidth={1}
        />
      </Svg> */}

      <View style={styles.divInfo}>
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <View>
            <Text style={styles.textName}>Thái</Text>
          </View>
          <View>
            <Text style={styles.textName}>Minh Quang</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textPosition}>Software engineer</Text>
        </View>
      </View>

      <View style={styles.divImage}>
        <View style={{ padding: '9.955pt' }}>
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
