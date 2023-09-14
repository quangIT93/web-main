import React from 'react';

import { Image, Text, View, StyleSheet } from '@react-pdf/renderer';
interface ICvHeader {
    color: any;
}

const Header: React.FC<ICvHeader> = (props) => {
    const { color } = props
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '9.521cm',
            // marginTop: '32.041pt',
            // paddingLeft: '35.745pt',
        },
        content: {
            width: '100%',
            height: '100%',
            position: 'relative',
        },
        name: {
            color: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
            // marginTop: '12.404px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            // border: '1px solid red',
            width: '100%',
            gap: '-0.5cm'
        },
        lastName: {
            fontSize: 33,
            fontFamily: 'Abhaya Libre ExtraBold',
            width: '100%',
            background: 'red',
            // border: '1px solid black',
        },
        firstName: {
            fontSize: 33,
            fontFamily: 'Abhaya Libre ExtraBold',
            width: '100%',
            // marginBottom: '0.5cm',
            background: 'red',
            // border: '1px solid black',
        },
        subtitle: {
            fontSize: 9,
            justifySelf: 'flex-end',
            fontFamily: 'Montserrat Regular',
            color: '#1B1212',
        },
        bigTitle: {
            fontFamily: 'Montserrat Regular',
            fontSize: 13,
            letterSpacing: '2px',
            color: '#1B1212'
        },
        topLeftDiv: {
            // marginTop: '2.066cm',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            // gap: '0.25cm',
            // border: '1px solid green',
            width: '100%',
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
            width: '0.5px',
            height: '60px',
            backgroundColor: '#282828',
        },
        contact: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.284cm',
            fontSize: '7px',
            fontFamily: 'Montserrat Regular'
        },
        leftDiv: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '9.521cm',
            height: '9.521cm',
            backgroundColor: '#D0E3FF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: '1.136cm',
            paddingRight: '1.136cm',
            gap: '0.5cm',
        },
        rightDiv: {
            position: 'absolute',
            top: 0,
            right: '-1cm',
            width: '5.123cm',
            height: '1.66cm',
            backgroundColor: '#D0E3FF'
        },
        avatarDiv: {
            position: 'absolute',
            top: '1.66cm',
            right: '4.023cm',
            width: '5.802cm',
            height: '5.802cm',
            backgroundColor: '#FFFFFF',
            border: '1px solid #AAAAAA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'contained'
        },
        language: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            bottom: 2,
            left: "55%",
        },
        languageTitle: {
            fontFamily: "Montserrat Bold",
            fontSize: 12,
            letterSpacing: '2px',
        },
        languageDetail: {
            marginTop: '0.319cm',
            display: 'flex',
            flexDirection: 'row'
        },
        languageDetailLeft: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
        },
        languageDetailRight: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            marginLeft: '0.345cm'
        },
        borderBot: {
            width: 63.42,
            height: 2.25,
            backgroundColor: '#000000',
            marginTop: '0.12cm'
        }
    });
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftDiv}>
                    <View style={styles.topLeftDiv}>
                        <Text style={styles.bigTitle}>HELLO! I'M</Text>
                        <View style={styles.name}>
                            <Text style={styles.lastName}>Dang</Text>
                            <Text style={styles.firstName}>Van Abc</Text>
                        </View>
                        <Text style={styles.bigTitle}>SOFTWARE ENGINEER</Text>
                    </View>
                    <View style={styles.botLeftDiv}>
                        <View style={styles.line}></View>
                        <View style={styles.contact}>
                            <Text style={styles.subtitle}>+84 123 456 789</Text>
                            <Text style={styles.subtitle}>tranvanb@gmail.com</Text>
                            <Text style={styles.subtitle}>Ho Chi Minh City</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.avatarDiv}>
                    <Image
                        src="https://react-pdf.org/images/logo.png"
                        style={styles.image}
                    />
                </View>
                <View style={styles.language}>
                    <View>
                        <Text style={styles.languageTitle}>LANGUAGE</Text>
                    </View>
                    <View style={styles.languageDetail}>
                        <Text style={styles.languageDetailLeft}>ENGLISH</Text>
                        <Text style={styles.languageDetailRight}>Ielts overal score: 7.0</Text>
                    </View>
                    <View style={styles.borderBot}></View>
                </View>
                <View style={styles.rightDiv}>
                </View>
            </View>
        </View>
    )
};

export default Header;