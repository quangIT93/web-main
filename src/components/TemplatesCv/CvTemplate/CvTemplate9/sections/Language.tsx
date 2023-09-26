import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

interface ICvEducation {
    color: any;
    profile: any
}

const Languages: React.FC<ICvEducation> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginBottom: '24.235pt',
        },
        content: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // gap: '20.712pt',
        },
        language: {
            display: 'flex',
            flexDirection: 'column',
            // gap: '8pt',
            marginBottom: 10,
            // border: '1px solid red'
        },
        top: {
            marginBottom: '8.17pt',
        },
        bot: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            // marginLeft: '0.658cm'
        },
        line: {
            width: '79.107pt',
            height: '4px',
            backgroundColor: color === 1
                ? '#D4ECDD'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            borderRadius: '2px',
        },
        name: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 11,
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#152D35',
        },
        detail: {
            fontFamily: "OpenSans-Regular",
            fontSize: 9,
            width: '100%',
            textAlign: 'justify',
            color: '#3B3A3C',
            // border: '1px solid red'
        },
        title: {
            fontFamily: 'OpenSans-Semi-Bold',
            fontSize: 15,
            width: '65%',
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
        languageTop: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '9.702pt',
            gap: '14.426pt'
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Languages</Text>
                {
                    profile?.profilesLanguages && profile?.profilesLanguages?.map((item: any, i: any) => {
                        return (
                            <View style={styles.language} key={i}>
                                <View style={styles.languageTop}>
                                    <Text style={styles.name}>{item?.languageName}</Text>
                                    <View style={styles.line}></View>
                                </View>
                                <Text style={styles.detail}>{item?.dataLevel?.data}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
};

export default Languages