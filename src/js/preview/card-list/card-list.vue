<template>
    <div class="prev-m-index__category">
        <h2 class="prev-m-index__title">{{title }}</h2>

        <isotope :options='options'
                item-selector="prev-m-index__item"
                :list="list"
                ref="isotope"
                class="prev-m-index__items"
                @filter="filterOption=arguments[0]"
                @sort="sortOption=arguments[0]">
            <div v-for="item in list"
                    :key="item.id" class="gradient-border">
                <card-item @updated="onCardUpdated" :name="item.name" :type="item.type" :facets="facets" :largest-height="highestElement">
                    <span slot="name">{{ item.name }}</span>
                </card-item>
            </div>
        </isotope>

    </div>
</template>

<script>
    import isotope from 'vueisotope';
    import axios from 'axios';
    import FuzzySet from 'fuzzyset.js'
    import { mapActions, mapState } from 'vuex';

    import facetMixin from '../libs/vue/facetMixin';
    import debounce from 'lodash.debounce';

    export default {
        components: { isotope },
        mixins: [facetMixin('card-list')],
        props: {

            category: {
              type: String,
            },

            /**
             * @type {CardItem[]}
             */
            items: {
              type: Array,
              default: () => [],
            },

            title: {
              type: String,
              default: '',
            },

            sortOption: {
              type: String,
              default: 'id',
            }
        },

        data() {
          return {
            masonry: null,
            isMounted: false,
            highestElement: null,
            list: this.items,
            addedItems: [],
            options: {
              getSortData: {
                  name: "name",
                  id: "id"
              },
              sortBy : "name",
              getFilterData: {
                "show all": function(el) {
                  return true;
                },
                "search": (el) => {
                  let a = FuzzySet();
                  a.add(this.search);

                  let fuzzyCheck = a.get(el.name);

                  if(!fuzzyCheck) {
                    return el.name.includes(this.search)
                  }

                  if(fuzzyCheck[0][0]>0.2) {
                    return true;
                  }

                  return false;// return el.name.includes(this.search);
                },
              }
            }
          };
        },

        computed: {
          ...mapState('filter-list', ['search']),
        },

        methods: {
          onCardUpdated() {
              this.$nextTick(() => {
                  if(this.$refs.isotope) this.$refs.isotope.arrange();
              });
          },
          newMount() {
              console.log("cardlist mounted");
          }
        },

        beforeDestroy() {
            this.isMounted = false;
        },

        watch: {
          items() {
            console.log("items changed in " + this.title);
          },
          search() {
            this.$refs.isotope.filter('search');
          }
        },

        mounted() {
          this.isMounted = true;
          this.newMount();
        }
    };
</script>
