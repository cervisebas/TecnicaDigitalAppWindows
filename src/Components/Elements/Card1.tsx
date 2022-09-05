import React, { PureComponent } from "react";
import { Button, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native-windows";
import Chip from "./Chip";
import SimpleButton from "./SimpleButton";

type IProps = {
    numColumns: number;
    curse: string;
    annotations: number;
    date: string;
    hour: string;
    status: boolean;
    onConfirm?: ()=>any;
    onView?: ()=>any;
};
type IState = {};

export default class Card1 extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render(): React.ReactNode {
        return(<View style={[styles.content0, { width: `${100/this.props.numColumns}%` }]}>
            <View style={[styles.content]}>
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Registro {this.props.curse}</Text>
                    {(this.props.annotations !== 0)&&<Text style={styles.subtitle}>{(this.props.annotations == 1)? `1 anotación`: `${this.props.annotations} anotaciones`}</Text>}
                </View>
                <View style={styles.notesContent}>
                    <Text style={styles.notes}>{`${this.props.date} (${this.props.hour}hs)`}</Text>
                </View>
                <SimpleButton
                    title={(this.props.status)? "VER": "CONFIRMAR"}
                    color={(this.props.status)? '#3DC2FF': undefined}
                    style={styles.button}
                    onPress={(this.props.status)? this.props.onView: this.props.onConfirm}
                />
                <Chip text={(this.props.status)? "Confirmado": "Sin confirmar"} color={(this.props.status)? '#3232FF': undefined} style={styles.chip} />
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    content0: {
        minWidth: 300,
        height: 150,
        paddingLeft: 6,
        paddingTop: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        position: 'relative',
        padding: 8,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 4
    },
    titleContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        paddingTop: 18,
        paddingLeft: 16,
        flexDirection: 'column'
    },
    title: {
        fontSize: 18,
        fontWeight: '500'
    },
    subtitle: {
        fontSize: 11,
        marginLeft: 8,
        marginTop: 4,
        fontWeight: 'normal',
    },
    notesContent: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        alignItems: 'flex-end',
        paddingTop: 22,
        paddingRight: 16,
        flexDirection: 'column'
    },
    notes: {
        fontSize: 14
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 12,
        marginLeft: 16,
        width: 100
    },
    chip: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 12,
        marginRight: 16,
        width: 100
    }
});