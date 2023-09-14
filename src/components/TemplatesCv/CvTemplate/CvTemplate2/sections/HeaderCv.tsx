import React from 'react';

import { Image, Text, View, StyleSheet } from '@react-pdf/renderer';

const HeaderCv = () => {
  const styles = StyleSheet.create({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      // backgroundColor: 'blue',
      width: '100%',
      flexDirection: 'row',
      height: 'auto',
    },
  });

  return (
    <View style={styles.header}>
      <View
        style={{
          display: 'flex',
          height: '4.5cm',
          // backgroundColor: 'red',
          width: '70%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: '37pt',
            width: '6cm',
            marginBottom: '0.6cm',
          }}
        >
          Thái Minh Quang
        </Text>

        <View
          style={{
            border: '1px solid #ccc',
            width: '100%',
            marginBottom: '0.6cm',
          }}
        ></View>

        <Text style={{ fontSize: '9pt' }}>Công nghệ thông tin</Text>

        <View
          style={{
            border: '1px solid #ccc',
            width: '100%',
            marginTop: '0.6cm',
          }}
        ></View>
      </View>

      <Image
        src="./images/image 51.png"
        style={{ width: '5cm', height: '4.5cm' }}
      />
      {/* <View style={{ width: '5cm', height: '4.5cm' }}>
    </View> */}
    </View>
  );
};

export default HeaderCv;
