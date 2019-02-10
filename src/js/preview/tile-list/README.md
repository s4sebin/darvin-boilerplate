Implementation
===

```html
<div is="tile-list" :items="ITEMS_ENDPOINT">
    <!-- This title will be injected into the component-->
    <h3 slot="title">
       A
    </h3>
</div>
```

Or see `views-view--person-list.html.twig`


### Data

| endpoint | Response | Description
|---|---|---|
|items-endpoint|{ items: `ExpandableTile[]` }| List of items visible in the list |

