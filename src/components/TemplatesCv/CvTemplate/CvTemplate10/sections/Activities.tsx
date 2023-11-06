import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

interface ICvProfile {
  color: any;
  profile: any;
  fontSize: any;
}
interface ICvActivities {
  color: any;
  profile: any;
  fontSize: any;
}
const Activities: React.FC<ICvActivities> = (props) => {
  const styles = StyleSheet.create({
    container: {
      marginLeft: -25,
    },
    divTitle: {
      backgroundColor: '#e5f6fe',
    },
    title: {
      marginLeft: '45.839pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      color: '#34899d',
      fontFamily: 'Petrona Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divInfo: {
      marginLeft: '45.839pt',
      marginTop: '10.17pt',
      display: 'flex',
      flexDirection: 'row',
    },
    leftInfo: {
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    rightInfo: {
      width: '60%',
      display: 'flex',
      flexDirection: 'column',
      gap: '5pt',
    },
    textLeft: {
      fontSize: '11pt',
      color: '#34899d',
      wordwrap: 'break-word',
      textAlign: 'justify',
      fontFamily: 'Petrona Bold',
    },
    textTitleRight: {
      fontSize: '11pt',
      color: '#34899d',
      fontFamily: 'Petrona Bold',
    },
    divTextTitleRight: {
      maxWidth: '180pt',
    },
    divTextRight: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4.028pt',
      maxWidth: '180pt',
    },
    textRight: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <Text style={styles.title}>Activities</Text>
      </View>
      <View style={styles.divInfo}>
        <View style={styles.leftInfo}>
          <Text style={styles.textLeft}>2017 - 2021</Text>
          <Text style={styles.textLeft}>Thành Phố Hồ chí Minh</Text>
        </View>
        <View style={styles.rightInfo}>
          <View style={styles.divTextTitleRight}>
            <Text style={styles.textLeft}>Dai Hoc Sai Gon</Text>
          </View>
          <View style={styles.divTextRight}>
            <Text style={styles.textRight}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              ipsa ab officia dolor incidunt esse neque quam consequatur
              accusamus id. Molestiae itaque suscipit tempora quasi minima atque
              nesciunt dicta reprehenderit!
            </Text>
            <Text style={styles.textRight}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              ipsa ab officia dolor incidunt esse neque quam consequatur
              accusamus id. Molestiae itaque suscipit tempora quasi minima atque
              nesciunt dicta reprehenderit!
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.divInfo}>
        <View style={styles.leftInfo}>
          <Text style={styles.textLeft}>2017 - 2021</Text>
          <Text style={styles.textLeft}>Thành Phố Hồ chí Minh</Text>
        </View>
        <View style={styles.rightInfo}>
          <View style={styles.divTextTitleRight}>
            <Text style={styles.textLeft}>Dai Hoc Sai Gon</Text>
          </View>
          <View style={styles.divTextRight}>
            <Text style={styles.textRight}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              ipsa ab officia dolor incidunt esse neque quam consequatur
              accusamus id. Molestiae itaque suscipit tempora quasi minima atque
              nesciunt dicta reprehenderit!
            </Text>
            <Text style={styles.textRight}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              ipsa ab officia dolor incidunt esse neque quam consequatur
              accusamus id. Molestiae itaque suscipit tempora quasi minima atque
              nesciunt dicta reprehenderit!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Activities;
