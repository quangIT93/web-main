import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Polygon,
    Svg,
    Circle,
} from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvHeader {
    color: any;
    profile: any;
    fontSize: any;
    profileMore: any;
}
const AvatarUser: React.FC<ICvHeader> = (props) => {
    const { profile, fontSize, color, profileMore } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '180pt',
            marginBottom: '60pt',
            // marginTop: '20pt',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: '0',
            // border: '1px solid red',
        },
        divImage: {
            backgroundColor: '#fff',
            borderRadius: '50%',
            minHeight: '180pt',
            minWidth: '180pt',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 4,
            border: '8pt solid #FFFFFF',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            backgroundColor: color === 1
                ? '#09009B'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000'
        },
    });
    return (
        <View style={styles.container}>
            <Svg viewBox="0 0 1 10"
                style={{
                    position: 'absolute',
                    transform: 'rotate(15.5deg)',
                    top: '-35pt',
                    bottom: '35pt',
                    left: '-45%',
                    zIndex: 5,
                    // border: '1px solid red'
                }}
            >
                <Circle
                    cx="5"
                    cy="3"
                    r="2.5"
                    fill={
                        color === 1
                            ? '#09009B'
                            : color === 2
                                ? '#0D99FF'
                                : color === 3
                                    ? '#FBBC04'
                                    : color === 4
                                        ? '#5CB265'
                                        : '#D80000'
                    }
                    stroke={
                        color === 1
                            ? '#09009B'
                            : color === 2
                                ? '#0D99FF'
                                : color === 3
                                    ? '#FBBC04'
                                    : color === 4
                                        ? '#5CB265'
                                        : '#D80000'
                    }
                />
            </Svg>
            <Svg viewBox="0 0 1 10"
                style={{
                    position: 'absolute',
                    transform: 'rotate(-15.5deg)',
                    top: '35pt',
                    bottom: '-35pt',
                    left: '-45%',
                    zIndex: 5,
                    // border: '1px solid red'
                }}
            >
                <Circle
                    cx="5"
                    cy="7"
                    r="2.5"
                    fill={
                        color === 1
                            ? '#09009B'
                            : color === 2
                                ? '#0D99FF'
                                : color === 3
                                    ? '#FBBC04'
                                    : color === 4
                                        ? '#5CB265'
                                        : '#D80000'
                    }
                    stroke={
                        color === 1
                            ? '#09009B'
                            : color === 2
                                ? '#0D99FF'
                                : color === 3
                                    ? '#FBBC04'
                                    : color === 4
                                        ? '#5CB265'
                                        : '#D80000'
                    }
                />
            </Svg>
            <View style={styles.divImage}>
                <View
                    style={{
                        // padding: '9.955pt',
                        borderRadius: '50%',
                        backgroundColor: '#ccc',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Image
                        src={{
                            uri:
                                profile.avatarPath !== null ? profile.avatarPath : null_avatar,
                            method: 'GET',
                            body: '',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Cache-Control': 'no-cache',
                                // 'Access-Control-Allow-Methods': '*',
                                // 'Access-Control-Allow-Headers': '*',
                            },
                        }}
                        style={styles.image}
                    />
                </View>
            </View>
        </View>
    );
};

export default AvatarUser;
