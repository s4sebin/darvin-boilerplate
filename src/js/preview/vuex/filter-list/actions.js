import * as types from './mutation-types';

export function setFilters({ commit }, { filters }) {
  commit(types.SET_FILTER, { filters });
}

export function setSelectedFilter({ commit }, { filter }) {
  commit(types.SET_SELECTED_FILTER, { filter });
}

export function setSearch({ commit }, { search }) {
  commit(types.SET_SEARCH, { search });
}

export function setActivity({ commit }, { activity }) {
  commit(types.SET_ACTIVITY, { activity });
}

export function setMobileVisibility({ commit }, { isVisible }) {
  commit(types.SET_MOBILE_VISIBILITY, { isVisible });
}
