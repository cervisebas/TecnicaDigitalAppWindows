import React, { createRef, PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import LeftBar from "./Components/LeftBar";
import Page1 from "./Screens/Page1";
import Page2 from "./Screens/Page2";
import Page3 from "./Screens/Page3";
import Page4 from "./Screens/Page4";
import Others from "./Others";
import CustomNavigator from "./Components/CustomNavigator";
import Page5 from "./Screens/Page5";
import Page6 from "./Screens/Page6";
import CustomLoading from "./Components/CustomLoading";

type IProps = {};
type IState = {
  indexNav: number;
};

export default class App extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      indexNav: 0
    };
    this.navTo = this.navTo.bind(this);
    this._controlLoading = this._controlLoading.bind(this);
  }
  private routes: { name: string; component: React.ReactNode; }[] = [
    { name: 'Regists', component: <Page1 controlLoading={this._controlLoading.bind(this)} /> },
    { name: 'Groups', component: <Page2 /> },
    { name: 'Times', component: <Page3 /> },
    { name: 'StudentsList', component: <Page4 /> },
    { name: 'Directives', component: <Page5 /> },
    { name: 'Activities', component: <Page6 /> }
  ];
  private refCustomLoading = createRef<CustomLoading>();
  navTo(page: string) {
    const indexNav = this.routes.findIndex((v)=>page.indexOf(v.name) !== -1);
    this.setState({ indexNav });
  }
  _controlLoading(show: boolean, message?: string) {
    if (!show) return this.refCustomLoading.current?.close();
    this.refCustomLoading.current?.open(message!);
  }
  render(): React.ReactNode {
    return(<View style={styles.content}>
      <CustomNavigator routes={this.routes} index={this.state.indexNav} />
      <LeftBar navTo={this.navTo} indexActive={this.state.indexNav} />
      <Others goPrincipal={()=>this.navTo('Regists')} />
      <CustomLoading ref={this.refCustomLoading} />
    </View>);
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingLeft: 60
  }
});