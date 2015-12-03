import ScrollableList from './ScrollableList';

export default class CommitList extends ScrollableList {

    constructor(el, items=[]) {
        super(el, items, commit =>
              `<div>
              <div class="author-name">${commit.author.login}</div>

</div>`);
    }

}
