/**
 * @example <component is="tile-list" :items="JSON"></component>
 */
export interface TileList {
    items: ExpandableTile[];
}

export interface ExpandableTile {
    /**
     * Unique id for this element
     */
    id: string;

    /**
     * Tiles title
     */
    name: string;


    /**
     * Tiles title
     */
    title: string;

        /**
     * Tiles title
     */
    target: string;


    /**
     * Image url for image
     */
    type: string;

    /**
     * Optional subtitle
     */
    chunkName?: string;

    /**
     * Optional 2nd subtitle
     */
    path?: string;

    /**
     * Optional expandable content.
     * can be HTML markup
     */
    variants?: string;

}
