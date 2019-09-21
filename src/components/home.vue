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
      <echartsInit style="width: 5.2rem;margin-left: 1rem; height: 3.8rem; float: left;margin-top: -13.85rem;" v-if="pieChartsFlag" :option="couponStatusEchartsOption" :echartsId="couponStatusEchartsId"></echartsInit>
      <echartsInit style="width: 5.2rem; height: 3.8rem; float: left;margin-top: -13.85rem;margin-left: 6.5rem;" v-if="pieChartsFlag" :option="activeCostEchartsOption" :echartsId="activeCostEchartsId"></echartsInit>
      <div style="float: left;margin-top: -12.5rem;margin-left: 12.4rem;" @click="rightButtonEvent">
          <img src="../../static/img/right.png">
      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="boxall parkingLotTheme">
      <div class="alltitle" style="position: absolute; text-align: center; width: 13.2rem;">车场主题</div>
      <div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -8.3rem;">
          <echartsInit v-if="transactionEchartsFlag" :option="transactionNumEchartsOption" :echartsId="transactionNumEchartsId"></echartsInit>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -8.3rem;margin-left: 6.4rem;">
          <echartsInit v-if="echartsFlag" :option="carNumEchartsOption" :echartsId="carNumEchartsId"></echartsInit>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -4.25rem;">
          <echartsInit v-if="transactionEchartsFlag" :option="transactionCostEchartsOption" :echartsId="transactionCostEchartsId"></echartsInit>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -4.25rem;margin-left: 6.4rem;">
            <div style="font-size: 0.4rem; text-align: center;">
                <span>长期不交易车场</span>
            </div>
            <div style="font-size: 0.3rem; text-align: left; margin-top: 0.2rem; height: 3rem;">
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
      pieChartsFlag: false,
      transactionEchartsFlag: false,
      startDate: '',
      endDate: '',
      dateType: 'date',
      dateFormat: 'yyyyMMdd',
      dateCompany: '1',
      dateCompanys: [{label: '日', value: '1'},{label: '周', value: '2'},{label: '月', value: '3'},{label: '季', value: '4'},{label: '年', value: '5'}],
      noUsedParkingLots: [],
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
      },
      couponList: [],
      couponIndex: 0,
      colors: ['red', 'yellow', 'green', 'blue']
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
    this.getAllData('2019-06-10');
    this.getCouponActiveInfo();
  },
  methods: {
      getVehicleOwnerTheme(sDate, eDate) {
          this.$axios({
            method: 'get',
            url: this.global.testUrl + '/user?factId=F_0001,F_0002,F_0006,F_0007,F_0008&start='+sDate+'&end='+eDate,
            data: '',
            contentType: 'application/json',
            dataType: 'json'
        }).then((result) => {
            console.log(result);
            if(result.data.status === 'ok') {
                var bankCarLicenseNum = [];
                var bankCarLicenseDate = [];
                var cancelBankCarLicenseNum = [];
                var cancelBankCarLicenseDate = [];
                var cancelBankCardNum = [];
                var cancelBankCardDate = [];
                var newAddUseraDate = [];
                var newAddUserNum = [];
                var newAddUserSource = [];
                var newAddCardNum = [];
                var newAddCardSource = [];
                var newAddCardaDate = [];
                for(var i in result.data.data) {
                    if(result.data.data[i].factId === 'F_0001') {
                        newAddUseraDate.push(result.data.data[i].dataDate);
                        newAddUserSource.push(result.data.data[i].factSort);
                        var userInfo = {name: '', data: []};
                        if(newAddUserNum.length === 0) {
                            userInfo.name = result.data.data[i].factSort;
                            userInfo.data.push(result.data.data[i].factValue);
                            newAddUserNum.push(userInfo);
                        } else {
                            var count = 1;
                            for(var j in newAddUserNum) {
                                if(newAddUserNum[j].name === result.data.data[i].factSort) {
                                    newAddUserNum[j].data.push(result.data.data[i].factValue);
                                    count = 0;
                                }
                            }
                            if(count === 1) {
                                userInfo.name = result.data.data[i].factSort;
                                userInfo.data.push(result.data.data[i].factValue);
                                newAddUserNum.push(userInfo);
                            }
                        }
                    } else if(result.data.data[i].factId === 'F_0002') {
                        newAddCardaDate.push(result.data.data[i].dataDate);
                        newAddCardSource.push(result.data.data[i].factSort);
                        var cardInfo = {name: '', data: []};
                        if(newAddCardNum.length === 0) {
                            cardInfo.name = result.data.data[i].factSort;
                            cardInfo.data.push(result.data.data[i].factValue);
                            newAddCardNum.push(cardInfo);
                        } else {
                            var count = 1;
                            for(var j in newAddCardNum) {
                                if(newAddCardNum[j].name === result.data.data[i].factSort) {
                                    newAddCardNum[j].data.push(result.data.data[i].factValue);
                                    count = 0;
                                }
                            }
                            if(count === 1) {
                                cardInfo.name = result.data.data[i].factSort;
                                cardInfo.data.push(result.data.data[i].factValue);
                                newAddCardNum.push(cardInfo);
                            }
                        }
                    }else if(result.data.data[i].factId === 'F_0006') {
                        bankCarLicenseNum.push(result.data.data[i].factValue);
                        bankCarLicenseDate.push(result.data.data[i].dataDate);
                    } else if(result.data.data[i].factId === 'F_0007') {
                        cancelBankCarLicenseNum.push(result.data.data[i].factValue);
                        cancelBankCarLicenseDate.push(result.data.data[i].dataDate);
                    } else if(result.data.data[i].factId === 'F_0008') {
                        cancelBankCardNum.push(result.data.data[i].factValue);
                        cancelBankCardDate.push(result.data.data[i].dataDate);
                    }
                }
                var lineChartOption = {};
                var series = [];
                var legendColors = [];
                var legend = {};
                lineChartOption.title = {
                    subtext: '绑车牌数',
                    textStyle: {
                        color: '#408829'
                    }
                };
                lineChartOption.xAxisData = bankCarLicenseDate;
                series = [{
                    name:'',
                    type:'line',
                    data: bankCarLicenseNum,
                    lineStyle: {
                            color: 'red',
                            width: 1,
                            type: 'solid'
                        },
                    textStyle:{
                        color:'#fff'
                    }
                }];
                lineChartOption.series = series;
                legendColors = [];
                lineChartOption.color = legendColors,
                lineChartOption.legend = legend;
                this.carNumberEchartsOption = this.setLineChart(lineChartOption);

                lineChartOption.title = {
                    subtext: '解绑车牌数',
                    textStyle: {
                        color: '#408829'
                    }
                };
                lineChartOption.xAxisData = cancelBankCardDate;
                series = [{
                    name:'',
                    type:'line',
                    data: cancelBankCardNum,
                    lineStyle: {
                            color: 'red',
                            width: 1,
                            type: 'solid'
                        },
                    textStyle:{
                        color:'#fff'
                    }
                }];
                lineChartOption.series = series;
                legendColors = [];
                lineChartOption.color = legendColors,
                lineChartOption.legend = legend;
                this.cancelCarNumberEchartsOption = this.setLineChart(lineChartOption);

                lineChartOption.title = {
                    subtext: '解绑卡数',
                    textStyle: {
                        color: '#408829'
                    }
                };
                lineChartOption.xAxisData = cancelBankCarLicenseDate;
                series = [{
                    name:'',
                    type:'line',
                    data: cancelBankCarLicenseNum,
                    lineStyle: {
                            color: 'red',
                            width: 1,
                            type: 'solid'
                        },
                    textStyle:{
                        color:'#fff'
                    }
                }];
                lineChartOption.series = series;
                legendColors = [];
                lineChartOption.color = legendColors,
                lineChartOption.legend = legend;
                this.cancelCardEchartsOption = this.setLineChart(lineChartOption);

                lineChartOption.title = {
                    subtext: '新增用户数',
                    textStyle: {
                        color: '#408829'
                    }
                };
                lineChartOption.xAxisData = this.unique(newAddUseraDate);
                legend = {
                    data: this.unique(newAddUserSource),
                    top: '15%',
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                };
                legendColors = [];
                lineChartOption.legend = legend;
                series = [];
                for(var i in newAddUserNum) {
                    var serie = {
                        name:newAddUserNum[i].name,
                        type:'line',
                        data: newAddUserNum[i].data,
                        lineStyle: {
                                color: this.colors[i],
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    };
                    series.push(serie);
                    legendColors.push(this.colors[i]);
                }
                lineChartOption.color = legendColors,
                lineChartOption.series = series;
                this.newAddUsersEchartsOption = this.setLineChart(lineChartOption);

                lineChartOption.title = {
                    subtext: '新增绑卡数',
                    textStyle: {
                        color: '#408829'
                    }
                };
                lineChartOption.xAxisData = this.unique(newAddCardaDate);
                legend = {
                    data: this.unique(newAddCardSource),
                    top: '15%',
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                };
                lineChartOption.legend = legend;
                series = [];
                legendColors = [];
                for(var i in newAddCardNum) {
                    var serie = {
                        name:newAddCardNum[i].name,
                        type:'line',
                        data: newAddCardNum[i].data,
                        lineStyle: {
                                color: this.colors[i],
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    };
                    series.push(serie);
                    legendColors.push(this.colors[i]);
                }
                lineChartOption.color = legendColors,
                lineChartOption.series = series;
                this.newAddBankCardEchartsOption = this.setLineChart(lineChartOption);

                this.echartsFlag = false;
                this.$nextTick(()=>{
                    this.echartsFlag = true;
                });
            } else {
                this.$message.error(result.data.message);
            }
        });
      },
      getAllData(date) {
          this.noUsedParkingLots = [];
          var transactionNumCarPark = [];
          var transactionNum = [];
          var transactionCost = [];
          var transactionCostCarPark = [];
          this.$axios({
            method: 'get',
            url: this.global.testUrl + '/depot?factId=F_0003,F_0004,F_0005,F_0012,F_0013,F_0014&date='+date,
            data: '',
            contentType: 'application/json',
            dataType: 'json'
        }).then((result) => {
            if(result.data.status === 'ok') {
                var noParkingLots =[];
                var bankCarLicenseNum = [];
                for(var i in result.data.data) {
                    if(result.data.data[i].factId === 'F_0003') {
                        this.userNum = result.data.data[i].factValue;
                    } else if(result.data.data[i].factId === 'F_0004') {
                        this.bankCardNum = result.data.data[i].factValue;
                    }else if(result.data.data[i].factId === 'F_0005') {
                        this.activeUserNum = result.data.data[i].factValue;
                    } else if(result.data.data[i].factId === 'F_0012') {
                        transactionNumCarPark.push(result.data.data[i].factSort);
                        transactionNum.push(result.data.data[i].factValue)
                    } else if(result.data.data[i].factId === 'F_0013') {
                        transactionCost.push(result.data.data[i].factValue);
                        transactionCostCarPark.push(result.data.data[i].factSort);
                    } else if(result.data.data[i].factId === 'F_0014') {
                        noParkingLots.push(result.data.data[i].factSort.split('：')[0]);
                    }
                }
                this.noUsedParkingLots = noParkingLots;
                var transactionData = {};
                transactionData.title = {subtext: '交易笔数'};
                transactionData.tooltip = {
                    trigger: 'axis',
                    formatter: "{b}<br/> {c} (笔)"
                };
                transactionData.carPark = transactionNumCarPark;
                transactionData.num = transactionNum;
                this.transactionNumEchartsOption = this.setTransactionData(transactionData);

                var transactionData = {};
                transactionData.title = {subtext: '交易金额'};
                transactionData.tooltip = {
                    trigger: 'axis',
                    formatter: "{b}<br/> {c} (元)"
                };
                transactionData.carPark = transactionCostCarPark;
                transactionData.num = transactionCost;
                this.transactionCostEchartsOption = this.setTransactionData(transactionData);;
                this.transactionEchartsFlag = false;
                this.$nextTick(()=>{
                    this.transactionEchartsFlag = true;
                });
            } else {
                this.$message.error(result.data.message);
            }
        });
      },
      leftButtonEvent() {
          if(this.couponIndex === 0) {
              this.setSectorData(this.couponList[this.couponList.length - 1]);
              this.couponIndex = this.couponList.length - 1;
          } else {
              this.setSectorData(this.couponList[this.couponIndex - 1]);
              this.couponIndex = this.couponIndex - 1;
          }
          this.pieChartsFlag = false;
          this.$nextTick(()=>{
              this.pieChartsFlag = true;
          });
      },
      rightButtonEvent() {
          if(this.couponIndex === (this.couponList.length - 1)) {
              this.setSectorData(this.couponList[0]);
              this.couponIndex = 0;
          } else {
              this.setSectorData(this.couponList[this.couponIndex + 1]);
              this.couponIndex = this.couponIndex + 1;
          }
          this.pieChartsFlag = false;
          this.$nextTick(()=>{
              this.pieChartsFlag = true;
          });
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
            this.couponList = result.data.data.couponList;
            this.setSectorData(result.data.data.couponList[0]);
            this.pieChartsFlag = false;
            this.$nextTick(()=>{
                this.pieChartsFlag = true;
            });
        });
        var depotList = [];
        for(var i = 1; i < 21; i++) {
            var data = {};
            data.name = "贵州省凯里市州人民医院" + i;
            if(i % 3 === 0) {
                data.type = '1';
            } else if(i % 3 === 1) {
                data.type = '2';
            } else {
                data.type = '3';
            }
            depotList.push(data);
        }
        this.setCarNumData(depotList);
      },
      setSectorData(data) {
          var couponOption = {
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
                        radius: [0, '30%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        data:[
                            {value:0, name:'已领', itemStyle: { color: '#20FF16' }},
                            {value:0, name:'未领', itemStyle: { color: '#DDDDDD' }}
                        ]
                    },
                    {
                        name:'优惠券使用情况',
                        type:'pie',
                        radius: ['50%', '65%'],
                        data:[
                            {value:0, name:'已使用', itemStyle: { color: '#20FF16' }},
                            {value:0, name:'未使用', itemStyle: { color: '#00FFFF' }},
                            {value:0, name:'未领', itemStyle: { color: '#DDDDDD' }}
                        ]
                    }
                ]
            };
            couponOption.title.subtext = data.name;
            couponOption.series[0].name = data.name;
            couponOption.series[0].data[0].value = data.getcount;
            couponOption.series[0].data[1].value = data.surpluscount;
            couponOption.series[1].name = data.name;
            couponOption.series[1].data[0].value = data.usecount;
            couponOption.series[1].data[1].value = data.notusecount;
            couponOption.series[1].data[2].value = data.surpluscount;
            this.couponStatusEchartsOption = couponOption;

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
                        radius: [0, '30%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        data:[
                            {value:0, name:'已领金额', itemStyle: { color: '#20FF16' }},
                            {value:0, name:'未领金额', itemStyle: { color: '#DDDDDD' }}
                            ]
                        },
                        {
                            name:'活动费用使用情况',
                            type:'pie',
                            radius: ['50%', '65%'],
                            data:[
                                {value:0, name:'已使用金额', itemStyle: { color: '#20FF16' }},
                                {value:0, name:'未使用金额', itemStyle: { color: '#00FFFF' }},
                                {value:0, name:'未领金额', itemStyle: { color: '#DDDDDD' }}
                            ]
                        }
                    ]
                }
            activeCostOption.title.subtext = data.name + '费用使用情况';
            activeCostOption.series[0].name = data.name + '费用使用情况';
            activeCostOption.series[0].data[0].value = data.getcount * data.amount;
            activeCostOption.series[0].data[1].value = data.surpluscount * data.amount;
            activeCostOption.series[1].name = data.name + '费用使用情况';
            activeCostOption.series[1].data[0].value = data.usecount * data.amount;
            activeCostOption.series[1].data[1].value = data.notusecount * data.amount;
            activeCostOption.series[1].data[2].value = data.surpluscount * data.amount;
            this.activeCostEchartsOption = activeCostOption;
      },
      setCarNumData(data) {
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
                axisLabel:{
                    formatter:function(value){
                        return value.split("").join("\n");
                    }
                },
                data: []
            },
            yAxis: {
                type: 'value',
                axisPointer: {
                    snap: true
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
            visualMap: {
                show: false,
                dimension: 0,
                pieces: []
            },
            series: [
                {
                    name:'车流量统计',
                    type:'scatter',
                    smooth: true,
                    data: []
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
        var nameList = [];
        var visualList = [];
        var seriesData = [];
        for(var i = 0; i < data.length; i++) {
            let visual = {};
            nameList.push(data[i].name);
            if(i === 0) {
                if(data[i].type === '1') {
                    visual ={
                        lte: 0,
                        color: 'green'
                    };
                    visualList.push(visual);
                } else if(data[i].type === '2'){
                    visual ={
                        lte: 0,
                        color: 'yellow'
                    };
                    visualList.push(visual);
                } else {
                    visual ={
                        lte: 0,
                        color: 'red'
                    };
                    visualList.push(visual);
                }
            } else {
                if(data[i].type === '1') {
                    visual ={
                        gt: i-1,
                        lte: i,
                        color: 'green'
                    };
                    visualList.push(visual);
                } else if(data[i].type === '2'){
                    visual ={
                        gt: i-1,
                        lte: i,
                        color: 'yellow'
                    };
                    visualList.push(visual);
                } else {
                    visual ={
                        gt: i-1,
                        lte: i,
                        color: 'red'
                    };
                    visualList.push(visual);
                }
            }
            seriesData.push('0');
        }
        carNumOption.xAxis.data = nameList;
        carNumOption.visualMap.pieces = visualList;
        carNumOption.series[0].data = seriesData;
        carNumOption.xAxis.axisLabel.formatter = this.labelFormatter;
        carNumOption.dataZoom[0].end = this.calculationProportion(nameList.length, 5);
        this.carNumEchartsOption = carNumOption;
      },
      setTransactionData(data) {
          var transactionNumOption = {
                 title : {
                    subtext: '交易笔数'
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: "{b}<br/> {c} (笔)"
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
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : []
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
                        data:[],
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
            transactionNumOption.title = data.title;
            transactionNumOption.tooltip = data.tooltip;
            transactionNumOption.xAxis[0].data = data.carPark;
            transactionNumOption.series[0].data = data.num;
            // transactionNumOption.xAxis[0].axisLabel.formatter = this.labelFormatter;
            transactionNumOption.dataZoom[0].end = this.calculationProportion(data.carPark.length, 5);
            return transactionNumOption;
      },
      setLineChart(data) {
        var lineChartOption = {
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
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : []
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
            series : [],
            grid: {　　//这个是用来设置echarts图标的位置和其他设置
                left: '5%',
                right: '12%',
                bottom: '8%',
                top: '25%',
                containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
            }
        };
        lineChartOption.title = data.title;
        lineChartOption.xAxis[0].data = data.xAxisData;
        lineChartOption.series = data.series;
        lineChartOption.legend = data.legend;
        lineChartOption.color = data.color;
        lineChartOption.dataZoom[0].end = this.calculationProportion(data.xAxisData.length, 5);
        return lineChartOption;
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
      calculationProportion(allNum, showNum) {
          return (showNum / allNum * 100);
      },
      labelFormatter(params) {
        var newParamsName = "";// 最终拼接成的字符串
        var paramsNameNumber = params.length;// 实际标签的个数
        var provideNumber = 2;// 每行能显示的字的个数
        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
        /**
         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
         */
        // 条件等同于rowNumber>1
        if (paramsNameNumber > provideNumber) {
            /** 循环每一行,p表示行 */
            for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";// 表示每一次截取的字符串
                var start = p * provideNumber;// 开始截取的位置
                var end = start + provideNumber;// 结束截取的位置
                // 此处特殊处理最后一行的索引值
                if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + "\n";
                }
                newParamsName += tempStr;// 最终拼成的字符串
            }

        } else {
            // 将旧标签的值赋给新标签
            newParamsName = params;
        }
        //将最终的字符串返回
        return newParamsName;
      },
      dateToStr(data) {
          if(data < 10) {
              data = '0' + data;
          } else {
              data = '' + data;
          }
          return data;
      },
      unique(arr) {            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
        return arr;
      },
      getYearWeek(date){  
        var date2=new Date(date.getFullYear(), 0, 1);
        var rq = date-date2;
        var s1 = Math.ceil(rq/(24*60*60*1000));
        var d = Math.ceil(s1/7) + 1;
        var weekStr = '';
        var dateStr = '';
        dateStr = '' + (date.getMonth() + 1) + (date.getDate() - 1);
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
