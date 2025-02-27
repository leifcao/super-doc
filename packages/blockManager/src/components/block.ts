import { BlockId, BlockToolData } from "@super-doc/types";
import { EditorModules, MountedCallback } from "@super-doc/types";
import * as _ from "@super-doc/share";
import BlockManager from "..";
/**
 * Interface describes Block class constructor argument
 */
interface BlockConstructorOptions {
  id?: BlockId;
  index?: number;
  type: string;
  data: BlockToolData;
  Editor: EditorModules;
  class?: any;
  BlockManager?: BlockManager
  // readOnly?: boolean;
  // tunesData: { [name: string]: BlockTuneData };
}

export class Block {
  private _checkAll: boolean = false;
  private CHECKOUT_ALL_NUMBER: number = 3;
  private CHECKOUT_BLOCK_NUMBER: number = 2;
  public CURRENT_CHECKOUT_COUNT: number = 0;

  public readonly holder: HTMLDivElement;

  public element: HTMLElement;
  public id: BlockId;
  public type: string;
  public data: BlockToolData;
  public index: number;
  public class: any;
  public isBindEvent: boolean = false;
  public mountedCallback: MountedCallback = null;
  private _Editor: EditorModules;
  public _isEditable: boolean = false;
  private BlockManager;
  get isEditable(): boolean {
    return this._isEditable;
  }
  set isEditable(value: boolean) {
    this.element.contentEditable = !!value + "";
    this._isEditable = value;
  }

  get Editor(): EditorModules {
    return this._Editor;
  }
  set Editor(editor: EditorModules) {
    this._Editor = editor;
  }

  get currentElement(): HTMLElement {
    return this.element.querySelector("[block-id]");
  }
  get xPosition(): number {
    return (this.element.querySelector(`.${this.Editor.UI.CSS.content}`) as HTMLElement).offsetLeft;
  }
  get yPosition(): number {
    return (this.element.querySelector(`.${this.Editor.UI.CSS.content}`) as HTMLElement).offsetTop;
  }

  set checkAll(status: boolean) {
    if(!status) {
      if(this.CURRENT_CHECKOUT_COUNT === this.CHECKOUT_ALL_NUMBER) {
        this.BlockManager.checkAllStatus(status);
      } else {
        this.currentElement.classList.remove(this.Editor.UI.CSS.selectedStatus);
      }
      this.CURRENT_CHECKOUT_COUNT = 0;
    } else {
      this.CURRENT_CHECKOUT_COUNT += 1;
      if(this.CURRENT_CHECKOUT_COUNT === this.CHECKOUT_BLOCK_NUMBER) {
        this.currentElement.classList.add(this.Editor.UI.CSS.selectedStatus);
      } else if (this.CURRENT_CHECKOUT_COUNT === this.CHECKOUT_ALL_NUMBER) {
        this.BlockManager.checkAllStatus(status);
      }
    }
    this._checkAll = status;
  }

  constructor({
    index,
    id = _.generateBlockId(),
    type,
    data,
    Editor,
    class: _class,
    BlockManager: BlockManager
  }: BlockConstructorOptions) {
    this.index = index;
    this.id = id;
    this.type = type;
    this.data = data;
    this.Editor = Editor;
    this.class = _class;
    this.BlockManager = BlockManager;
    this.block2html();
    this.bindEvent();

  }

  block2html() {
    const [element, callback] = this.Editor.Renderer.block2html(this);
    this.element = element;
    this.mountedCallback = callback;
  }

  /**
   * 事件绑定
  */
  private bindEvent() {
    this.Editor.Event.mouseEvent([this]);
    this.Editor.Event.bindKeydownEvent([this], this.Editor.Event);
    this.Editor.Event.globalClickListenerList.push(() => {
      if(this.CURRENT_CHECKOUT_COUNT === this.CHECKOUT_ALL_NUMBER) {
        this.BlockManager.checkAllStatus(false);
      } else {
        this.checkAll = false;
      }
    });
  }
}
