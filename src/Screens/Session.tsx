import React, { createRef, PureComponent } from "react";
import { ImageBackground, StyleProp, View, ViewStyle, TextInput as NativeTextInput, Text, StyleSheet } from "react-native-windows";
import CustomModal from "../Components/CustomModal";
import Background from "../Assets/background-session.webp";
import CustomTextInput from "../Components/Elements/CustomTextInput";
import LoadingButton from "../Components/Elements/LoadingButton";
import { Directive } from "../Scripts/ApiTecnica";
import CustomSnackbar from "../Components/Elements/CustomSnackbar";

type IProps = {
    reVerifySession: ()=>any;
};
type IState = {
    visible: boolean;
    // Form
    formUserName: string;
    formPassword: string;
    // Interface
    isLoading: boolean;
    snackbarShow: boolean;
    snackbarText: string;
};

export default class Session extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: false,
            // Forms
            formUserName: '',
            formPassword: '',
            // Interface
            isLoading: false,
            snackbarShow: false,
            snackbarText: '...'
        };
        this.logInNow = this.logInNow.bind(this);
    }
    private input1 = createRef<NativeTextInput>();
    private input2 = createRef<NativeTextInput>();
    logInNow() {
        if (!this.verifyInputs()) return;
        this.setState({ isLoading: true }, ()=>
            Directive.open(this.state.formUserName, this.state.formPassword)
                .then(()=>this.setState({ isLoading: false }, async()=>{
                    this.props.reVerifySession();
                    setTimeout(()=>this.setState({
                        formUserName: '',
                        formPassword: '',
                        visible: false
                    }), 16);
                }))
                .catch((value)=>{
                    console.log(value.cause);
                    this.setState({
                        isLoading: false,
                        snackbarShow: true,
                        snackbarText: value.cause
                    });
                })
        );
    }
    componentDidUpdate() {
        if (!this.state.visible) {
            if (this.state.formPassword.length !== 0 || this.state.formUserName.length !== 0) {
                this.setState({
                    formUserName: '',
                    formPassword: '',
                    isLoading: false,
                    snackbarShow: false,
                    snackbarText: '...'
                });
            }
        }
    }
    verifyInputs(): boolean {
        var errors: number = 0;
        if (this.state.formUserName.length < 6) {
            errors += 1;
            this.input1.current?.focus();
        }
        if (this.state.formPassword.length < 8) {
            errors += 1;
            (errors == 1)&&this.input2.current?.focus();
        }
        (errors !== 0)&&this.setState({ snackbarShow: true, snackbarText: 'Revise los datos ingresados.' });
        return errors == 0;
    }

    // Controller
    open() {
        this.setState({ visible: true });
    }
    close() {
        this.setState({ visible: false });
    }

    render(): React.ReactNode {
        return(<CustomModal visible={this.state.visible}>
            <ImageBackground source={Background} resizeMode={"cover"} style={{ flex: 2, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                <View focusable={false} style={{ width: '100%', alignItems: 'center' }}>
                    <CustomTitle />
                    <View style={{ marginTop: 16, width: '90%', alignItems: 'center' }}>
                        <CustomTextInput
                            refInputText={this.input1}
                            label={'Nombre de usuario'}
                            autoCapitalize={'none'}
                            style={styles.textInput}
                            value={this.state.formUserName}
                            disable={this.state.isLoading}
                            textContentType={'username'}
                            onChangeText={(text)=>this.setState({ formUserName: text })}
                            returnKeyType={'next'}
                            onSubmitEditing={()=>this.input2.current?.focus()}
                        />
                        <CustomTextInput
                            refInputText={this.input2}
                            label={'Contraseña'}
                            autoCapitalize={'none'}
                            style={styles.textInput}
                            isPassword={true}
                            disable={this.state.isLoading}
                            value={this.state.formPassword}
                            onChangeText={(text)=>this.setState({ formPassword: text })}
                            returnKeyType={'next'}
                            onSubmitEditing={this.logInNow}
                        />
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 16 }}>
                            <LoadingButton
                                title={'Iniciar sesión'}
                                loading={this.state.isLoading}
                                disable={this.state.isLoading}
                                style={styles.buttonLog}
                                onPress={this.logInNow}
                            />
                        </View>
                    </View>
                </View>
                <CustomSnackbar visible={this.state.snackbarShow} message={this.state.snackbarText} onClose={()=>this.setState({ snackbarShow: false })} />
            </ImageBackground>
        </CustomModal>);
    }
}

type IProps2 = { style?: StyleProp<ViewStyle>; };
class CustomTitle extends PureComponent<IProps2> {
    constructor(props: IProps2) {
        super(props);
    }
    private fontSize: number = 28;
    private fontSize2: number = 40;
    private fontWeight: "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined = 'bold';
    render(): React.ReactNode {
        return(<View style={[this.props.style, { alignItems: 'center' }]}>
            <Text style={{ fontWeight: this.fontWeight, fontSize: this.fontSize }}>Bienvenid@ a</Text>
            <Text>
                <Text style={{ fontSize: this.fontSize2, fontWeight: this.fontWeight, color: 'red' }}>Tecnica</Text>
                <Text style={{ fontSize: this.fontSize2, fontWeight: this.fontWeight, color: 'blue' }}>Digital</Text>
            </Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '60%',
        maxWidth: 500,
        marginTop: 8
    },
    buttonLog: {
        width: '40%',
        maxWidth: 300
    }
});