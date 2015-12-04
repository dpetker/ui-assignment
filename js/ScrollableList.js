
export default class ScrollableList {

    constructor(el, items=[], template = obj => `<div>${JSON.stringify(obj)}</div>`) {
        this.$el = el;
        this.itemTemplate = template;
        this.items = items;
        this.render(0,items.length);
    }

    render(start=0,end=25) {
        
        let html = this.items.slice(start, end-start).map(this.itemTemplate).join("");
        this.$el.html(html);
    }
};
