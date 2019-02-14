let mode = false;

if(localStorage.getItem("darvin-darkmode")) {
  if(localStorage.getItem("darvin-darkmode")=='true') {
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
