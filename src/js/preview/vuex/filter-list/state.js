let mode = false;

if(sessionStorage.getItem("darvin-darkmode")) {
  if(sessionStorage.getItem("darvin-darkmode")=='true') {
    mode = true;
  }
}

export default {
    filters: [],

    selectedFilter: [],

    search: '',

    activity: {},

    isMobileVisible: false,

    mode: mode,
}
