<template>
    <div class="prev-m-filterbar">
      <div class="prev-m-filterbar__categories">
        <div class="prev-m-filterbar__category prev-m-filterbar__checkbox" v-for="filter in filters" :key="filter.value">
          <input class="prev-m-filterbar__input"
            :class="getElementClass(filter, 'input')"
            type="checkbox"
            name="selectedFilters"
            v-model="categoryFilter"
            :value="filter"
            :checked="true"
            :id="filter">
            <label class="prev-m-filterbar__lbl check" :for="filter" :class="getElementClass(filter, 'label')" @click="onLabelClick(filter)">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
                <span>{{ filter }}</span>
            </label>
        </div>
        <div class="prev-m-filterbar__search">
          <input type="text" v-model="categorySearch" placeholder=".." spellcheck="false"/>
        </div>
        <div class="prev-m-filterbar__mode">
          <input id="prev-layout" class="prev-m-filterbar__modeinput" type="checkbox" v-model="checkboxDarkmode" value="dark" checked="false">
          <label class="prev-m-filterbar__lbl prev-m-filterbar__modelbl" for="prev-layout">
            <i v-if="!checkboxDarkmode" class="ico i-night"></i>
            <i v-if="checkboxDarkmode" class="ico i-sun"></i>
          </label>
       </div>
      </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    import facetMixin from '../libs/vue/facetMixin';

    export default {
        mixins: [facetMixin('card-filter')],
        props: {},

        data() {
            return {
                /**
                 * @type {CategoryFilter}
                 */
                categoryFilter: [],

                /**
                 * @type {CategorySearch}
                 */
                categorySearch: '',

                checkboxDarkmode: false
            };
        },

        computed: {
            ...mapState('filter-list', ['search']),
            ...mapState('filter-list', ['mode']),
            ...mapState('filter-list', ['selectedFilter']),
            ...mapState('filter-list', ['filters']),
        },

        methods: {
            ...mapActions('filter-list', ['setSelectedFilter']),
            ...mapActions('filter-list', ['setSearch']),
            ...mapActions('filter-list', ['setMode']),

            /**
             * Handle click even on label
             *
             * @param {CategoryFilter} category
             */
            onLabelClick(category) {
                if (category.isReset === true) {
                    this.categoryFilter = null;
                }
            },

            /**
             * Get class for filter element
             *
             * @param {CategoryFilter} category
             * @param {Element} element
             * @return {string|null}
             */
            getElementClass(category, element) {
                return [
                    (category.value === null && this.selectedFilter === null || (this.selectedFilter && this.selectedFilter.value === category.value)) ? this.facetElement(element, 'active') : null,
                    category.isReset ? this.facetElement(element, 'is-reset') : null,
                ];
            },
        },

        watch: {
            categoryFilter(val) {
                if(val.length<1) {
                    val = [];
                }

                this.setSelectedFilter({ filter: val });
            },
            categorySearch(val) {
              this.setSearch({ search: val});
            },
            checkboxDarkmode(val) {
              if(val) {
                this.setMode({ mode: true});
                console.log("set darkmode true" );
                localStorage.setItem("darvin-darkmode", "true");
              } else {
                this.setMode({ mode: false});
                console.log("set darkmode false" );
                localStorage.setItem("darvin-darkmode", "false");
              }
            }
        },

        mounted() {
          // darkmode
          if(this.mode) {
            this.checkboxDarkmode = true;
          }
        }
    };
</script>
