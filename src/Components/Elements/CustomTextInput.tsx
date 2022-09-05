import React, { PureComponent } from "react";
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleProp, StyleSheet, TextInput as TextInputNative, TextStyle } from "react-native-windows";

type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.Component<infer TProps, any> ? TProps : TComponentOrTProps;

type IProps = {
    label: string;
    value: string;
    isPassword?: boolean;
    keyboardType?: KeyboardTypeOptions;
    disable?: boolean;
    returnKeyType?: ReturnKeyTypeOptions;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    textContentType?: ExtractProps<TextInputNative>['textContentType'];
    style?: StyleProp<TextStyle>;
    onChangeText: (text: string)=>any;
    onSubmitEditing?: ()=>any;
    refInputText: React.RefObject<TextInputNative>;
};
type IState = {};

export default class CustomTextInput extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render(): React.ReactNode {
        return(<TextInputNative
            ref={this.props.refInputText}
            placeholder={this.props.label}
            secureTextEntry={!!this.props.isPassword}
            keyboardType={this.props.keyboardType}
            textContentType={(this.props.isPassword)? 'password': this.props.textContentType}
            editable={!this.props.disable}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.props.onSubmitEditing}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            autoCapitalize={this.props.autoCapitalize}
            autoComplete={'off'}
            autoCorrect={false}
            style={[styles.text, this.props.style]}
        />);
    }
}
const styles = StyleSheet.create({
    text: {
        borderRadius: 4,
        overflow: 'hidden'
    }
});