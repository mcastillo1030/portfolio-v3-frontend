export class ElementPointers {
  actionTags: string;
  otherTags: string;
  pointer: HTMLElement;

  constructor() {
    this.actionTags = 'a, button';
    this.otherTags = '.outline-image';
    this.pointer = document.querySelector('#pointer') as HTMLElement;
  }

  setActionCursorType = () => this.pointer.setAttribute('data-type', 'action');
  setOtherCursorType = () => this.pointer.setAttribute('data-type', 'other');
  resetCursorType = () => this.pointer.setAttribute('data-type', 'cursor');

  initActionListeners() {
    const elements = document.querySelectorAll(this.actionTags);

    if (elements === undefined) {
      return;
    }

    [...elements].forEach((el) => {
      el.addEventListener('pointerenter', this.setActionCursorType);
      // el.addEventListener('pointerenter', () => console.log('pointerenter'));
      el.addEventListener('pointerleave', this.resetCursorType);
    });

  }

  initOtherListners() {
    const elements = document.querySelectorAll(this.otherTags);

    if (elements === undefined) {
      return;
    }

    [...elements].forEach((el) => {
      if (el.parentElement?.tagName === 'A' || el.parentElement?.tagName === 'BUTTON') {
        return;
      }

      el.addEventListener('pointerenter', this.setOtherCursorType);
      el.addEventListener('pointerleave', this.resetCursorType);
    });
  }

  resetAllListeners() {
    const allTags = this.actionTags.split(',').concat(this.otherTags.split(','));
    const elements = document.querySelectorAll(allTags.join(','));

    if (elements === undefined) {
      return;
    }

    [...elements].forEach((el) => {
      el.removeEventListener('pointerenter', this.setActionCursorType);
      el.removeEventListener('pointerenter', this.setOtherCursorType);
      el.removeEventListener('pointerleave', this.resetCursorType);
    });
  }

  initListeners() {
    if (!this.pointer) {
      return;
    }

    console.log('---- initListeners ----');
    console.log(this.pointer, this.actionTags, this.otherTags);

    this.initActionListeners();
    this.initOtherListners();
  }

  destroyListeners() {
    if (!this.pointer) {
      return;
    }

    this.resetAllListeners();
    this.resetCursorType();
  }
}