import React, { useEffect } from 'react';

import { Image, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

import fb from '../../images/fb.png';
import linkedin from '../../images/in.png';
interface ICvHeader {
    color: any;
    profile: any;
}

const Contact: React.FC<ICvHeader> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginBottom: '25.66pt',
            // marginTop: '32.041pt',
            // paddingLeft: '35.745pt',
            // border: '1px solid red'
        },
        content: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8.777pt',
            borderLeftWidth: '1px',
            borderLeftColor: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
            // paddingTop: '47,291pt',
            // paddingLeft: '103.428pt',
            // border: '1px solid green'
        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingLeft: '11.365pt',
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
        lastName: {
            fontSize: 33,
            fontFamily: 'OpenSans-Regular',
            width: '100%',
            textTransform: 'uppercase',
            // background: 'red',
            // border: '1px solid black',
        },
        firstName: {
            fontSize: 29,
            fontFamily: 'OpenSans-Bold',
            width: '100%',
            letterSpacing: '2px',
            // marginBottom: '0.5cm',
            // background: 'red',
            // border: '1px solid black',
        },
        subtitle: {
            fontFamily: "Montserrat Regular",
            fontSize: 10,
            textAlign: 'justify',
            justifySelf: 'flex-end',
            color: '#4A4747',
            textDecoration: 'none',
        },
        botLeftDiv: {
            // marginTop: '0.553cm',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            // marginBottom: '46.086px',
            gap: '0.418cm',
        },
        line: {
            width: '100%',
            height: '1px',
            backgroundColor: color === 1
                ? '#213555'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            marginTop: '14.411pt',
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
    });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.item}>
                    <Text style={styles.subtitle}>
                        {profile?.addressText?.fullName}
                    </Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.subtitle}>
                        {profile?.phone}
                    </Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.subtitle}>
                        {profile?.email}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Contact;
