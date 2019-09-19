<template>
  <div class="home">
    <div class="boxall vehicleOwnerTheme">
      <div class="alltitle">车主主题</div>
      <div>
        <span style="font-size: 0.28rem; float: left; line-height: 0.8rem; color: #fff;">选择时间单位</span>
        <el-select @change="dateCompanyChange" v-model="dateCompany" placeholder="请选择" style="width:1.2rem; float: left; left: 0.1rem;">
            <el-option
            v-for="item in dateCompanys"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>

        <div v-if="dateCompany !== '4'" style="float: left;width: 4rem;margin-left: 0.2rem;height: 1.24rem;">
            <span style="font-size: 0.28rem; float: left; line-height: 0.8rem; color: #fff;">开始时间</span>
            <el-date-picker
                v-model="startDate"
                :type="dateType"
                :format="dateFormat"
                placeholder="请选择"
                :picker-options="{'firstDayOfWeek': 1}"
                style="float: left; width: 2.6rem;margin-left: 0.2rem;">
            </el-date-picker>
        </div>
        <div v-if="dateCompany !== '4'" style="float: left;width: 4rem; height: 1.24rem;">
            <span style="font-size: 0.28rem; float: left; line-height: 0.8rem; color: #fff;">结束时间</span>
            <el-date-picker
                v-model="endDate"
                :type="dateType"
                :format="dateFormat"
                placeholder="请选择"
                :picker-options="{'firstDayOfWeek': 1}"
                style="float: left; width: 2.6rem;margin-left: 0.2rem;">
            </el-date-picker>
        </div>
        <seasonComponent v-if="dateCompany === '4'" componentId="startSeason" labelText="开始季度" style="float: left;width: 4rem;margin-left: 0.2rem;"></seasonComponent>
        <seasonComponent v-if="dateCompany === '4'" componentId="endSeason" labelText="结束季度" style="float: left;width: 4rem;"></seasonComponent>
        <el-button style="float: left; margin-left: 0.2rem;" @click="search">查询</el-button>
      </div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: 0.3rem;">
        <div class="boxall vehicleOwnerThemeShowInfo">
          <div class="vehicleOwnerThemeShowInfoText">
            <span style="color: #20FF16; font-size: .6rem;">{{userNum}}</span><br>
            <span style="font-size: .19rem; color: rgba(255,255,255,.7);">用户总数(个)</span>
          </div>
          <div class="vehicleOwnerThemeline"></div>
          <div class="vehicleOwnerThemeShowInfoText">
            <span style="color: #20FF16; font-size: .6rem; ">{{bankCardNum}}</span><br>
            <span style="font-size: .19rem; color: rgba(255,255,255,.7);">总绑卡数(个)</span>
          </div>
          <div class="boxfoot"></div>
        </div>
        <div class="boxall vehicleOwnerThemeShowInfo" style="text-align: center;">
          <span style="color: #20FF16; font-size: .6rem;">{{activeUserNum}}</span><br>
          <span style="font-size: .19rem; color: rgba(255,255,255,.7);">活动用户数(个)</span>
          <div class="boxfoot"></div>
        </div>
      </div>
      <div class="vehicleOwnerThemeShowDiv vehicleOwnerThemeShowDivRight" style="margin-top: 0.3rem;">
        <echartsInit v-if="echartsFlag" :option="newAddUsersEchartsOption" :echartsId="newAddUsersEchartsId"></echartsInit>
      </div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: 0.2rem;">
        <echartsInit v-if="echartsFlag" :option="newAddBankCardEchartsOption" :echartsId="newAddBankCardEchartsId"></echartsInit>
      </div>
      <div class="vehicleOwnerThemeShowDiv vehicleOwnerThemeShowDivRight" style="margin-top: 0.2rem;">
        <echartsInit v-if="echartsFlag" :option="carNumberEchartsOption" :echartsId="carNumberEchartsId"></echartsInit>
      </div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: 0.2rem;">
        <echartsInit v-if="echartsFlag" :option="cancelCarNumberEchartsOption" :echartsId="cancelCarNumberEchartsId"></echartsInit>
      </div>
      <div class="vehicleOwnerThemeShowDiv vehicleOwnerThemeShowDivRight" style="margin-top: 0.2rem;">
        <echartsInit v-if="echartsFlag" :option="cancelCardEchartsOption" :echartsId="cancelCardEchartsId"></echartsInit>
      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="boxall marketingTheme">
      <div class="alltitle" style="position: absolute; text-align: center; width: 13.2rem;">营销主题</div>
      <div style="float: left;margin-top: -12.5rem;" @click="leftButtonEvent">
          <img src="../../static/img/left.png">
      </div>
      <echartsInit style="width: 6.2rem; height: 3.8rem; float: left;margin-top: -13.85rem;" v-if="echartsFlag" :option="couponStatusEchartsOption" :echartsId="couponStatusEchartsId"></echartsInit>
      <echartsInit style="width: 6.2rem; height: 3.8rem; float: left;margin-top: -13.85rem;margin-left: 6rem;" v-if="echartsFlag" :option="activeCostEchartsOption" :echartsId="activeCostEchartsId"></echartsInit>
      <div style="float: left;margin-top: -12.5rem;margin-left: 12.4rem;">
          <img src="../../static/img/right.png">
      </div>
      <!-- <div class="vehicleOwnerThemeShowDiv" style="margin-top: -13.85rem;">
        <echartsInit v-if="echartsFlag" :option="couponStatusEchartsOption" :echartsId="couponStatusEchartsId"></echartsInit>
      </div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: -13.85rem;margin-left: 6.4rem;">
        <echartsInit v-if="echartsFlag" :option="activeCostEchartsOption" :echartsId="activeCostEchartsId"></echartsInit>
      </div> -->
      <div class="boxfoot"></div>
    </div>

    <div class="boxall parkingLotTheme">
      <div class="alltitle" style="position: absolute; text-align: center; width: 13.2rem;">车场主题</div>
      <div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -8.3rem;">
          <echartsInit v-if="echartsFlag" :option="transactionNumEchartsOption" :echartsId="transactionNumEchartsId"></echartsInit>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -8.3rem;margin-left: 6.4rem;">
          <echartsInit v-if="echartsFlag" :option="carNumEchartsOption" :echartsId="carNumEchartsId"></echartsInit>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -4.25rem;">
          <echartsInit v-if="echartsFlag" :option="transactionCostEchartsOption" :echartsId="transactionCostEchartsId"></echartsInit>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -4.25rem;margin-left: 6.4rem;">
            <div style="font-size: 0.4rem; text-align: center;">
                <span>长期不交易车场</span>
            </div>
            <div style="font-size: 0.3rem; text-align: center; margin-top: 0.2rem; height: 3rem;">
                <vueSeamlessScroll :data="noUsedParkingLots" :class-option="defaultOption" style="height: 2.5rem;overflow: hidden;">
                    <ul class="item" style="list-style: none; color:#fff">
                        <li :key="item" v-for="item in noUsedParkingLots" style="list-style: none;">{{item}}</li>
                    </ul>
                </vueSeamlessScroll>
            </div>
        </div>
      </div>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>

<script>
import echartsInit from './echartsInit'
import seasonComponent from './seasonComponent'
import vueSeamlessScroll from 'vue-seamless-scroll'
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      //总用户数
      userNum: 0,
      //总绑卡数
      bankCardNum: 0,
      //活动用户数
      activeUserNum: 0,
      //车流量统计
      carNumEchartsOption: {},
      carNumEchartsId: 'carNumEcharts',
      //每天交易笔数
      transactionNumEchartsOption: {},
      transactionNumEchartsId: 'transactionNum',
      //每天交易金额
      transactionCostEchartsOption: {},
      transactionCostEchartsId: 'transactionCost',
      //新增用户数
      newAddUsersEchartsOption: {},
      newAddUsersEchartsId: 'newAddUsers',
      //新增绑卡数
      newAddBankCardEchartsOption: {},
      newAddBankCardEchartsId: 'newAddBankCard',
      //绑车牌数
      carNumberEchartsOption: {},
      carNumberEchartsId: 'newAddCarNumber',
      //解绑车牌数
      cancelCarNumberEchartsOption: {},
      cancelCarNumberEchartsId: 'cancelCarNumber',
      //解绑卡
      cancelCardEchartsOption: {},
      cancelCardEchartsId: 'cancelCard',
      //优惠券使用情况
      couponStatusEchartsOption: {},
      couponStatusEchartsId: 'couponStatus',
      //活动费用
      activeCostEchartsOption: {},
      activeCostEchartsId: 'activeCost',
      //echarts在使用组件渲染时，数据更新后要重新渲染，配合v-if使用
      echartsFlag: false,
      startDate: '',
      endDate: '',
      dateType: 'date',
      dateFormat: 'yyyyMMdd',
      dateCompany: '1',
      dateCompanys: [{label: '日', value: '1'},{label: '周', value: '2'},{label: '月', value: '3'},{label: '季', value: '4'},{label: '年', value: '5'}],
      noUsedParkingLots: ['车场1','车场2','车场3','车场4','车场5','车场6','车场7','车场8','车场9','车场10'],
      showNoUsedParkingLots: [],
      defaultOption: {
        isSingleRemUnit: true,
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  computed: {
      ...mapState(['global'])
  },
  mounted() {
    var currentData = new Date();
    var startData = currentData.getFullYear() + '-' + this.dateToStr(currentData.getMonth() + 1) + '-' + this.dateToStr(currentData.getDate());
    var endData = currentData.getFullYear() + '-' + this.dateToStr(currentData.getMonth() + 1) + '-' + this.dateToStr(currentData.getDate());
    this.getVehicleOwnerTheme('2019-03-01', '2019-09-01');
    this.getCouponActiveInfo();
    var carNumOption = {
        title: {
            subtext: '车流量统计'
        },
        textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10']
        },
        yAxis: {
            type: 'value',
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
                lte: 2,
                color: 'green'
            }, {
                gt: 2,
                lte: 8,
                color: 'red'
            }, {
                gt: 8,
                lte: 10,
                color: 'green'
            }, {
                gt: 14,
                color: 'red'
            }]
        },
        series: [
            {
                name:'用电量',
                type:'line',
                smooth: true,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ],
        grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '12%',
                    bottom: '8%',
                    top: '25%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    var transactionNumOption = {
                 title : {
                    subtext: '交易笔数'
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: "{b}<br/> {c} (笔)"
                },
                legend: {
                    data:['交易笔数'],
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start: 0,
                    end: 50,
                    bottom: 5,
                    height: 10,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['车场1','车场2','车场3','车场4','车场5','车场6','车场7','车场8','车场9','车场10','车场11','车场12','车场13','车场14','车场15','车场16','车场17','车场18','车场19','车场20','车场21','车场22','车场23','车场24']
                    }
                ],
                yAxis : [
                    {
                        type: 'value'
                    }
                ],
                series : [
                    {
                        name:'交易笔数',
                        type:'bar',
                        data:[26, 59, 90, 264, 287, 707, 1756, 1822, 487, 188, 60, 23, 25, 52, 42, 152, 552, 362, 487, 514, 105, 95, 84, 62],
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '20%',
                    bottom: '8%',
                    top: '25%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    var newAddUsersOption = {
                 title : {
                    subtext: '新增用户数',
                    textStyle: {
                        color: '#408829'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start: 0,
                    end: 50,
                    bottom: 5,
                    height: 10,
                    showDetail:false,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                legend: {
                    data: ['e生活', '交警app','融e联'],
                    top: '15%',
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['20190101','20190102','20190103','20190104','20190105','20190106','20190107']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                series : [
                    {
                        name:'e生活',
                        type:'line',
                        data:[10, 12, 21, 54, 260, 830, 710],
                        color: '#0000CD',
                        lineStyle: {
                                color: '#0000CD',
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    {
                        name:'交警app',
                        type:'line',
                        data:[17, 11, 85, 51, 60, 130, 70],
                        color: '#FFEC8B',
                        lineStyle: {
                                color: '#FFEC8B',
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    {
                        name:'融e联',
                        type:'line',
                        data:[18, 14, 12, 4, 40, 30, 59],
                        color: '#8B658B',
                        lineStyle: {
                                color: '#8B658B',
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    }
                ],
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '12%',
                    bottom: '8%',
                    top: '32%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    var activeCostOption = {
      title : {
                    subtext: '活动费用使用情况',
                    x:'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                calculable : true,
                series: [
                    {
                        name:'活动费用使用情况',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '40%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        data:[
                            {value:7000, name:'已领金额', itemStyle: { color: '#20FF16' }},
                            {value:3000, name:'未领金额', itemStyle: { color: '#DDDDDD' }}
                        ]
                    },
                    {
                        name:'活动费用使用情况',
                        type:'pie',
                        radius: ['50%', '65%'],
                        data:[
                            {value:3900, name:'已使用金额', itemStyle: { color: '#20FF16' }},
                            {value:3100, name:'未使用金额', itemStyle: { color: '#00FFFF' }},
                            {value:3000, name:'未领金额', itemStyle: { color: '#DDDDDD' }}
                        ]
                    }
                ]
    }
    var transactionCostOption = {
                 title : {
                    subtext: '交易金额'
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: "{b}<br/> {c} (万元)"
                },
                legend: {
                    data:['交易金额'],
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start: 0,
                    end: 50,
                    bottom: 5,
                    height: 10,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['车场1','车场2','车场3','车场4','车场5','车场6','车场7','车场8','车场9','车场10','车场11','车场12','车场13','车场14','车场15','车场16','车场17','车场18','车场19','车场20','车场21','车场22','车场23','车场24']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name: '万元'
                    }
                ],
                series : [
                    {
                        name:'交易金额',
                        type:'bar',
                        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.5, 5.2, 4.2, 15.2, 55.2, 36.2, 48.7, 51.4, 10.5, 9.5, 8.4, 6.2],
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '20%',
                    bottom: '8%',
                    top: '35%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    var newAddBankCardsOption = {
      title : {
                    subtext: '新增用户绑卡数',
                    textStyle: {
                        color: '#408829'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    yAxisIndex: 0,
                    start: 0,
                    end: 30,
                    bottom: 30,
                    width: 10,
                    showDetail:false,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                tooltip : {
                    trigger: 'axis',
                    formatter:function(params){
                        var str =  params[0].axisValueLabel + '<br />' + params[0].seriesName + ':' + params[0].value;
                        str += '<br />' + params[1].seriesName + ':' + params[1].value;
                        str += '<br />' + params[2].seriesName + ':' + params[2].value;
                        str += '<br />总计:' + (params[0].value + params[1].value + params[2].value);
                        return str
                    }
                    // formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />总计:({c0}+{c1}+{c2})'
                },
                //控制图表上部的提示
                legend: {
                    data: ['借记卡', '信用卡','三类户'],
                    top: '15%',
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'value'
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['20190101','20190102','20190103','20190104','20190105','20190106','20190107','20190108','20190109','20190110','20190111','20190112','20190113','20190114','20190115']
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                series : [
                    {
                        name: '借记卡',
                        type: 'bar',
                        stack: '总量',
                        barWidth : 15,
                        // label: {
                        //     normal: {
                        //         show: true,
                        //         position: 'insideRight'
                        //     }
                        // },
                        itemStyle: {
                            normal: {
                            color: 'rgba(237,125,49, 0.8)',}
                        },
                        data: [320, 302, 301, 334, 390, 330, 320, 234, 250, 500, 510, 450, 460, 180, 620]
                    },
                    {
                        name: '信用卡',
                        type: 'bar',
                        stack: '总量',
                        barWidth : 15,
                        // label: {
                        //     normal: {
                        //         show: true,
                        //         position: 'insideRight'
                        //     }
                        // },
                        itemStyle: {
                            normal: {
                            color: 'rgba(158,125,120, 0.8)',}
                        },
                        data: [120, 132, 101, 134, 90, 230, 210, 390, 330, 320, 234, 250, 500, 510, 450]
                    },
                    {
                        name: '三类户',
                        type: 'bar',
                        stack: '总量',
                        barWidth : 15,
                        // label: {
                        //     normal: {
                        //         show: true,
                        //         position: 'insideRight'
                        //     }
                        // },
                        itemStyle: {
                            normal: {
                            color: 'rgba(147,251,149, 0.8)',}
                        },
                        data: [220, 182, 191, 234, 290, 330, 310, 134, 90, 230, 210, 390, 330, 320, 234]
                    }
                ],
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '12%',
                    bottom: '8%',
                    top: '32%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    var carNumberOption = {
      title : {
                    subtext: '绑车牌数',
                    textStyle: {
                        color: '#408829'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start: 0,
                    end: 50,
                    bottom: 5,
                    height: 10,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                tooltip : {
                    trigger: 'axis'
                },
                // legend: {
                //     data:['新增用户数'],
                //     itemWidth:40,
                //     itemHeight:20,
                //     textStyle:{
                //         fontSize:15,
                //         color:'#fff'
                //     }
                // },
                
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['20190101','20190102','20190103','20190104','20190105','20190106','20190107','20190108','20190109','20190110','20190111','20190112','20190113','20190114','20190115']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                series : [
                    {
                        name:'绑车牌数',
                        type:'line',
                        data: [220, 182, 191, 234, 290, 330, 310, 134, 90, 230, 210, 390, 330, 320, 234],
                        lineStyle: {
                                color: 'red',
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    }
                ],
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '12%',
                    bottom: '8%',
                    top: '25%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    var cancelCarNumberOption = {
      title : {
                    subtext: '解绑车牌数',
                    textStyle: {
                        color: '#408829'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start: 0,
                    end: 50,
                    bottom: 5,
                    height: 10,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                tooltip : {
                    trigger: 'axis'
                },
                // legend: {
                //     data:['新增用户数'],
                //     itemWidth:40,
                //     itemHeight:20,
                //     textStyle:{
                //         fontSize:15,
                //         color:'#fff'
                //     }
                // },
                
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['20190101','20190102','20190103','20190104','20190105','20190106','20190107','20190108','20190109','20190110','20190111','20190112','20190113','20190114','20190115']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                series : [
                    {
                        name:'新增用户数',
                        type:'line',
                        data: [220, 182, 191, 234, 290, 330, 310, 134, 90, 230, 210, 390, 330, 320, 234],
                        lineStyle: {
                                color: 'red',
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    }
                ],
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '12%',
                    bottom: '8%',
                    top: '25%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    var cancelCardOption = {
      title : {
                    subtext: '解绑卡数',
                    textStyle: {
                        color: '#408829'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start: 0,
                    end: 50,
                    bottom: 5,
                    height: 10,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                tooltip : {
                    trigger: 'axis'
                },
                // legend: {
                //     data:['新增用户数'],
                //     itemWidth:40,
                //     itemHeight:20,
                //     textStyle:{
                //         fontSize:15,
                //         color:'#fff'
                //     }
                // },
                
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['20190101','20190102','20190103','20190104','20190105','20190106','20190107','20190108','20190109','20190110','20190111','20190112','20190113','20190114','20190115']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                series : [
                    {
                        name:'新增用户数',
                        type:'line',
                        data: [220, 182, 191, 234, 290, 330, 310, 134, 90, 230, 210, 390, 330, 320, 234],
                        lineStyle: {
                                color: 'red',
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    }
                ],
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '12%',
                    bottom: '8%',
                    top: '25%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
    };
    this.carNumEchartsOption = carNumOption;
    this.transactionNumEchartsOption = transactionNumOption;
    this.newAddUsersEchartsOption = newAddUsersOption;
    
    this.activeCostEchartsOption = activeCostOption;
    this.transactionCostEchartsOption = transactionCostOption;
    this.newAddBankCardEchartsOption = newAddBankCardsOption;
    this.carNumberEchartsOption = carNumberOption;
    this.cancelCarNumberEchartsOption = cancelCarNumberOption;
    this.cancelCardEchartsOption = cancelCardOption;
    this.echartsFlag = true;
  },
  methods: {
      getVehicleOwnerTheme(sDate, eDate) {
          this.$axios({
            method: 'get',
            url: this.global.testUrl + '/user?factId=F_0001,F_0002,F_0003,F_0004,F_0005,F_0006,F_0007,F_0008&start='+sDate+'&end='+eDate,
            data: '',
            contentType: 'application/json',
            dataType: 'json'
        }).then((result) => {
            console.log(result);
            if(result.data.status === 'ok') {
                var bankCarLicenseNum = [];
                for(var i in result.data.data) {
                    if(result.data.data[i].factId === 'F_0001') {

                    } else if(result.data.data[i].factId === 'F_0002') {

                    } else if(result.data.data[i].factId === 'F_0003') {
                        this.userNum = result.data.data[i].factValue;
                    } else if(result.data.data[i].factId === 'F_0004') {
                        this.bankCardNum = result.data.data[i].factValue;
                    } else if(result.data.data[i].factId === 'F_0005') {
                        this.activeUserNum = result.data.data[i].factValue;
                    } else if(result.data.data[i].factId === 'F_0006') {
                        bankCarLicenseNum.push(result.data.data[i].factValue);
                        
                    } else if(result.data.data[i].factId === 'F_0007') {
                        
                    } else if(result.data.data[i].factId === 'F_0008') {
                        
                    }
                }
            } else {
                this.$message.error(result.data.message);
            }
        });
      },
      leftButtonEvent() {
          
      },
      getCouponActiveInfo() {
          this.$axios({
            method: 'get',
            url: this.global.testUrl + 'realtime',
            data: '',
            contentType: 'application/json',
            dataType: 'json'
        }).then((result) => {
            console.log(result);
            this.setSectorData(result.data.data.couponList[0]);
        });
      },
      setSectorData(data) {
          var couponStatusOption = {
                title : {
                    subtext: '优惠券使用情况',
                    x:'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                calculable : true,
                series: [
                    {
                        name:'优惠券使用情况',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '40%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        data:[
                            {value:700, name:'已领', itemStyle: { color: '#20FF16' }},
                            {value:300, name:'未领', itemStyle: { color: '#DDDDDD' }}
                        ]
                    },
                    {
                        name:'优惠券使用情况',
                        type:'pie',
                        radius: ['50%', '65%'],
                        data:[
                            {value:390, name:'已使用', itemStyle: { color: '#20FF16' }},
                            {value:310, name:'未使用', itemStyle: { color: '#00FFFF' }},
                            {value:300, name:'未领', itemStyle: { color: '#DDDDDD' }}
                        ]
                    }
                ]
            };
            couponStatusOption.title.subtext = data.name;
            couponStatusOption.series[0].name = data.name;
            couponStatusOption.series[0].data[0].value = data.getcount;
            couponStatusOption.series[0].data[1].value = data.surpluscount;
            couponStatusOption.series[1].name = data.name;
            couponStatusOption.series[1].data[0].value = data.usecount;
            couponStatusOption.series[1].data[1].value = data.notusecount;
            couponStatusOption.series[1].data[1].value = data.surpluscount;
            this.$nextTick(()=>{
                this.couponStatusEchartsOption = couponStatusOption;
            });
      },
      dateCompanyChange() {
          if(this.dateCompany === '1') {
              this.startDate = '';
              this.endDate = '';
              this.dateType = 'date';
              this.dateFormat = 'yyyyMMdd';
          } else if(this.dateCompany === '2') {
              this.startDate = '';
              this.endDate = '';
              this.dateType = 'week';
              this.dateFormat = 'yyyyWW';
          } else if(this.dateCompany === '3') {
              this.startDate = '';
              this.endDate = '';
              this.dateType = 'month';
              this.dateFormat = 'yyyyMM';
          } else if(this.dateCompany === '5') {
              this.startDate = '';
              this.endDate = '';
              this.dateType = 'year';
              this.dateFormat = 'yyyy';
          }
      },
      search() {
          var sDate = '';
          var eDate = '';
          if(this.dateCompany !== '4') {
            if(this.startDate !== '' && this.endDate !== '') {
                if(this.dateCompany === '1') {
                    sDate = this.startDate.getFullYear() + '-' + this.dateToStr(this.startDate.getMonth() + 1) + '-' + this.dateToStr(this.startDate.getDate());
                    eDate = this.endDate.getFullYear() + '-' + this.dateToStr(this.endDate.getMonth() + 1) + '-' + this.dateToStr(this.endDate.getDate());
                    
                } else if(this.dateCompany === '2') {
                    sDate = this.getYearWeek(this.startDate);
                    eDate = this.getYearWeek(this.endDate);

                } else if(this.dateCompany === '3') {
                    sDate = this.startDate.getFullYear() + '-' + this.dateToStr(this.startDate.getMonth() + 1);
                    eDate = this.endDate.getFullYear() + '-' + this.dateToStr(this.endDate.getMonth() + 1)
                    
                } else {
                    sDate = this.startDate.getFullYear();
                    eDate = this.endDate.getFullYear();
                }
            } else {
                this.$message('开始时间和结束时间不能为空');
            }
          } else {
              if(document.getElementById("startSeason").value !== '' && document.getElementById("endSeason").value !== '') {
                sDate = document.getElementById("startSeason").value;
                eDate = document.getElementById("endSeason").value;
              } else {
                this.$message('开始时间和结束时间不能为空');
              }
          }
          this.getVehicleOwnerTheme(sDate, eDate);
      },
      dateToStr(data) {
          if(data < 10) {
              data = '0' + data;
          } else {
              data = '' + data;
          }
          return data;
      },
      getYearWeek(date){  
        var date2=new Date(date.getFullYear(), 0, 1);
        var rq = date-date2;
        var s1 = Math.ceil(rq/(24*60*60*1000));
        var d = Math.ceil(s1/7) + 1;
        var weekStr = '';
        var dateStr = '';
        dateStr = '' + (date.getMonth() + 1) + (date.getDate() - 1);
        console.log(dateStr);
        if(dateStr === '1229' || dateStr === '1230' || dateStr === '1231') {
            weekStr = '' + (date.getFullYear() + 1) + '01';
        } else if(dateStr === '1227' || dateStr === '1226' || dateStr === '1225') {
            weekStr = '' + date.getFullYear() + (d - 1);
        } else {
            weekStr = '' + date.getFullYear() + d;
        }
        return weekStr;
      }
  },
  components: {
    echartsInit,
    seasonComponent,
    vueSeamlessScroll
  }
}
</script>

<style scoped>
.vehicleOwnerTheme {
  width: 12.7rem;
  height: 14.1rem;
  top: 0.15rem;
  float: left;
}
.vehicleOwnerThemeShowDiv {
  width: 6.2rem;
  height: 3.8rem;
  border: #fff dashed 1px;
  float: left;
}
.vehicleOwnerThemeShowDivRight {
  margin-left: 0.2rem;
}
.vehicleOwnerThemeShowInfo {
    font-size: 0.3rem;
    margin-top: 0.2rem;
    width: 5.5rem;
    margin-left: 0.15rem;
    height: 0.9rem;
 }
.marketingTheme {
  width: 13rem;
  height: 4.8rem;
  top: 0.15rem;
  left: 13.3rem;
}

.parkingLotTheme {
  width: 13rem;
  height: 8.7rem;
  top: 0.15rem;
  left: 13.3rem;
}
.boxall{
  border: 1px solid rgba(25,186,139,.17);
  padding:0 .2rem .4rem .15rem;
  background: rgba(255,255,255,.04) url(../../static/img/line.png);
  background-size: 100% auto;
  position: relative;
  margin-bottom: .15rem;z-index: 10;
}
.boxall:before,
.boxall:after{
  position:absolute;
  width: .1rem;
  height: .1rem;
  content: "";
  border-top: 2px solid #02a6b5;
  top: 0;
}
.boxall:before,.boxfoot:before{
  border-left: 2px solid #02a6b5;
  left: 0;
}
.boxall:after,.boxfoot:after{
  border-right: 2px solid #02a6b5;
  right: 0;
}
.boxfoot{
  position:absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
.boxfoot:before,
.boxfoot:after{
  position:absolute;
  width: .1rem;
  height: .1rem;
  content: "";
  border-bottom: 2px solid #02a6b5;
  bottom: 0;
}
.alltitle{
  font-size:.5rem;
  color:#fff;
  text-align: center;
  line-height: .8rem;
}
.vehicleOwnerThemeline {
  width: 0px;height: 0.9rem;border: #fff solid 1px;position: absolute;top: 0.15rem;left: 2.9rem;
}

.vehicleOwnerThemeShowInfoText {
text-align: center; float: left; width: 2.7rem;
}

</style>
