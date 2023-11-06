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
import Activity from './sections/Activity';
import LanguageCv from './sections/LanguageCv';
import HobbieCv from './sections/HobbieCv';
import ReferenceCv from './sections/ReferenceCv';

import AbhayaLibreExtraBold from '../Fonts/AbhayaLibreExtraBold.ttf';
import MontserratRegular from '../Fonts/MontserratRegular.ttf';
import MontserratBold from '../Fonts/MontserratBold.ttf';
import MontserratMedium from '../Fonts/MontserratMedium.ttf';
import Experiences from './sections/Experiences';
import SocialCv from './sections/SocialCv';

interface CvTemplate {
  color: any;
  fontSize: number;
  profile: any;
  profileMore: any;
}

const index: React.FC<CvTemplate> = (props) => {
  const { color, fontSize, profile, profileMore } = props;

  const styles = StyleSheet.create({
    page: {
      padding: '2.5cm 1cm',
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
    pageNumber: {
      position: 'absolute',
      fontSize: fontSize - 12,
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    hijob: {
      position: 'absolute',
      fontSize: fontSize - 12,
      bottom: 10,
      // left: 0,
      right: 25,
      textAlign: 'center',
      color: '#000000',
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
    <Page {...props} style={styles.page} scale={1000}>
      <View>
        <View>
          {/* <Image
                    src="https://react-pdf.org/images/logo.png"
                    style={styles.image}
                /> */}
          <View style={styles.container}>
            <HeaderCv color={color} fontSize={fontSize} profile={profile} />
            <View style={styles.content}>
              <View style={{ width: '30%', marginRight: '2.053cm' }}>
                <ProfileCv
                  color={color}
                  fontSize={fontSize}
                  profile={profile}
                />
                {profileMore ? (
                  <ContactCv
                    color={color}
                    fontSize={fontSize}
                    profile={profile}
                  />
                ) : (
                  <></>
                )}

                {profileMore?.profilesSkills &&
                profileMore?.profilesSkills?.length !== 0 ? (
                  <SkillsCv
                    color={color}
                    fontSize={fontSize}
                    profile={profileMore}
                  />
                ) : (
                  <></>
                )}
                {profileMore?.profilesLanguages &&
                profileMore?.profilesLanguages?.length !== 0 ? (
                  <LanguageCv
                    color={color}
                    fontSize={fontSize}
                    profile={profileMore}
                  />
                ) : (
                  <></>
                )}
                {profileMore?.profileHobbies &&
                profileMore?.profileHobbies?.length !== 0 ? (
                  <HobbieCv
                    color={color}
                    fontSize={fontSize}
                    profile={profileMore}
                  />
                ) : (
                  <></>
                )}
                {/* <SocialCv color={color} fontSize={fontSize} /> */}
                {/* </> */}
              </View>
              <View style={{ width: '70%' }}>
                {profileMore?.profilesExperiences &&
                profileMore?.profilesExperiences?.length !== 0 ? (
                  <Experiences
                    color={color}
                    fontSize={fontSize}
                    profile={profileMore}
                  />
                ) : (
                  <></>
                )}
                {profileMore?.profilesEducations &&
                profileMore?.profilesEducations?.length !== 0 ? (
                  <Education
                    color={color}
                    fontSize={fontSize}
                    profile={profileMore}
                  />
                ) : (
                  <></>
                )}
                {profileMore?.profileActivities &&
                profileMore?.profileActivities.length !== 0 ? (
                  <Activity
                    color={color}
                    fontSize={fontSize}
                    profile={profileMore}
                  />
                ) : (
                  <></>
                )}
                {profileMore?.profilesReferences &&
                profileMore?.profilesReferences.length !== 0 ? (
                  <ReferenceCv
                    color={color}
                    fontSize={fontSize}
                    profile={profileMore}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />

      {/* <Text style={styles.hijob}>hijob.site</Text> */}
      <Text
        style={styles.hijob}
        render={({ pageNumber, totalPages }) => `hijob.site`}
        fixed
      />
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
