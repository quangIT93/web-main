import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvSkill {
  color: any;
  profile: any;
  fontSize: any;
}
const Skill: React.FC<ICvSkill> = (props) => {
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
      letterSpacing: '4pt',
      fontFamily: 'Petrona Bold',
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
        <Text style={styles.title}>Skill</Text>
      </View>
      <View>
        <View style={styles.divDes}>
          <Text style={styles.textDes}>Sinh viên ưu tú Thành Phố</Text>
        </View>
        <View style={styles.divDes}>
          <Text style={styles.textDes}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            incidunt, deserunt consectetur nam tenetur aperiam facere qui
            perferendis autem quos molestias. Dolorum provident itaque tempora
            nesciunt atque optio repudiandae molestiae. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quidem rerum minus vitae quia.
            Dolores, quia doloribus fugit reiciendis dolor quaerat magnam
            dolorem consectetur, quod sint iure quo commodi? Placeat, commodi.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempora
            exercitationem nostrum quibusdam consequatur. Autem ipsa ab
            aspernatur molestiae! Aut id tempora ipsum praesentium cupiditate
            delectus consectetur doloribus perspiciatis eum.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Skill;
