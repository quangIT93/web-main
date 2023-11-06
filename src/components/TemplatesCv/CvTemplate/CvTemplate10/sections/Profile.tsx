import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvProfile {
  color: any;
  profile: any;
  fontSize: any;
}
const Profile: React.FC<ICvProfile> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    divTitle: {
      backgroundColor:
        color === 1
          ? '#e5f6fe'
          : color === 2
          ? '#D6EAF8'
          : color === 3
          ? '#FCF3CF'
          : color === 4
          ? '#D5F5E3'
          : '#FADBD8',
    },
    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
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
      letterSpacing: '4pt',
      fontWeight: 'extrabold',
    },
    divDes: {
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
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.divDes}>
        <Text style={styles.textDes}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          incidunt, deserunt consectetur nam tenetur aperiam facere qui
          perferendis autem quos molestias. Dolorum provident itaque tempora
          nesciunt atque optio repudiandae molestiae. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quidem rerum minus vitae quia. Dolores,
          quia doloribus fugit reiciendis dolor quaerat magnam dolorem
          consectetur, quod sint iure quo commodi? Placeat, commodi. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Id tempora exercitationem
          nostrum quibusdam consequatur. Autem ipsa ab aspernatur molestiae! Aut
          id tempora ipsum praesentium cupiditate delectus consectetur doloribus
          perspiciatis eum.
        </Text>
      </View>
    </View>
  );
};

export default Profile;
