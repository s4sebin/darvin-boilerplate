<template>
    <article class="card-item prev-m-index__itemwrap"
            :class="[...rootClasses, ...additionalClasses]"
    >

          <canvas class="canvas" width="360" height="100"></canvas>
          <div class="prev-m-index__panel">
            <div class="prev-m-index__itemcol prev-m-index__itemcol--grow">
              <div class="prev-m-index__itemrow">
                <a class="prev-m-index__itemtitle" href="">{{ name }}</a>
              </div>
              <div class="prev-m-index__itemrow">
                <a class="prev-m-index__flag prev-m-index__flag--design" href="" target="_blank">D</a>
                <a class="prev-m-index__flag prev-m-index__flag--jira" href="" target="_blank">J</a>
                <a class="prev-m-index__flag prev-m-index__flag--confluence" href="" target="_blank">C</a>
              </div>
            </div>
            <div class="prev-m-index__itemcol">
              <div class="prev-m-index__itemrow">
                <a class="prev-m-index__minibtn" data-dep><i class="i i-target"></i></a>
              </div>
            </div>
          </div>

          <footer class="prev-m-index__itemfooter">
            <div class="prev-m-index__itemrow">
              <div class="prev-c-ledbox">
                <div class="prev-c-led"></div>
              </div>
              <div class="prev-m-index__metalbl prev-m-index__lastupdate" data-update>&nbsp;</div>
            </div>
          </footer>

    </article>
</template>

<script>

    import facetMixin from '../../libs/vue/facetMixin';
    import { mapActions, mapState } from 'vuex';

    let settings = {
      days: 20,
      height: 100,
      width: 360,
      maxHeight: '80',
      colors: {
        grey1: '#363636',
        grey2: '#343434',
        grey3: '#292929'
      }
    },
    counter = 0,
    timer;

    export default {
        mixins: [facetMixin('card-item')],

        props: {
            largestHeight: {
                type: Number,
                default: null,
            },
            name: {
                type: String
            },
            type: {
                type: String
            },
        },

        data() {
            return {
                isOpen: false,
                hasDescription: true,
                deltaArr: [],
                timer: {},
                counter: 0
            };
        },

        computed: {
            ...mapState('filter-list', ['activity']),

            cardActivity() {
                if (!this.largestHeight || this.isOpen) {
                    return null;
                }

                return this.activity[this.name]
            },

            contentStyle() {
                if (!this.largestHeight || this.isOpen) {
                    return null;
                }

                return `height: ${this.largestHeight}px`;
            },

            additionalClasses() {
                return [
                    this.isOpen ? `card-item--active` : null,
                ];
            },
        },

        watch: {
            descr() {
                this.hasDescription = false;
            },

            largestHeight() {
                this.isOpen = false;
            },

            isOpen() {
                this.$emit('updated');
            }
        },

        methods: {
            onOpen() {
                this.isOpen = !this.isOpen;
            },
            initVisualizer() {
                let name = this.name;
                let el = this.$el;
                let data = this.activity[this.name];

                let canvas = el.querySelector('canvas'),
                    ctx = canvas.getContext('2d'),
                    valArr = new Array(20);

                // loop trough the last 20 days
                for (var i = 0; i < settings.days; i++) {
                  let calcDay = new Date(new Date().getTime() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
                  valArr[i] = ('0'); // default zero

                  // search for matching commits
                  for (var j = 0; j < data.all.length; j++) {
                    if (data.all[j].date.split(' ')[0] == calcDay) {
                      valArr[i] = parseInt(valArr[i]) + 10;

                      if (parseInt(valArr[i]) > 80) {
                        valArr[i] = settings.maxHeight;
                      }
                    }
                  }
                }

                valArr.reverse();

                if (data.latest) {
                  let latestCommitSplits = data.latest.date.split(' ');
                  let flagRangeStart = new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000));
                  let flagRangeEnd = new Date(latestCommitSplits[0]);

                  if (flagRangeEnd >= flagRangeStart) {
                    el.querySelector('.prev-c-led').classList.add('prev-c-led--green');
                  }

                  el.querySelector('.prev-m-index__lastupdate[data-update]').innerHTML = 'Last Commit: ' + latestCommitSplits[0] + ' <span>' + latestCommitSplits[1] + '</span>';
                } else {
                  el.querySelector('.prev-c-led').classList.add('prev-c-led--blue');
                  el.querySelector('.prev-m-index__lastupdate[data-update]').innerHTML = 'New Module';
                }

                let pointArr = [];

                this.timer = setInterval(() => {
                  this.draw(ctx, name, valArr, pointArr, 60);
                }, 30);

            },
            draw(ctx, name, valArr, pointArr, killSwitch) {
               if(this.counter == killSwitch) {
                // kill draw intervall
                clearInterval(this.timer);
                this.counter++;
              }  else if(this.counter < killSwitch) {
                this.counter++;
              }

              ctx.fillStyle = settings.colors.grey1;
              ctx.strokeStyle = settings.colors.grey2;
              ctx.save();
              this.drawGrid(ctx, settings.width, settings.height, 10, 10);

              for (let i = 0; i < valArr.length; i++) {
                if (isNaN(pointArr[i])) {
                  pointArr[i] = settings.height;
                }

                ctx.lineWidth = 1;
                let larg = (settings.width - 20) / (valArr.length - 1);
                this.deltaArr[i] = (settings.height - valArr[i]) - pointArr[i];
                pointArr[i] += this.deltaArr[i] / (i);

                ctx.strokeStyle = settings.colors.grey1;
                ctx.fillStyle = settings.colors.grey3;
                this.drawingLines(ctx, larg, pointArr, i);
              }
            },
            drawingLines(ctx, width, points, i) {
              ctx.beginPath();
              ctx.globalAlpha = i * 0.04;
              ctx.moveTo(((i - 1) * width + 10), points[i - 1]);
              ctx.lineTo(i * width + 10, points[i]);
              ctx.lineTo(i * width + 10, settings.height);
              ctx.lineTo(((i - 1) * width + 10), settings.height);
              ctx.lineTo(((i - 1) * width + 10), points[i - 1]);
              ctx.fill();
              ctx.beginPath();
              ctx.globalAlpha = 1;
              ctx.moveTo(((i - 1) * width + 10), points[i - 1]);
              ctx.lineTo(i * width + 10, points[i]);
              ctx.stroke();
              ctx.beginPath();
              ctx.save();
              ctx.fillStyle = ctx.strokeStyle;
              ctx.arc(i * width + 10, points[i], 2, 0, Math.PI * 2)
              ctx.fill();
              ctx.restore();
            },
            drawGrid(ctx, width, height, colun, line) {
              ctx.fillRect(0, 0, width, height);
              ctx.save();
              for (var i = 1; i < (width / colun); i++) {
                ctx.beginPath();
                ctx.moveTo(i * colun, 0);
                ctx.lineTo(i * colun, height);
                ctx.stroke();
              }
              for (var l = 1; l < (height / line); l++) {
                ctx.beginPath();
                ctx.moveTo(0, l * line);
                ctx.lineTo(width, l * line);
                ctx.stroke();
              }
            },
        },

        mounted() {
          this.counter = 0;
          this.initVisualizer();
        }

    };
</script>
