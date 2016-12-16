/**
 * Created by lihejia on 16/12/16.
 */

import React,{Component,PropTypes} from 'react';

import {View,Text,StyleSheet,TouchableHighlight,Platform,StatusBar,ScrollView,ListView} from 'react-native';
import Util from '../util';

//显示时间部分
class WatchFace extends Component{

    static propTypes={
        totalTime:PropTypes.string.isRequired,
        sectionTime:PropTypes.string.isRequired,
    }

    render(){

        let {sectionTime,totalTime}=this.props;
        return (
            <View style={styles.watchFaceContainer}>
                    <Text style={styles.secondTime}>{sectionTime}</Text>
                   <Text style={styles.totalTime}>{totalTime}</Text>
            </View>
        )
    }
}

//控制中心
class WatchControl extends  Component{


    constructor(props){
        super(props);

        this.state={
            //左侧按钮文字
            leftBtnText:"启动",
            //左侧按钮文字颜色
            leftBtnTextColor:'green',
            //左侧文字
            rightBtnText:"计次",
            //右侧按钮文字颜色
            rightBtnTextColor:'darkgray',
            //按钮按下颜色
            underlayColor:"#eee",
            //是否在执行
            watchOn:false
        }
    }

    static propTypes = {
        stopWatch: React.PropTypes.func.isRequired,
        clearRecord: React.PropTypes.func.isRequired,
        startWatch: React.PropTypes.func.isRequired,
        addRecord: React.PropTypes.func.isRequired,
    };


    leftBtnPress(){
        //判断当前是否执行状态，如果不是，则执行
        if(!this.state.watchOn){
            this.setState({
                //左侧按钮文字
                leftBtnText:"停止",
                //左侧按钮文字颜色
                leftBtnTextColor:'#ff0044',
                //左侧文字
                rightBtnText:"计次",
                //右侧按钮文字颜色
                rightBtnTextColor:'darkgray',
                //按钮按下颜色
                underlayColor:"#eee",
                //是否在执行
                watchOn:true
            })

            this.props.startWatch()
        }else{
            this.props.stopWatch()
            this.setState({
                leftBtnText: "启动",
                leftBtnTextColor: "#60B644",
                rightBtnText: "复位",
                rightBtnTextColor:"#eee",
                watchOn: false
            })
        }
    }

    rightBtnPress(){
        if (this.state.watchOn) {
            this.props.addRecord()
        }else{
            this.props.clearRecord()
            this.setState({
                stopBtnText: "计次"
            })
        }
    }
    render(){

        let leftBtnText=this.state.leftBtnText;
        let rightBtnText=this.state.rightBtnText;
        let leftBtnTextColor=this.state.leftBtnTextColor;
        let rightBtnTextColor=this.state.rightBtnTextColor;
        let underlayColor=this.state.underlayColor;
        return (
            <View style={styles.watchControlContainer}>
                <View style={{flex:1,alignItems:"center"}}>

                    <TouchableHighlight underlayColor={underlayColor} style={styles.leftBtn}
                        onPress={()=>this.leftBtnPress()}
                    >
                        <Text style={[{color:leftBtnTextColor}]}>
                            {leftBtnText}
                        </Text>
                    </TouchableHighlight>

                </View>

                <View style={{flex:1,alignItems:"center"}}>
                    <TouchableHighlight underlayColor="#fff" style={styles.rightBtn}
                        onPress={()=>this.rightBtnPress() }
                    >
                      <Text style={[{color:rightBtnTextColor}]}>
                            {rightBtnText}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

}


//列表
class WatchRecord extends Component{

    constructor(){
        super();
    }
    static propTypes={
        record:PropTypes.array
    }


    render(){
        let ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        let dataSoruce=ds.cloneWithRows(this.props.record);

        return (
                <ListView
                    style={styles.recordList}
                    dataSource={dataSoruce}
                    renderRow={(rowData)=>
                    <View style={styles.recordItem}>
                     <Text style={styles.recordItemTitle}>{rowData.title}</Text>
                     <View style={{alignItems: "center"}}>
                        <Text style={styles.recordItemTime}>{rowData.time}</Text>
                        </View>
                    </View>}
                />
        )
    }
}


export  default  class Day1 extends Component{
    constructor(){
        super();
        this.state={
            stopWatch: false,
            resetWatch: true,
            intialTime: 0,
            currentTime:0,
            recordTime:0,
            timeAccumulation:0,
            totalTime: "00:00.00",
            sectionTime: "00:00.00",
            recordCounter: 0,
            record:[
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""}
                ],
        }

    }

    componentWillUnmount() {
        this.stopWatch();
        this.clearRecord();
    }

    componentDidMount() {
        if(Platform.OS === "ios"){
            StatusBar.setBarStyle(0);
        }
    }

    //开始
    startWatch(){
        if (this.state.resetWatch) {
            this.setState({
                stopWatch: false,
                resetWatch: false,
                timeAccumulation:0,
                initialTime: (new Date()).getTime()
            })
        }else{
            this.setState({
                stopWatch: false,
                initialTime: (new Date()).getTime()
            })
        }
        let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime;

        //使用react native提供的定时器，防止内存泄漏，  react native本身提供的定时器，在unmount的时候回自动清除
        let interval=this.setInterval(
            () => {
                this.setState({
                    currentTime: (new Date()).getTime()
                })
                countingTime = this.state.timeAccumulation + this.state.currentTime - this.state.initialTime;
                minute = Math.floor(countingTime/(60*1000));
                second = Math.floor((countingTime-6000*minute)/1000);
                milSecond = Math.floor((countingTime%1000)/10);
                seccountingTime = countingTime - this.state.recordTime;
                secminute = Math.floor(seccountingTime/(60*1000));
                secsecond = Math.floor((seccountingTime-6000*secminute)/1000);
                secmilSecond = Math.floor((seccountingTime%1000)/10);
                this.setState({
                    totalTime: (minute<10? "0"+minute:minute)+":"+(second<10? "0"+second:second)+"."+(milSecond<10? "0"+milSecond:milSecond),
                    sectionTime: (secminute<10? "0"+secminute:secminute)+":"+(secsecond<10? "0"+secsecond:secsecond)+"."+(secmilSecond<10? "0"+secmilSecond:secmilSecond),
                })
                if (this.state.stopWatch) {
                    this.setState({
                        timeAccumulation: countingTime
                    })
                    clearInterval(interval)
                };
            },10);

    }
    //停止
    stopWatch(){
        this.setState({
            stopWatch: true
        })
    }
    //复位
    clearRecord(){
        this.setState({
            stopWatch: false,
            resetWatch: true,
            intialTime: 0,
            currentTime:0,
            recordTime:0,
            timeAccumulation:0,
            totalTime: "00:00.00",
            sectionTime: "00:00.00",
            recordCounter: 0,
            record:[
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""}
            ],
        });
    }
    //计次
    addRecord(){
        let {recordCounter, record} = this.state;
        recordCounter++;
        if (recordCounter<8) {
            record.pop();
        }

        let data={
            title:"计次"+recordCounter,
            time:this.state.sectionTime
        }

        record.unshift(data);
        this.setState({
            recordTime: this.state.timeAccumulation + this.state.currentTime - this.state.initialTime,
            recordCounter: recordCounter,
            record: record
        })
    }


    render(){



        const watchFaceProps={
            totalTime:this.state.totalTime,
            sectionTime:this.state.sectionTime
        }

        const controlProps={
            startWatch:this.startWatch.bind(this),
            stopWatch:this.stopWatch.bind(this),
            addRecord:this.addRecord.bind(this),
            clearRecord:this.clearRecord.bind(this)
        }


        const recordProps={
            record:this.state.record
        }

        return (
            <View style={styles.container}>
                <WatchFace {...watchFaceProps } />
                <WatchControl {...controlProps} />
                <WatchRecord  {...recordProps} />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f3f3f3',
        alignItems:'center',
        marginTop:65,
    },
    watchFaceContainer:{
        width:Util.size.width,
        paddingTop: 50, paddingLeft: 30, paddingRight:30, paddingBottom:40,
        backgroundColor: "#fff",
        borderBottomWidth: 1, borderBottomColor:"#ddd",
        height: 170,
    },
    watchControlContainer:{
        width:Util.size.width,
        height:170,
        paddingTop:10,
        paddingLeft:30,
        paddingRight:30,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        flexDirection:'row'
    },
    secondTime:{
        fontSize:20,
        fontWeight:"100",
        paddingRight:50,
        position:'absolute',
        left:Util.size.width-140,
        color:'#555',
        top:30
    },
    totalTime:{

        fontSize: Util.size.width === 375? 70:60,
        fontWeight: "100",
        color: "#222",
        paddingLeft:20,

    },
    leftBtn:{
        top:20,
        width:70,
        height:70,
        borderRadius:35,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',


    },
    rightBtn:{
        top:20,
        width:70,
        height:70,
        borderRadius:35,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center'
    },
    recordList:{
        width: Util.size.width,
        height: Util.size.height - 300,
        paddingLeft: 15,
    },
    recordItem:{
        height: 40,
        borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
        paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom:5,
        flexDirection:"row",
        alignItems:"center"
    },
    recordItemTitle:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"left",
        paddingLeft:20,
        color:"#777"
    },
    recordItemTime:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"right",
        paddingRight:20,
        color:"#222"
    },
})

