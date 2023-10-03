import React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  personal_details: {
    textAlign: 'center',
    marginBottom: 10,
  },

  name: {
    fontSize: 30,
  },

  contact_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },

  span: {
    paddingHorizontal: 6,
    color: '#1f1f1f',
  },

  pipe: {
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: '#1f1f1f',
  },
});

const PersonalDetails = ({ personalDetails }) => {
  const { firstName, lastName, email, phoneNumber, linkedin, github, website } =
    personalDetails;
  return (
    <View style={styles.personal_details}>
      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>
      <View style={styles.contact_details}>
        {email !== '' && (
          <Text style={[styles.pipe, styles.span]}>{email}</Text>
        )}
        {phoneNumber !== '' && (
          <Text style={[styles.pipe, styles.span]}>{phoneNumber}</Text>
        )}
        {linkedin !== '' && (
          <Link
            src={`https://linkedin.com/in/${linkedin}`}
            style={[styles.pipe, styles.span]}>
            LinkedIn
          </Link>
        )}
        {github !== '' && (
          <Link
            src={`https://github.com/${github}`}
            style={[styles.pipe, styles.span]}>
            Github
          </Link>
        )}
        {website !== '' && (
          <Link src={`https://${website}`} style={[styles.pipe, styles.span]}>
            Portfolio
          </Link>
        )}
      </View>
    </View>
  );
};

export default PersonalDetails;
