import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
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
      backgroundColor: '#cee8ff',
      justifyContent: 'space-between',
    },
    divInfo: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '47.137pt',
    },
    textName: {
      fontSize: '46pt',
      color: '#34899d',
    },
    textPosition: {
      fontSize: '20pt',
      letterSpacing: '4pt',
      marginTop: '20pt',
      color: '#34899d',
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
      <View style={styles.divInfo}>
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <View>
            <Text style={styles.textName}>Nguyen Thai</Text>
          </View>
          <View>
            <Text style={styles.textName}>Van A</Text>
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
