import React from 'react';
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

import ProfileCv from './ProfileCv';
import SkillsCv from './SkillsCv';

//@ts-ignore
import { spacing } from '../Styles';

import { Settings, ShowForm } from '../Setting/settingsSlice';
import ContactCv from './ContactCv';

const styles = StyleSheet.create({
  page: {
    padding: '3cm 1cm',
  },
  container: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // flexDirection: 'row',

    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // backgroundColor: 'blue',
    width: '100%',
    flexDirection: 'row',
    height: 'auto',
  },
  content: {
    display: 'flex',
    // backgroundColor: 'green',
    flexDirection: 'row',
    // height: '100%',
  },
});

const Theme1 = () => {
  return (
    <Document
      author="Luke Skywalker"
      keywords="awesome, resume, start wars"
      subject="The resume of Luke Skywalker"
      title="Resume"
    >
      <Page style={styles.page}>
        <View style={styles.container}>
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
          <View style={styles.content}>
            <View style={{ width: '5.053cm', marginRight: '2.053cm' }}>
              <ProfileCv />
              <ContactCv address="tphcm" mobile="0911893144" mail="khong co" />
              <SkillsCv />
              {/* </> */}
            </View>
            <View style={{ width: 'auto' }}>
              <SkillsCv />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Theme1;
