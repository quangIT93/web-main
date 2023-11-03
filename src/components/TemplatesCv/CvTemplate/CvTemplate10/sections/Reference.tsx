import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvReference {
  color: any;
  profile: any;
  fontSize: any;
}
const Reference: React.FC<ICvReference> = (props) => {
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    divTitle: {
      backgroundColor: '#e5f6fe',
    },
    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color: '#34899d',
      fontFamily: 'Petrona Bold',
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divDes: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    divName: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    divPhone: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
    divWrapItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12pt',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <Text style={styles.title}>Reference</Text>
      </View>
      <View style={styles.divWrapItem}>
        <View>
          <View style={styles.divName}>
            <Text style={styles.textDes}>Mguyễn Văn An</Text>
          </View>
          <View style={styles.divPhone}>
            <Text style={styles.textDes}>0911985754</Text>
          </View>
          <View style={styles.divDes}>
            <Text style={styles.textDes}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              incidunt, deserunt consectetur nam tenetur aperiam facere qui
              perferendis autem quos molestias. Dolorum provident itaque tempora
            </Text>
          </View>
        </View>
        <View
          style={{
            height: '12pt',
            width: '60pt',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#34899d',
          }}
        ></View>
        <View>
          <View style={styles.divName}>
            <Text style={styles.textDes}>Mguyễn Văn An</Text>
          </View>
          <View style={styles.divPhone}>
            <Text style={styles.textDes}>0911985754</Text>
          </View>
          <View style={styles.divDes}>
            <Text style={styles.textDes}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              incidunt, deserunt consectetur nam tenetur aperiam facere qui
              perferendis autem quos molestias. Dolorum provident itaque tempora
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Reference;
