<template>
    <div class="filter-tile-list prev-m-index" :class="['prev-m-index__index--' + counter, rootClasses]">

        <template v-for="(filteredItem, i) in filteredItems" >
          <div class="prev-m-index__col" :class="['prev-m-index__col--' + i]" :key="filteredItem.id">
            <tile-list class="prev-m-index__category" :facets="facets" :title="i" :items="filteredItem" v-if="isLoaded"/>
          </div>
        </template>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex';
    import axios from 'axios';

    import facetMixin from '../libs/vue/facetMixin';
    import { filterItems } from './helpers';

    export default {
        mixins: [facetMixin('filter-tile-list')],
        props: {

        },

        data() {
            return {
                isLoaded: false,
                /**
                 * @type {FilterableTile[]}
                 */
                items: {},

                /**
                 * @type {CategoryFilter[]}
                 */
                categories: [],

                counter: 0,

                activity: {}
            };
        },

        computed: {
            ...mapState('filter-list', ['selectedFilter']),
            ...mapState('filter-list', ['search']),

            filteredItems() {
                if (!this.isLoaded) {
                    return null;
                }

                let filteredItems = filterItems(this.items, this.selectedFilter, this.search);

                this.$children.forEach((child) => {
                  child.onTileUpdated();
                });

                this.counter = Object.keys(filteredItems).length;

                return filteredItems;
            },


        },

        methods: {
            ...mapActions('filter-list', ['setFilters', 'setSelectedFilter']),
            ...mapActions('filter-list', ['setSearch']),
            ...mapActions('filter-list', ['setActivity']),

            loadData() {

                let data = window.darvinPayload;
                this.categories = Object.keys(data);

                this.items = {};

                this.categories.forEach((category) => {
                  this.items[category] = Object.keys(data[category]).map((k) => data[category][k]);
                });

                this.setFilters({ filters: this.categories });
                this.setSelectedFilter({ filter: this.categories });
                this.setSearch({ search: ''});

                this.$root.$children.forEach((children) => {
                  if(children.$el.classList.contains('prev-m-filterbar')) {
                    children.categoryFilter = this.categories;
                  }
                });

                axios.get('./log/activity-visualizer.json')
                  .then((response) => {
                      this.setActivity({ activity: response.data});
                      this.isLoaded = true;
                  });

            }
        },

        mounted() {
            this.loadData();
        },


    };
</script>
