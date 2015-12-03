
export default class ScrollableList {

    constructor(el, items=[], template = obj => `<div>${JSON.stringify(obj)}</div>`) {
        this.$el = el;
        this.itemTemplate = template;
        this.render(items);
    }

    render(items=[]) {
        
        let html = items.map(this.itemTemplate).join("");
        this.$el.html(html);
    }
};
