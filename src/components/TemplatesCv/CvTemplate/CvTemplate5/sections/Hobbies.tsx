/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';

interface ICvSkills {
    color: any;
    profile: any;
}

const Hobbies: React.FC<ICvSkills> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: '24.69pt',
            // marginLeft: '0.9cm',
            // border: '1px solid red'
        },
        title: {
            fontFamily: 'Montserrat Regular',
            fontSize: 13,
            width: '159.407pt',
            textAlign: 'center',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color:
                color === 1
                    ? '#252525'
                    : color === 2
                        ? '#0D99FF'
                        : color === 3
                            ? '#FBBC04'
                            : color === 4
                                ? '#5CB265'
                                : '#D80000',
        },
        profile: {
            fontFamily: 'Montserrat Regular',
            fontSize: 9,
            color: '#777878',
            width: '100%',
            textAlign: 'justify',
            marginLeft: '9.141pt'
            // border: '1px solid red'
        },
        borderBot: {
            width: '159.407pt',
            height: 1.25,
            backgroundColor: color === 1 ?
                "#112D4E" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
            marginTop: '6.745pt',
            marginBottom: '0.476cm'
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>HOBBIES</Text>
            <View style={styles.borderBot}></View>
            <Text style={styles.profile}>
                {profile?.profileHobbies?.description}
            </Text>
        </View>
    );
};

export default Hobbies;
