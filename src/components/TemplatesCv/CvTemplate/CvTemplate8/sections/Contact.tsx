import React, { useEffect } from 'react';

import { Image, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

import mail8 from '../../images/mail_cv8.png';
import phone8 from '../../images/phone_cv8.png';
import place from '../../images/place.png';
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
            fontFamily: 'Montserrat Regular',
            color: '#505050',
            textDecoration: 'none',
            // textTransform: 'uppercase',
            textAlign: 'justify',
            marginLeft: '9.766pt',
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
            height: '15.89pt',
            objectFit: 'contained',
        },
        icon2: {
            height: '10.216pt',
            objectFit: 'contained',
            // marginLeft: '4pt',
            // marginRight: '1pt',
        },
        icon3: {
            height: '17.861pt',
            objectFit: 'contained',
            // marginLeft: '5pt',
            // marginRight: '5pt',
        },
        title: {
            fontFamily: 'Montserrat Bold',
            fontSize: 14,
            marginBottom: '18.936pt',
            textTransform: 'uppercase',
            color: color === 1 ?
                "#505050" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact</Text>
            <View style={styles.content}>
                <View style={styles.item}>
                    <View style={styles.iconFr}>
                        <Image style={styles.icon1} src={phone8} />
                    </View>
                    <Text style={styles.subtitle}>
                        {profile?.phone}
                    </Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.iconFr}>
                        <Image style={styles.icon2} src={mail8} />
                    </View>
                    <Text style={styles.subtitle}>
                        {profile?.email}
                    </Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.iconFr}>
                        <Image style={styles.icon3} src={place} />
                    </View>
                    <Text style={styles.subtitle}>
                        {profile?.addressText?.fullName}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Contact;
