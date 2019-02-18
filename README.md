![](http://tobiasfrei.ch/github/darvin-boilerplate/darvin-MIT_(c)TobiasFrei.svg)

create static HTML pages with preview. Suitable for the delivery of frontend prototypes.

- Webpack Bundler
- ES201X Transpiler
- Mozilla Nunjucks HTML
- Sass Precompiler
- SVG Sprite Generator
- Hot Module Replacement
- Bundle Analyzer
- i18n Configuration
- Custom Modernizr
- Vue.js Loader
- Preview Build

## Darvin Boilerplate - Start
![](https://img.shields.io/github/issues-closed-raw/tobiasfrei/darvin-boilerplate.svg?style=popout-square)
![](https://img.shields.io/github/issues-raw/tobiasfrei/darvin-boilerplate.svg?style=popout-square)

Recommended: Node 11.7.0

### 1. Manage node Version
MacOS/Linux
```https://github.com/creationix/nvm```

Windows
```https://github.com/coreybutler/nvm-windows```

### 2. Install node version

1. install node version ```nvm install 11.7.0```

2. load node version from .nvmrc ```nvm use```<br>
Note: won't work on windows? try ```nvm use 11.7.0```

3. install dependencies ```npm install```

## Start
Load installed node version each time you startup the project:<br>
```nvm use```

### Develop
Run webpack dev server and watch file change.<br>
```npm run dev```

### Build
Run this mode for minifyed outstream. Required for SEO purpose and CMS asset aggregations.<br>
```npm run prod```

### Preview
Edit preview files and watch for changes (run parallel in other terminal)<br>
```npm run prev-dev```

### Build Preview
Build Preview<br>
```npm run prev-prod```

## Sprites
SVG Spritemap will be generated referenced to filenames in:<br>
```src/assets/images/icons```<br>
<br>
Choose between HTML or CSS:<br>

### Inline HTML
SVG Sprites are prefixed with ```sprite-``` followed by filename.<br>
```src/assets/images/icons/arrow.svg```<br>

#### Usage
```
<svg class="icon">
    <use xlink:href="/path/to/spritemap.svg#sprite-arrow"></use>
</svg>
```
Note: Render the map in the body and access without filename ```xlink:href="#sprite-arrow"```

### Generic Sass
Attribution over CSS needs small file preparation and looses OS preview functionality.
Add several variables to svg prefixed with 'var:{css-attribute}' as shown in following example:
```<path fill="none" var:color.stroke="" var:width.stroke-width="" d="M0.3,17.7L17.7,0.3"/>```

#### Usage
```
.myElement {
    @include sprite('arrow', { stroke: 'red', stroke-width: 1px });
}
```
Note: The use of SVG Sprite in Sass can affect the loading capacity.

## Breakpoints
Predefined keywords:
```zero|micro|small|medium|large|wide|ultra```

Settings for edit keywords:
```src/assets/styles/settings/_breakpoints.scss```

#### Usage
```
// screen exactly or higher 768px
@media #{$medium-up} {
  width: 50%;
}

// screen under 768px
@media #{$medium-down} {
  font-size: 1em;
}

// screen between 768px and 1024px
@media #{$medium-only} {
  width: 100%;
}
```

## Architecture Guidelines

### Layout Elements
Layout elements are prefixed with 'l-'
```.l-sidebar```

### Modules
Module elements are prefixed with 'm-'
```.m-teaser```

- high order element block.
- combinations of different components.
- preferably nested Sass (Smaccs).

### Components
Component elements are prefixed with 'c-'
```.c-iconbox```

- won't have a position, position over module.
- reusable in different modules.
- preferably unnested Sass (BEM).

### Constrainer
Modules are mostly fullwidth and constrained by layout constrained element.
That behaviour save us responsivness on different layouts.
```.l-constrainer```

## Author
[https://github.com/tobiasfrei](https://github.com/tobiasfrei)

## Contributors
[https://github.com/christiansany](https://github.com/christiansany)  
[https://github.com/saschaeggi](https://github.com/saschaeggi)

## License
GNU General Public License (GPL)

Darvin logo and brand related assets are protected and may not be used for personal purposes.
