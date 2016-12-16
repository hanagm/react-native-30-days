/**
 * Created by lihejia on 16/12/16.
 */

import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {Navigator,StyleSheet,Text,TouchableOpacity} from 'react-native';
import MainView from './MainView';


class NavigationBar extends Navigator.NavigationBar{


    render() {
        var routes = this.props.navState.routeStack;

        if (routes.length) {
            var route = routes[routes.length - 1];

            if (route.display === false) {
                return null;
            }
        }

        return super.render();
    }

}


class Main extends  React.Component{
    constructor(props){
        super();

    }
    configureScene(route, routeStack) {
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }
    routeMapper = {
        LeftButton: (route, navigator, index, navState) =>
        {
            if(route.index > 0) {
                return <TouchableOpacity
                    underlayColor='transparent'
                    onPress={() => {if (index > 0) {navigator.pop()}}}>
                    <Text style={styles.navBackBtn}><Icon size={18} name="ios-arrow-back"></Icon> back</Text>
                </TouchableOpacity>;
            }else{
                return null;
            }
        },
        RightButton: (route, navigator, index, navState) =>
        { return null; },
        Title: (route, navigator, index, navState) =>
        { return (<Text style={styles.navTitle}>{route.title}</Text>); },
    };

    render(){

        return (
            <Navigator
                initialRoute={
                    {
                        index:0,
                        title:'30 day of react native',
                        component:MainView,
                        display:true
                    }
                }
                configureScene={this.configureScene}
                renderScene={(router,navigator)=>{
                    let Component=router.component;
                    return <Component  {...router.params} navigator={navigator} />
                }}
                navigationBar={
                    <NavigationBar
                    routeMapper={this.routeMapper}
                    style={styles.navBar}

                    />
                  }
            >

            </Navigator>
        )
    }
}

const styles=StyleSheet.create({
    navBar: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    navTitle: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: "500",
    },
    navBackBtn: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 18,
        color: "#555",
    },
    itemWrapper:{
        backgroundColor: "#f3f3f3"
    },
})


export  default Main;