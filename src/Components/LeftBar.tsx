import React, { PureComponent, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Pressable, FlatList, ListRenderItemInfo } from "react-native-windows";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import ButtonBar from "./ButtonBar";

type IProps = {
    navTo: (page: string)=>any;
    indexActive: number;
};
type IState = {
    widthBar: number;
    extend: boolean;
};

type CardItem = {
    id: string;
    title: string;
    icon: React.ReactNode;
    page: string;
};

export default class LeftBar extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            widthBar: 60,
            extend: false
        }
        this._onPress = this._onPress.bind(this);
        this._hideNow = this._hideNow.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }
    private buttonsList: CardItem[] = [
        { id: 'button-bar-1', title: 'Registros', icon: <>&#xEC25;</>, page: 'Regists' },
        { id: 'button-bar-2', title: 'Grupos', icon: <>&#xE902;</>, page: 'Groups' },
        { id: 'button-bar-3', title: 'Horarios', icon: <>&#xEE93;</>, page: 'Times' },
        { id: 'button-bar-4', title: 'Lista de estudiantes', icon: <>&#xE8FD;</>, page: 'StudentsList' },
        { id: 'button-bar-5', title: 'Directivos', icon: <>&#xE7EF;</>, page: 'Directives' },
        { id: 'button-bar-6', title: 'Registro de actividad', icon: <>&#xE759;</>, page: 'Activities' },
    ];

    componentDidUpdate(_prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
        if (this.state.widthBar == 60 && prevState.extend == true)
            this.setState({ extend: false });
        else if (this.state.widthBar == 250 && prevState.extend == false) 
            this.setState({ extend: true });
    }
    _onPress() {
        this.setState({ widthBar: (this.state.widthBar == 60)? 250: 60 });
    }
    _hideNow() {
        this.setState({ widthBar: 60, extend: false });
    }
    _keyExtractor(item: CardItem) {
        return item.id;
    }
    _renderItem({ item, index }: ListRenderItemInfo<CardItem>) {
        return(<ButtonBar
            key={item.id}
            title={item.title}
            icon={item.icon}
            style={styles.menuAction}
            extend={this.state.extend}
            active={this.props.indexActive == index}
            onPress={()=>{
                this.props.navTo(item.page);
                this._hideNow();
            }}
        />);
    }
    render(): React.ReactNode {
        return(<>
            <ViewBackdrop open={this.state.extend} onPress={this._hideNow} />
            <ViewAnimated style={styles.leftBar} width={this.state.widthBar} hideNow={this._hideNow}>
                <View style={styles.appBar}>
                    <ButtonBar
                        title={'Esconder'}
                        icon={<>&#xE700;</>}
                        color={'#FFFFFF'}
                        style={styles.menuAction}
                        extend={this.state.extend}
                        active={false}
                        onPress={this._onPress}
                    />
                </View>
                <FlatList
                    data={this.buttonsList}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    style={styles.separate}
                    renderItem={this._renderItem}
                />
            </ViewAnimated>
        </>);
    }
}

const ViewAnimated = React.memo((props: { width: number; style: StyleProp<ViewStyle>; hideNow?: ()=>any; children: React.ReactNode; })=>{
    const widthBar = useSharedValue(props.width);
    const animatedStyles = useAnimatedStyle(()=>({ width: withSpring(widthBar.value, { mass: 0.5 }) }), [props.width]);
    const [isEnableHide, setEnableHide] = useState(false);
    useEffect(()=>{
        widthBar.value = props.width;
        if (props.width !== 60) setTimeout(()=>setEnableHide(true), 300); else setEnableHide(false);
    }, [props.width]);
    return(<Animated.View
        style={[props.style, animatedStyles]}
        // @ts-expect-error
        onMouseLeave={(isEnableHide)? props.hideNow: undefined}
    >
        {props.children}
    </Animated.View>);
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ViewBackdrop = React.memo((props: { open: boolean; onPress?: ()=>any; })=>{
    const [display, setDisplay] = useState<'none' | 'flex' | undefined>('flex');

    const opacity = useSharedValue((props.open)? 1: 0);
    const animatedStyles = useAnimatedStyle(()=>({ opacity: withSpring(opacity.value) }), [props.open]);

    useEffect(()=>{
        if (!props.open) setTimeout(()=>setDisplay('none'), 300); else setDisplay('flex');
        opacity.value = (props.open)? 1: 0;
    }, [props.open]);

    return(<AnimatedPressable
        style={[styles.backdrop, animatedStyles, { display }]}
        onPress={props.onPress}
    />);
});

const styles = StyleSheet.create({
    leftBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 0,
        },
        shadowOpacity: 0.75,
        shadowRadius: 3,
        elevation: 3
    },
    menuAction: {
        overflow: 'hidden',
        borderRadius: 4,
        marginTop: 8,
        padding: 8,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    separate: {
        marginTop: 12
    },
    appBar: {
        position: 'relative',
        height: 52,
        width: '100%',
        backgroundColor: '#FF3232',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '110%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});