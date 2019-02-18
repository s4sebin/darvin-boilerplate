/**
 * @file Darvin Element Activity
 * @author Tobias Frei
 *
 * TODO!: cleanup and refactor
 *
 * @module activity
 */

let instance = {},
  defaults = {
    container: '.prev-m-index',
    days: 20,
    height: 100,
    width: 360,
    maxHeight: '80',
    colors: {
      grey1: '#363636',
      grey2: '#343434',
      grey3: '#292929'
    }
  };

// Module Variables
let settings = {},
  container,
  moduleCards,
  deltaArr = [];

// Private Functions
const loadJson = (url) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response);
        }
        else {
          return Promise.reject(new Error('Failed to load'));
        }
      })
      .then(response => response.json())
      .then((data) => {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
              let card = container.querySelector('[data-name="' + key + '"');
              if(card) {
                initGraph(key, data[key],  card);
              }
          }
        }


      })
      .catch(function () {});

  },
  initGraph = (name, data, el) => {

    let ctx = el.querySelector('canvas').getContext('2d'),
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

      el.querySelector('.prev-m-index__lastupdate[data-update]').innerHTML = latestCommitSplits[0] + ' <span>' + latestCommitSplits[1] + '</span>';
    } else {
      el.querySelector('.prev-c-led').classList.add('prev-c-led--blue');
      el.querySelector('.prev-m-index__lastupdate[data-update]').innerHTML = 'Uncommited';
    }

    let pointArr = [];
    setInterval(() => {

      draw(ctx, name, valArr, pointArr);
    }, 30);
  },
  draw = (ctx, name, valArr, pointArr) => {
    ctx.fillStyle = settings.colors.grey1;
    ctx.strokeStyle = settings.colors.grey2;
    ctx.save();
    drawGrid(ctx, settings.width, settings.height, 10, 10);

    for (let i = 0; i < valArr.length; i++) {
      if (isNaN(pointArr[i])) {
        pointArr[i] = settings.height;
      }

      ctx.lineWidth = 1;
      let larg = (settings.width - 20) / (valArr.length - 1);
      deltaArr[i] = (settings.height - valArr[i]) - pointArr[i];
      pointArr[i] += deltaArr[i] / (i + 30);

      ctx.strokeStyle = settings.colors.grey1;
      ctx.fillStyle = settings.colors.grey3;
      drawingLines(ctx, larg, pointArr, i);
    }
  },
  drawingLines = (ctx, width, points, i) => {
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
  drawGrid = (ctx, width, height, colun, line) => {
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
  };


/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object|undefined} Instance of created module.
 */

instance.init = (options) => {
  Object.assign(settings, defaults, options);

  // Public Code
  container = document.querySelector(settings.container);

  if (!container) return;

  moduleCards = container.querySelectorAll('.prev-m-index__col--modules .prev-m-index__items .prev-m-index__item, .prev-m-index__col--components .prev-m-index__items .prev-m-index__item, .prev-m-index__col--pages .prev-m-index__items .prev-m-index__item');

  if (!moduleCards) return;

  loadJson('assets/log/activity-visualizer.json');

  return instance;
};

export default instance;
