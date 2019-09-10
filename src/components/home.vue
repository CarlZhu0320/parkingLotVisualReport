<template>
  <div class="home">
    <div class="boxall vehicleOwnerTheme">
      <div class="alltitle">车主主题</div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: 1.5rem;">
        <div class="boxall vehicleOwnerThemeShowInfo">
          <div class="vehicleOwnerThemeShowInfoText">
            <span style="color: #20FF16; font-size: .6rem;">1000</span><br>
            <span style="font-size: .19rem; color: rgba(255,255,255,.7);">用户总数(个)</span>
          </div>
          <div class="vehicleOwnerThemeline"></div>
          <div class="vehicleOwnerThemeShowInfoText">
            <span style="color: #20FF16; font-size: .6rem; ">2000</span><br>
            <span style="font-size: .19rem; color: rgba(255,255,255,.7);">总绑卡数(个)</span>
          </div>
          <div class="boxfoot"></div>
        </div>
        <div class="boxall vehicleOwnerThemeShowInfo" style="text-align: center;">
          <span style="color: #20FF16; font-size: .6rem;">1000</span><br>
          <span style="font-size: .19rem; color: rgba(255,255,255,.7);">活动用户数(个)</span>
          <div class="boxfoot"></div>
        </div>
      </div>
      <div class="vehicleOwnerThemeShowDiv vehicleOwnerThemeShowDivRight" style="margin-top: 1.5rem;">
        <newAddUsers></newAddUsers>
      </div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: 0.2rem;">

      </div>
      <div class="vehicleOwnerThemeShowDiv vehicleOwnerThemeShowDivRight" style="margin-top: 0.2rem;">

      </div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: 0.2rem;">

      </div>
      <div class="vehicleOwnerThemeShowDiv vehicleOwnerThemeShowDivRight" style="margin-top: 0.2rem;">

      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="boxall marketingTheme">
      <div class="alltitle" style="position: absolute; text-align: center; width: 13.2rem;">营销主题</div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: -13.85rem;">
        <couponStatus></couponStatus>
      </div>
      <div class="vehicleOwnerThemeShowDiv" style="margin-top: -13.85rem;margin-left: 6.4rem;">
      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="boxall parkingLotTheme">
      <div class="alltitle" style="position: absolute; text-align: center; width: 13.2rem;">车场主题</div>
      <div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -8.3rem;">
          <transactionNum></transactionNum>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -8.3rem;margin-left: 6.4rem;">
          <polygonalChart v-if="echartsFlag" :option="carNumEchartsOption" :echartsId="carNumEchartsId"></polygonalChart>
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -4.25rem;">
        </div>
        <div class="vehicleOwnerThemeShowDiv" style="margin-top: -4.25rem;margin-left: 6.4rem;">
        </div>
      </div>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>

<script>
import newAddUsers from './newAddUsers'
import couponStatus from './couponStatus'
import transactionNum from './transactionNum'
import polygonalChart from './polygonalChart'
export default {
  name: 'home',
  data () {
    return {
      carNumEchartsOption: {},
      carNumEchartsId: 'carNumEcharts',
      echartsFlag: false
    }
  },
  mounted() {
    var option = {
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
    this.carNumEchartsOption = option;
    this.echartsFlag = true;
  },
  components: {
    newAddUsers,
    couponStatus,
    transactionNum,
    polygonalChart
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
