<template>
    <div class="prev-m-filterbar">
      <div class="prev-m-filterbar__categories">
        <div class="prev-m-filterbar__category" v-for="filter in filters" :key="filter.value">
          <input class="prev-m-filterbar__input"
            :class="getElementClass(filter, 'input')"
            type="checkbox"
            name="selectedFilters"
            v-model="categoryFilter"
            :value="filter"
            :checked="true"
            :id="filter">
          <label class="prev-m-filterbar__lbl prev-m-servicenav__link" :for="filter" :class="getElementClass(filter, 'label')" @click="onLabelClick(filter)">
              {{ filter[0] }}
          </label>
        </div>
      </div>
      <div class="prev-m-filterbar__search">
        <input type="text" v-model="categorySearch" placeholder="Search.."/>
      </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    import facetMixin from '../libs/vue/facetMixin';

    export default {
        mixins: [facetMixin('filter-view')],
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
            };
        },

        computed: {
            ...mapState('filter-list', ['search']),
            ...mapState('filter-list', ['selectedFilter']),
            ...mapState('filter-list', ['filters']),
        },

        methods: {
            ...mapActions('filter-list', ['setSelectedFilter']),
            ...mapActions('filter-list', ['setSearch']),

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
            }
        },

        mounted() {
          console.log("filter mounted");
        }
    };
</script>
