//require('es6-promise').polyfill();

import Vue from 'vue';

import Vuex from 'vuex';

import store from './vuex';

// Components
import TileList from './tile-list/tile-list.vue';
import ExpandableTile from './tile-list/expandable-tile/expandable-tile';
import FilterTileList from './filter-tile-list/filter-tile-list';
import FilterView from './filter-view/filter-view';

Vue.use(Vuex);


Vue.component('tile-list', TileList);
Vue.component('expandable-tile', ExpandableTile);
Vue.component('filter-tile-list', FilterTileList);
Vue.component('filter-view', FilterView);

export default {
    init() {
        if (document.querySelector('.preview--index #l-pagewrapper')) {
            const AppRoot = new Vue({
                comments: true,
                store: store(),
            });

            AppRoot.$mount('#l-pagewrapper');
        }
    }
};
