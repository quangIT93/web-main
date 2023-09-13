import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// import List, { Item } from './List';

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  introduce: {
    // fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
  },
  image: {
    width: '1cm',
    height: '1cm',
  },
});

interface IPropContactCv {
  address: string;
  mobile: string;
  mail: string;
}

const ContactCvEntry = ({
  address,
  mobile,
  mail,
}: {
  address: string;
  mobile: string;
  mail: string;
}) => (
  <View style={{ marginTop: '0.626cm' }}>
    <View>
      <Text style={{ fontSize: '8.79pt' }}>Address</Text>
      <Text style={styles.introduce}>{address}</Text>
    </View>
    <View>
      <Text style={{ fontSize: '8.79pt' }}>Number Phone</Text>
      <Text style={styles.introduce}>{mobile}</Text>
    </View>

    <View>
      <Text style={{ fontSize: '8.79pt' }}>Mail</Text>
      <Text style={styles.introduce}>{mail}</Text>
    </View>
  </View>
);
const ContactCv: React.FC<IPropContactCv> = (props) => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '0.226cm',
          marginTop: '1.53cm',
        }}
      >
        <Image src="./images/image 51.png" style={styles.image} />
        <Text
          style={{
            marginLeft: '0.4cm',
            fontSize: '13.67pt',
          }}
        >
          Contact
        </Text>
      </View>
      <View
        style={{
          border: '0.5pt solid black',
        }}
      ></View>
      <ContactCvEntry
        address={props.address}
        mobile={props.mobile}
        mail={props.mail}
      />
    </View>
  );
};

export default ContactCv;
