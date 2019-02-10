<template>
    <div class="prev-m-index__category">
        <h2 class="prev-m-index__title">{{title }}</h2>

        <isotope :options='options'
                item-selector="prev-m-index__item"
                :list="items"
                ref="isotope"
                class="prev-m-index__items"
                @filter="filterOption=arguments[0]"
                @sort="sortOption=arguments[0]">
            <div v-for="item in items"
                    :key="item.id">
                <card-item @updated="onTileUpdated" :name="item.name" :type="item.type" :facets="facets" :largest-height="highestElement">
                    <span slot="name">{{ item.name }}</span>
                </card-item>
            </div>
        </isotope>

    </div>
</template>

<script>

    import isotope from 'vueisotope';
    import axios from 'axios';

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

            /**
             * @type {CardItem[]}
             */
            title: {
                type: String,
                default: '',
            }
        },

        data() {
            return {
                masonry: null,
                isMounted: false,
                highestElement: null,
                addedItems: [],
                options: {
                    getFilterData: {}
                }
            };
        },

        methods: {

            /**
             * Handle updates triggered from the tile itself
             */
            onTileUpdated() {
                this.$nextTick(() => {
                    if(this.$refs.isotope) this.$refs.isotope.arrange();
                });
            },

            /**
             * Reset all heights and recalculate the highest in the next tick
             */
            recomputeHightestElement() {
                if (!this.isMounted) {
                    return;
                }

                this.highestElement = null;
                this.$nextTick(function() {
                    this.highestElement = this.getMaxHeight();
                });
            },

            /**
             * Get the highest elements height
             * @return {number}
             */
            getMaxHeight() {
                if (!this.isMounted) {
                    return;
                }

                const el = this.$refs.isotope.$el;
                const childs = Array.from(el.querySelectorAll('.card-item__content'));
                return childs.reduce((acc, child) => {
                    if (!child) {
                        return;
                    }
                    if (child.offsetHeight > acc) {
                        return child.offsetHeight;
                    }
                    return acc;
                }, 0);
            },

            /**
             * Load data from API
             */
            newMount() {
                console.log("cardbox mounted");
            }
        },

        beforeDestroy() {
            this.isMounted = false;
        },

        mounted() {
            this.isMounted = true;

            this.newMount();
        }
    };
</script>
