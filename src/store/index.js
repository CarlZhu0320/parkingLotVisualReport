import Vue from 'vue';
import "babel-polyfill";
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        global: {
            url: 'http://test.hkcts.hebuyun.com/report',//测试环境
            testUrl: 'http://dev.zhou-hong.com:10020/api/v2/statistics/'
        }
    }
});
export default store;
