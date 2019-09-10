<template>
    <div :id="echartsId" style="height:3.8rem;width:6rem;" ></div>
</template>
<script>
export default {
  name: "newAddUsers",
  props: ['echartsId', 'option'],
  data() {
    return {

    };
  },
  mounted() {
      this.newAddUsersEchartsInit();
  },
  methods:{
      newAddUsersEchartsInit(){
        // 基于准备好的dom，初始化echarts图表
        var myChart = this.$echarts.init(document.getElementById(this.echartsId)); 
        myChart.setOption(this.option);
      }
  }
}
</script>