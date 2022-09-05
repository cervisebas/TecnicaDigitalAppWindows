import { decode } from "base-64";
import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { DeviceEventEmitter, Dimensions, EmitterSubscription, FlatList, ListRenderItemInfo, ScaledSize, StyleProp, Text, View, ViewStyle } from "react-native-windows";
import Card1 from "../Components/Elements/Card1";
import UniversalError from "../Components/UniversalError";
import UniversalLoading from "../Components/UniversalLoading";
import { Assist, Groups, Prefences } from "../Scripts/ApiTecnica";
import { DataGroup, Groups as GroupsTypes } from "../Scripts/ApiTecnica/types";

type IProps = {
    style?: StyleProp<ViewStyle>;
    controlLoading: (show: boolean, message: string)=>any;
};
type IState = {
    numColumns: number;
    dataGroups: DataGroup[];
    listGroups: GroupsTypes[];
    isLoading: boolean;
    isError: boolean;
    messageError: string;
};

export default class Page1 extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            numColumns: 1,
            dataGroups: [],
            listGroups: [],
            isLoading: true,
            isError: false,
            messageError: '...'
        };
        this.loadData = this.loadData.bind(this);
        this._changeDimensions = this._changeDimensions.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }
    private event: EmitterSubscription | undefined = undefined;
    private eventD: EmitterSubscription | undefined = undefined;
    private _isMount: boolean = false;
    componentDidMount(): void {
        this._isMount = true;
        this.event = DeviceEventEmitter.addListener('loadNowAll', this.loadData)
        this.eventD = Dimensions.addEventListener('change', this._changeDimensions);
        this._changeDimensions();
        this.loadData();
    }
    componentWillUnmount(): void {
        this._isMount = false;
        this.event?.remove();
        this.eventD?.remove();
    }

    loadData(code?: number | undefined, isRefresh?: boolean): any {
        if (!this._isMount) return;
        (!isRefresh)&&this.setState({ dataGroups: [] });
        this.setState({ isLoading: !isRefresh, isError: false }, ()=>
            Groups.getAll().then((groups)=>
                Assist.getGroups()
                    .then(async(v)=>{
                        if (this._isMount) {
                            const dataGroups = await this.filterData(v);
                            const noConfirm = dataGroups.filter((value)=>value.status !== '1').length;
                            this.setState({ dataGroups, listGroups: groups, isLoading: false });
                            DeviceEventEmitter.emit('update-regist-count', noConfirm);
                            if (code) this.reloadData(code, v);
                        }
                    })
                    .catch((err)=>(this._isMount)&&this.setState({ isLoading: false, isError: true, messageError: err.cause }))
            ).catch((err)=>(this._isMount)&&this.setState({ isLoading: false, isError: true, messageError: err.cause }))
        );
    }
    async filterData(data: DataGroup[]) {
        var prefences = await  Prefences.getAssist();
        if (prefences.length == 0) return data;
        return data.filter((v)=>!!prefences.find((v2)=>v2 == decode(v.curse)));
    }
    reloadData(code: number, newData: DataGroup[]) {
        switch (code) {
            case 1:
                /*if (!this.refViewAssist.current?.state.visible) return;
                var f = newData.find((v)=>this.refViewAssist.current?.state.select.id == v.id);
                if (f) this.refViewAssist.current.updateSelect({
                    id: f.id,
                    curse: decode(f.curse),
                    annotations: f.annotations,
                    date: decode(f.date),
                    hour: decode(f.hour)
                });*/
                break;
        }
    }

    _changeDimensions(size?: { window: ScaledSize; screen: ScaledSize; }) {
        const realWidth = ((size)? size.window.width: Dimensions.get('window').width) - 60;
        const widthComp = 300;
        var numColumns: number = 1;
        var _continue: boolean = true;
        var _divider: number = 2;
        while (_continue) {
            if ((realWidth / _divider) >= widthComp) {
                numColumns++;
                _divider++;
            } else {
                _continue = false;
                this.setState({ numColumns });
            }
        }
    }

    /* ##### FlatList ##### */
    _renderItem({ item }: ListRenderItemInfo<DataGroup>) {
        return(<Card1
            key={`p1-card-${item.id}`}
            numColumns={this.state.numColumns}
            curse={decode(item.curse)}
            annotations={item.annotations}
            date={decode(item.date)}
            hour={decode(item.hour)}
            status={item.status !== '0'}
        />);
    }
    _keyExtractor({ id }: DataGroup) {
        return `p1-card-${id}`;
    }
    _getItemLayout(_data: DataGroup[] | null | undefined, index: number) {
        return {
            length: 150,
            offset: 150 * index,
            index
        };
    }
    /* #################### */

    render(): React.ReactNode {
        return(<View style={[styles.content, this.props.style]}>
            <View style={styles.appBar}>
                <Text style={styles.title}>Registros</Text>
            </View>
            <View style={styles.content2}>
                {(!this.state.isLoading)? <FlatList
                    key={`flatlist-page1-col-${this.state.numColumns}`}
                    data={this.state.dataGroups}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    contentContainerStyle={styles.contentList}
                    numColumns={this.state.numColumns}
                    getItemLayout={this._getItemLayout}
                />: (!this.state.isError)? <UniversalLoading size={60} />:
                <UniversalError message={this.state.messageError} onReload={this.loadData} />}
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    content2: {
        flex: 2,
        width: '100%'
    },
    contentList: {
        paddingBottom: 12,
        paddingRight: 6
    },
    appBar: {
        position: 'relative',
        height: 52,
        width: '100%',
        backgroundColor: '#FF3232',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 16
    }
});