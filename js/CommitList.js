import EventBus from './EventBus';

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
        this.tmpEl = document.createElement("div");    

        this.render(0, this.pageSize);

        //listen for delegated clicks 
        $("#commit-list").click((e) => {
            if ($(e.target).hasClass('commit-message')){
                let sha = $(e.target).parents(".commit").attr('id');
                EventBus.dispatch("EDIT_COMMIT_MESSAGE", {
                    sha
                });
            }
        });

        /*$(".patch-link").click((e) => {
            EventBus.dispatch("SHOW_PATCH", {
                id: e.currentTarget.id
            });
        });*/

        EventBus.on("COMMIT_MESSAGE_CHANGE", evt => {
            let commit = evt.data;
            $(`#${commit.sha} .commit-message`).text(evt.data.commit.message)
            .addClass(commit._dirty ? 'dirty' : '');
        });
    }

    render(start=0, end=25) {
        
        let html = this.items.slice(start, end-start)
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
                   href="#" >${message}</a>`;
    }

    formatPatch(patchStr) {
        this.tmpEl.innerHTML = patchStr;
        return this.tmpEl.innerText;
    }

    formatFiles(files) {
        return files.map(f => {
            if (f.patch) {
                return `<a href="#" class="patch-link" role="button">${f.filename}</a>`;
            } else {
                return f.filename;
            }
        }).join(" ");
    }


}
