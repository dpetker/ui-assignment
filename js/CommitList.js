import EventBus from './EventBus';
import escapeHTML from './escapeHTML';

export default class CommitList {

    constructor(el, items=[]) {

        this.$el = el;
        this.items = items;
        this.itemTemplate = (commit, idx) =>
        `<tr class="commit ${idx%2 === 0 ? 'even' : 'odd'} " id="${commit.sha}">
              <td class="author-name">${commit.author.login}</td>
              <td class="time">${this.formatDateTime(commit.commit.committer.date)}</td>
              <td class="msg" >${this.formatMessage(commit.commit.message, commit._dirty)}</td>
              <td class="additions">+${(commit.stats.additions)}</td>
              <td class="deletions">-${(commit.stats.additions)}</td>
              <td class="files">${this.formatFiles(commit.files)}</td>
         </tr>`

        this.pageSize = 25;

        this.numPages = Math.ceil(this.items.length / this.pageSize);

        this.renderPage(0);

        //listen for delegated clicks
        $("#commit-list").click((e) => {

            let sha = $(e.target).parents(".commit").attr('id');

            if ($(e.target).hasClass('commit-message')){
                EventBus.dispatch("EDIT_COMMIT_MESSAGE", { sha });
            }
            if ($(e.target).hasClass('patch-link')){
                let file = e.target.innerText;
                EventBus.dispatch("SHOW_PATCH", { sha, file });
            }
        });

        EventBus.on("COMMIT_MESSAGE_CHANGE", evt => {
            let commit = evt.data;
            $(`#${commit.sha} .commit-message`).text(evt.data.commit.message)
            .addClass(commit._dirty ? 'dirty' : '');
        });
    }

    renderPage(pageNum) {

        let start = pageNum * this.pageSize;

        this.render(start, start + this.pageSize);

        $('.page-controls').html("");
        for (let i = 0; i < this.numPages; i++) {
            let btn = $(`<button class="page-btn" ${i === pageNum ? 'disabled=disabled': ''}
                                         >${i+1}</button>`);
            $(btn).on('click', () => { this.renderPage(i) });
            $('.page-controls').append(btn);
        };
    }

    render(start=0, end=25) {

        let html = this.items.slice(start, end + 1)
            .map(this.itemTemplate).join("");

        this.$el.html(html);

    }

    formatDateTime(dateStr) {
        return new Date(dateStr).toLocaleString();
    }

    formatMessage(msg, dirty) {
        let message = msg;
        if (msg.length > 50) {
            message = msg.substr(0, 47) + "...";
        }
        return `<a title="${msg}" role="button"
                   class="commit-message ${dirty ? 'dirty' : ''}"
                   href="#" >${escapeHTML(message)}</a>`

    }


    formatFiles(files) {
        return files.map(f => {
            if (f.patch) {
                return `<a href="#" class="patch-link" role="button">${f.filename}</a><br>`;
            } else {
                return f.filename + "<br>";
            }
        }).join(" ");
    }

}
