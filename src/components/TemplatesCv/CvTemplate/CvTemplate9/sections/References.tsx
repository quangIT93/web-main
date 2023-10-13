/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Circle, Svg, Polygon } from '@react-pdf/renderer';

import moment from 'moment';

interface ICvExperience {
    color: any;
    profile: any;
}

const References: React.FC<ICvExperience> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginBottom: '24.235pt',
            // paddingLeft: '0.9cm',
            // border: '1px solid red',
        },
        activity: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '15.263pt'
            // border: '1px solid red'
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            // border: '1px solid red',
            transform: 'translateX(-8%)',
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            // marginLeft: '0.671cm',
            // marginBottom: 5,
            // marginLeft: '34.638pt',
            // border: '1px solid red',
            position: 'relative',
        },
        time: {
            fontFamily: "Montserrat Semi Bold",
            fontSize: 9,
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#777878',
        },
        school: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 11,
            textAlign: 'justify',
            color: '#152D35',
            width: '100%',
            // border: '1px solid red',

        },
        detail: {
            fontFamily: "OpenSans-Regular",
            fontSize: 9,
            width: '100%',
            textAlign: 'justify',
            color: '#3B3A3C',
            // border: '1px solid red'
        },
        achievements: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 9,
            // marginTop: '16.92pt',
            width: '100%',
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
        botInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            // border: '1px solid red',
        },
        topInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: '7.66pt',
        },
        timeContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
        },
        not: {
            width: 15,
            borderRadius: '50%',
        },
        line: {
            width: '4px',
            height: '1x',
            backgroundColor: '#777878'
        },
        timeCompany: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '11.617pt',
            gap: '128pt',
        },
        company: {
            fontFamily: "OpenSans-Semi-Bold-Italic",
            fontSize: 9,
            maxWidth: '40%',
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#777878',
            // border: '1px solid red',
            // fontStyle: 'italic'
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>References</Text>
            {
                profile?.profilesReferences && profile?.profilesReferences.map((item: any, i: any) => {
                    return (
                        <View style={styles.activity} key={i}>
                            <View style={styles.right}>
                                <View style={styles.topInfo}>
                                    <Text style={styles.school}>{item?.fullName}</Text>
                                </View>
                                <View style={styles.botInfo}>
                                    <Text style={styles.detail}>{item?.phone}</Text>
                                    <Text style={styles.detail}>{item?.email}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
};

export default References;