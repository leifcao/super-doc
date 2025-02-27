import UI from '../index';
export default class LayoutList {
    private _visible: boolean = false;
    public x: number = 0;
    public y: number = 0;
    public element: HTMLElement = null;
    public UI:UI;

    set visible(v: boolean) {
        if(!!v) {
            console.log(this.element);
            const elHeight = this.UI['Editor'].BlockManager.currentHoverBlock?.element.clientHeight;
            this.element.style.left = '60px';
            this.element.style.top = '30px';
            this.element.classList.add(this.UI.CSS.commonShow);
        } else {
            this.element.classList.remove(this.UI.CSS.commonShow);
        }
        this._visible = v;
    }
    get visible() { return this._visible; }

    
    
    constructor(UI: UI) {
        this.UI = UI;
        this.element = UI.makePopover().appendChild(UI.makePopoverLayoutItem().element).element;
    }
}
