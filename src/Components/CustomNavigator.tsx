import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native-windows";

type IProps = {
    index: number;
    routes: {
        name: string;
        component: React.ReactNode;
    }[];
};
type IState = {};

export default class CustomNavigator extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render(): React.ReactNode {
        return(<View style={styles.content}>
            {this.props.routes.map((val, index)=><View key={val.name} style={[styles.pages, { display: (this.props.index == index)? 'flex': 'none' }]}>
                {val.component}
            </View>)}
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    pages: {
        flex: 2
    }
});