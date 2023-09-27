import React, { useEffect } from 'react';

import { Image, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

import mail9 from '../../images/mail9.png';
import phone9 from '../../images/phone9.png';
import place9 from '../../images/place9.png';
import fb9 from '../../images/fb9.png';
interface ICvHeader {
    color: any;
    profile: any;
}

const Contact: React.FC<ICvHeader> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginBottom: '22.426pt',
            // marginTop: '32.041pt',
            // paddingLeft: '35.745pt',
            // border: '1px solid red'
        },
        content: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '7.264pt',

            // paddingTop: '47,291pt',
            // paddingLeft: '103.428pt',
            // border: '1px solid green'
        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '14.638pt',
            width: '100%',
        },
        name: {
            color:
                color === 1
                    ? '#213555'
                    : color === 2
                        ? '#0D99FF'
                        : color === 3
                            ? '#FBBC04'
                            : color === 4
                                ? '#5CB265'
                                : '#D80000',
            // marginTop: '12.404px',
            // border: '1px solid red',
            width: '100%',
        },
        subtitle: {
            fontSize: 9,
            fontFamily: 'OpenSans-Regular',
            color: '#505050',
            textDecoration: 'none',
            // textTransform: 'uppercase',
            textAlign: 'justify',
        },
        contact: {
            marginTop: '15.094pt',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.284cm',
            fontSize: '7px',
            fontFamily: 'OpenSans-Regular',
        },
        iconFr: {
            width: '1cm',
            height: '1cm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // border: '1px solid red',
        },
        icon1: {
            height: '5.308pt',
            objectFit: 'contained',
        },
        icon2: {
            height: '16.959pt',
            objectFit: 'contained',
            // marginLeft: '4pt',
            // marginRight: '1pt',
        },
        icon3: {
            height: '15.743pt',
            objectFit: 'contained',
            // marginLeft: '5pt',
            // marginRight: '5pt',
        },
        title: {
            fontFamily: 'OpenSans-Semi-Bold',
            fontSize: 15,
            width: '53%',
            marginBottom: '23.191pt',
            textTransform: 'uppercase',
            color: color === 1
                ? '#152D35'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            paddingTop: '7.211pt',
            paddingBottom: '7.211pt',
            paddingLeft: '5.954pt',
            paddingRight: '5.954pt',
            backgroundColor: '#D4ECDD'
        },
        infoFr: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '4.638pt',
        },
        subtitleIcon: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 11,
            textAlign: 'justify',
            color: '#152D35',
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact</Text>
            <View style={styles.content}>
                <View style={styles.item}>
                    <View style={styles.iconFr}>
                        <Image style={styles.icon3} src={place9} />
                    </View>
                    <View style={styles.infoFr}>
                        <Text style={styles.subtitleIcon}>
                            Address
                        </Text>
                        <Text style={styles.subtitle}>
                            {profile?.addressText?.fullName}
                        </Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.iconFr}>
                        <Image style={styles.icon1} src={phone9} />
                    </View>
                    <View style={styles.infoFr}>
                        <Text style={styles.subtitleIcon}>
                            Phone
                        </Text>
                        <Text style={styles.subtitle}>
                            {profile?.phone}
                        </Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.iconFr}>
                        <Image style={styles.icon2} src={mail9} />
                    </View>
                    <View style={styles.infoFr}>
                        <Text style={styles.subtitleIcon}>
                            Email
                        </Text>
                        <Text style={styles.subtitle}>
                            {profile?.email}
                        </Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.iconFr}>
                        <Image style={styles.icon2} src={fb9} />
                    </View>
                    <View style={styles.infoFr}>
                        <Text style={styles.subtitleIcon}>
                            Facebook
                        </Text>
                        <Link style={styles.subtitle} src={profile?.facebook}>
                            Facebook
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Contact;
