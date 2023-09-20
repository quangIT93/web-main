/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Line, Circle, Svg } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';
import moment from 'moment';

interface ICvExperience {
    color: any;
    profile: any;
}

const References: React.FC<ICvExperience> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: '24.69pt',
            marginLeft: '0.9cm',
        },
        reference: {
            display: 'flex',
            flexDirection: 'row',
            // border: '1px solid red'
        },
        not: {
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'flex-end',
            // border: '1px solid red'
            // border: '1px solid red',
            width: 10,
            // fontSize: 20,
            // gap: '0.516cm'
            position: 'absolute',
            left: '-4.25px',
            top: 0,
            zIndex: 2
        },
        line: {
            width: 1,
            height: '90%',
            backgroundColor: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
            marginRight: '0.671cm',
        },
        lineWhite: {
            width: 1,
            height: '70%',
            backgroundColor: '#FFFFFF',
            marginRight: '0.671cm',
            zIndex: 1
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            // border: '1px solid red'
        },
        right: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',
            // marginLeft: '0.671cm',
            marginBottom: 5,
            // border: '1px solid red',
            position: 'relative',
        },
        time: {
            fontFamily: "Montserrat Regular",
            fontSize: 11,
            letterSpacing: '2px',
            marginBottom: '2px',
        },
        school: {
            fontFamily: "Montserrat Bold",
            fontSize: 10,
            // flexGrow: 1,
            textAlign: 'justify',
            // wordBreak: "break-all",
            width: '100%',
        },
        detail: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            // wordBreak: "break-word",
            width: '100%',
            // flexGrow: 1,
            textAlign: 'justify'
            // border: '1px solid red'
        },
        achievements: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            // marginTop: '16.92pt',
            width: '100%',
            // border: '1px solid red'
        },
        title: {
            fontFamily: "Montserrat Bold",
            fontSize: 12,
            letterSpacing: '2px',
            marginBottom: '0.658cm',
            textTransform: 'uppercase',
            color: color === 1 ?
                "#252525" :
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
            <Text style={styles.title}>References</Text>
            {
                profile?.profilesReferences && profile?.profilesReferences.map((reference: any, i: any) => {
                    return (
                        <View style={styles.reference} key={i}>
                            <View style={styles.right}>
                                <Svg viewBox="0 0 2 2" style={styles.not}>
                                    <Circle
                                        cx="1"
                                        cy="1"
                                        r="0.5"
                                        fill={
                                            color === 1 ?
                                                "#252525" :
                                                color === 2 ?
                                                    "#0D99FF" :
                                                    color === 3 ?
                                                        "#FBBC04" :
                                                        color === 4 ?
                                                            "#5CB265" : "#D80000"
                                        }
                                        stroke="none"
                                    />
                                </Svg>
                                <View style={
                                    i + 1 === profile?.profilesReferences.length ?
                                        styles.lineWhite :
                                        styles.line
                                } >
                                </View>
                                <View>
                                    <Text style={styles.school}>{reference?.fullName}</Text>
                                    <Text style={styles.detail}>{reference?.phone}</Text>
                                    <Text style={styles.detail}>{reference?.email}</Text>
                                    {/* <View style={styles.achievements}>
                                <Text style={styles.detail}>
                                    {`(*)Achievements: `}
                                </Text>
                                <List>
                                    {reference.achievements.map((iem: any, i: any) => (
                                        <Item key={i}>{iem}</Item>
                                    ))}
                                </List>
                            </View> */}
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