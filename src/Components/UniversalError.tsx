import React, { PureComponent } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native-windows";
import IconButton from "./Elements/IconButton";

type IProps = {
    message: string;
    size?: number | "large" | "small";
    style?: StyleProp<ViewStyle>;
    onReload?: ()=>any;
};
type IState = {};

export default class UniversalError extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render(): React.ReactNode {
        return(<View style={[styles.content, this.props.style]}>
            <View style={styles.content2}>
                <Text style={styles.icon}>&#xE783;</Text>
                <Text style={styles.text}>{this.props.message}</Text>
                <IconButton icon={<>&#xE895;</>} style={styles.button} onPress={this.props.onReload} />
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content2: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: {
        fontSize: 48,
        fontFamily: 'Segoe MDL2 Assets'
    },
    text: {
        fontSize: 14,
        marginTop: 10
    },
    button: {
        marginTop: 12
    }
});