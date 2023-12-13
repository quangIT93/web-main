import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Polygon,
    Svg,
} from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvHeader {
    color: any;
    profile: any;
    fontSize: any;
    profileMore: any;
}
const NameUser: React.FC<ICvHeader> = (props) => {
    const { profile, fontSize, color, profileMore } = props;
    const styles = StyleSheet.create({
        container: {
            // width: '100%',
            height: '269.934',
            marginTop: 20,
            // marginBottom: '15.362pt',
            marginLeft: -30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: '0',
        },
        divInfo: {
            width: '100%',
            marginLeft: '45.839pt',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '43.277pt',
            borderBottom: `2px solid ${color === 1
                ? '#09009B'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000'
                }`,
        },
        name: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
        },
        textName: {
            fontSize: '42pt',
            color:
                color === 1
                    ? '#09009B'
                    : color === 2
                        ? '#0D99FF'
                        : color === 3
                            ? '#FBBC04'
                            : color === 4
                                ? '#5CB265'
                                : '#D80000',
            fontWeight: 'extrabold',
            fontFamily: 'Fahkwang Medium',
            textAlign: 'left',
        },
        textPosition: {
            fontSize: '18pt',
            letterSpacing: '4pt',
            // marginTop: '20pt',
            color: color === 1
                ? '#09009B'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            fontFamily: 'Fahkwang Medium',
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.divInfo}>
                <View style={styles.name}>
                    <View>
                        <Text style={styles.textName}>
                            {profile?.name?.split(' ').length > 2
                                ? profile?.name?.split(' ').slice(0, -2).join(' ')
                                : profile?.name?.split(' ').slice(0, -1).join(' ')}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.textName}>
                            {profile?.name?.split(' ').length > 2
                                ? profile?.name?.split(' ').slice(-2).join(' ')
                                : profile?.name?.split(' ').slice(-1).join(' ')}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textPosition}>{profile?.jobTypeName}</Text>
                </View>
            </View>
        </View>
    );
};

export default NameUser;
