<template>
    <div class="card-index prev-m-index" :class="['prev-m-index__index--' + counter, rootClasses]">

        <template v-for="(filteredCategory, i) in filteredCategories" >
          <div class="prev-m-index__col" :class="['prev-m-index__col--' + i]" :key="i">
            <card-list class="prev-m-index__category" :facets="facets" :key="i" :title="i" :items="filteredCategory" v-if="isLoaded"/>
          </div>
        </template>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex';
    import axios from 'axios';

    import facetMixin from '../libs/vue/facetMixin';
    import { filterCategories } from './helpers';

    export default {
        mixins: [facetMixin('card-index')],
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
            ...mapState('filter-list', ['mode']),

            filteredCategories() {
                if (!this.isLoaded) {
                    return null;
                }

                let filteredCategories = filterCategories(this.items, this.selectedFilter);

                this.$children.forEach((child) => {
                  this.$nextTick(function() {
                    child.onCardUpdated();
                  });
                });

                this.counter = Object.keys(filteredCategories).length;

                return filteredCategories;
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

        watch: {
            mode() {
                console.log("MODE CHANGE");
                document.body.classList.toggle('darkmode');
            }
        },

        mounted() {
            this.loadData();
        },


    };
</script>
