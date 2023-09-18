import React, { memo } from 'react';

import './style.scss';
import { Avatar } from '@mui/material';
import {
  Text,
  Font,
  Page,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import ContactCv from './sections/ContactCv';
import ProfileCv from './sections/ProfileCv';
import SkillsCv from './sections/SkillsCv';
import HeaderCv from '../CvTemplate2/sections/HeaderCv';
import Education from './sections/EducationCv';

import AbhayaLibreExtraBold from '../Fonts/AbhayaLibreExtraBold.ttf';
import MontserratRegular from '../Fonts/MontserratRegular.ttf';
import MontserratBold from '../Fonts/MontserratBold.ttf';
import MontserratMedium from '../Fonts/MontserratMedium.ttf';
import Experiences from './sections/Experiences';
import SocialCv from './sections/SocialCv';

interface CvTemplate {
  color: any;
  fontSize: number;
}

const index: React.FC<CvTemplate> = (props) => {
  const { color, fontSize } = props;

  const styles = StyleSheet.create({
    page: {
      padding: '1cm',
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

  Font.register({
    family: 'Montserrat Regular',
    src: MontserratRegular,
  });

  Font.register({
    family: 'Montserrat Bold',
    src: MontserratBold,
  });

  Font.register({
    family: 'Montserrat Medium',
    src: MontserratMedium,
  });

  const Resume = (props: any) => (
    <Page {...props} style={styles.page}>
      <View>
        <View>
          {/* <Image
                    src="https://react-pdf.org/images/logo.png"
                    style={styles.image}
                /> */}
          <View style={styles.container}>
            <HeaderCv color={color} fontSize={fontSize} />
            <View style={styles.content}>
              <View style={{ width: '30%', marginRight: '2.053cm' }}>
                <ProfileCv color={color} fontSize={fontSize} />
                <ContactCv
                  address="tphcm"
                  mobile="0911893144"
                  mail="khong co"
                  color={color}
                  fontSize={fontSize}
                />
                <SkillsCv color={color} fontSize={fontSize} />
                <SocialCv color={color} fontSize={fontSize} />
                {/* </> */}
              </View>
              <View style={{ width: '70%' }}>
                <Experiences color={color} fontSize={fontSize} />
                <Education color={color} fontSize={fontSize} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );

  return (
    <Document
      author="Luke Skywalker"
      keywords="awesome, resume, start wars"
      subject="The resume of Luke Skywalker"
      title="Resume"
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid #000000',
      }}
    >
      <Resume size="A4" color={color} fontSize={fontSize} />
      {/* <Resume orientation="landscape" size="A4" />
    <Resume size={[380, 1250]} /> */}
    </Document>
  );
};

export default index;
