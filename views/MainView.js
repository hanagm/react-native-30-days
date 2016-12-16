/**
 * Created by lihejia on 16/12/16.
 * 主页，进入后的第一个页面
 */


import React,{Component} from 'react';

import {View,Text,TouchableHighlight,StyleSheet,ScrollView} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon  from 'react-native-vector-icons/Ionicons';
import Util from './util';
import Day1 from './days/Day1';

class MainView extends  Component{
    constructor(props){
        super(props);

        this.state={
            days:[
                {
                    key:0,
                    title:"秒表",
                    component:Day1,
                    icon:'ios-stopwatch',
                    size:40,
                    isFA:false,
                    color:'#ff856c',
                    hideNav:false

                }
            ]
        }

    }

    jumpTo(day){
       this.props.navigator.push({
           index:day.key+1,
           title:day.title,
           component:day.component,
           display:!day.hideNav
       })
    }

    render(){
        let boxs=this.state.days.map((ele,index)=>{

            const iconProps={
                name:ele.icon,
                size:ele.size,
                style:[styles.boxIcon,{color:ele.color}]
            }

            return (
            <TouchableHighlight key={ele.key}
                style={[styles.touchBox]}
                                underlayColor="#eee"
                onPress={()=>this.jumpTo(ele)}
            >
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>{ele.title}</Text>
                    {ele.isFa?<IconFA  {...iconProps} />:<Icon  {...iconProps} />}
                </View>

            </TouchableHighlight>

            )
        })
        return (
            <ScrollView style={styles.mainView}>

                <View style={styles.touchBoxContainer}>
                    {boxs}
                </View>
            </ScrollView>

        )
    }
}

const styles=StyleSheet.create({
    mainView: {
        marginTop: 65
    },
    touchBoxContainer:{
        flexDirection: "row",
        flexWrap:"wrap",
        width: Util.size.width,

        borderLeftWidth: Util.pixel,
        borderLeftColor:"#ccc",
        borderRightWidth: Util.pixel,
        borderRightColor:"#ccc",
    },
    touchBox:{
        width: Util.size.width/3-0.33334,
        height:Util.size.width/3,
        backgroundColor:"#fff",
    },
    touchBox1:{
        borderBottomWidth: Util.pixel,
        borderBottomColor:"#ccc",
        borderRightWidth: Util.pixel,
        borderRightColor:"#ccc",
    },
    touchBox2:{
        borderBottomWidth: Util.pixel,
        borderBottomColor:"#ccc",
        borderLeftWidth: Util.pixel,
        borderLeftColor:"#ccc",
    },
    boxContainer:{
        alignItems:"center",
        justifyContent:"center",
        width: Util.size.width/3,
        height:Util.size.width/3,
    },
    boxIcon:{
        position:"relative",
        top:-10
    },
    boxText:{
        position:"absolute",
        bottom:15,
        width:Util.size.width/3,
        textAlign:"center",
        left: 0,
        backgroundColor:"transparent"
    },
})



export default MainView;

