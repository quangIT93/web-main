/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

interface ICvSkills {
    color: any;
    profile: any;
}

const Hobbies: React.FC<ICvSkills> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginBottom: '22.426pt',
            // border: '1px solid red'
        },
        content: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // gap: '20.398pt',
        },
        title: {
            fontFamily: 'Montserrat Bold',
            fontSize: 14,
            marginBottom: '14.469pt',
            width: '100%',
            textTransform: 'uppercase',
            color: color === 1 ?
                "#505050" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
        },
        profile: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            width: '100%',
            textAlign: 'justify',
            color: '#777878',
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Hobbies</Text>
                <Text style={styles.profile}>
                    {profile?.profileHobbies?.description}
                </Text>
            </View>
        </View>
    );
};

export default Hobbies;
