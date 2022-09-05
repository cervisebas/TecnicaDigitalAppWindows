import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import CustomModal from '../Components/CustomModal';
// Images
import backgroundImage from "../Assets/background-loading.webp";
import logo from '../Assets/logo.webp';
import { ActivityIndicator, Image, Text } from 'react-native-windows';

type IProps = {};
type IState = {
    visible: boolean;
    showMessage: boolean;
    hideLoadinginMessage: boolean;
    message: string;
};

export default class ScreenLoading extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: true,
            showMessage: false,
            hideLoadinginMessage: true,
            message: ''
        };
    }

    // Controller
    open(message?: string, hideLoadinginMessage?: boolean) {
        if (message) {
            if (hideLoadinginMessage !== undefined) {
                return this.setState({
                    visible: true,
                    showMessage: false,
                    message,
                    hideLoadinginMessage
                });
            }
            return this.setState({
                visible: true,
                showMessage: false,
                message
            });
        }
        this.setState({
            visible: true,
            showMessage: false,
            message: ''
        });
    }
    updateMessage(message: string, hideLoadinginMessage?: boolean) {
        if (hideLoadinginMessage !== undefined) return this.setState({
            showMessage: true,
            message,
            hideLoadinginMessage
        });
        this.setState({
            showMessage: true,
            message
        });
    }
    hideMessage() {
        this.setState({
            showMessage: false,
            hideLoadinginMessage: true,
            message: ''
        });
    }
    close() {
        this.setState({
            visible: false,
            hideLoadinginMessage: true,
            showMessage: false,
            message: ''
        });
    }

    render(): React.ReactNode {
        return(<CustomModal visible={this.state.visible}>
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <View style={styles.contentLoading}>
                    {(!this.state.showMessage || !this.state.hideLoadinginMessage)&&<ActivityIndicator size={'large'} animating={true} color={'#FF3232'} />}
                    {(this.state.showMessage)&&<Text
                        style={[styles.text, (!this.state.hideLoadinginMessage)&&{
                            fontSize: 14,
                            marginTop: 16
                        }]}>
                        {this.state.message}
                    </Text>}
                </View>
            </ImageBackground>
        </CustomModal>);
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: -180
    },
    contentLoading: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 120,
        width: '100%',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        width: '90%',
        textAlign: 'center'
    }
});