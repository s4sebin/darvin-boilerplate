import * as types from './mutation-types';

export default {

    [types.SET_FILTER](state, { filters }) {
        state.filters = filters;
    },

    [types.SET_SELECTED_FILTER](state, { filter }) {
        state.selectedFilter = filter;
    },

    [types.SET_SEARCH](state, { search }) {
        state.search = search;
    },

    [types.SET_ACTIVITY](state, { activity }) {
      state.activity = activity;
    },

    [types.SET_MOBILE_VISIBILITY](state, { isVisible }) {
        state.isMobileVisible = isVisible;
    },
};
