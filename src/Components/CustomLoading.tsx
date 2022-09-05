import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native-windows";
import CustomModal from "./CustomModal";

type IProps = {};
type IState = {
    visible: boolean;
    message: string;
};

export default class CustomLoading extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: false,
            message: '...'
        };
        this.close = this.close.bind(this);
    }
    open(message: string) {
        this.setState({
            visible: true,
            message
        });
    }
    close() {
        this.setState({
            visible: false
        });
    }
    render(): React.ReactNode {
        return(<CustomModal visible={this.state.visible} style={{ zIndex: 90 }}>
            <View style={styles.content}>
                <View style={styles.dialog}>
                    <ActivityIndicator
                        animating={true}
                        color={'#FF3232'}
                        size={'large'}
                        style={styles.loading}
                    />
                    <Text style={styles.message}>{this.state.message}</Text>
                </View>
            </View>
        </CustomModal>);
    }
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    dialog: {
        maxWidth: 280,
        minWidth: 220,
        height: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 16
    },
    loading: {
        marginLeft: 12
    },
    message: {
        marginLeft: 16,
        fontSize: 16
    }
});