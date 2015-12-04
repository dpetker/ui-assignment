
export default class CommitList {

    constructor(el, items=[]) {

        this.$el = el;
        this.items = items;
        this.itemTemplate = (commit, idx) =>
        `<tr class="commit ${idx%2 === 0 ? 'even' : 'odd'}" id="${commit.sha}">
              <td class="author-name">${commit.author.login}</td>
              <td class="time">${this.formatDateTime(commit.commit.committer.date)}</td>
              <td class="msg" >${this.formatMessage(commit.commit.message)}</td>
              <td class="additions">+${(commit.stats.additions)}</td>
              <td class="deletions">-${(commit.stats.additions)}</td>
              <td class="files">${this.formatFiles(commit.files)}</td>
         </tr>`

        this.pageSize = 25;
        this.tmpEl = document.createElement("div");    

        this.render(0, this.pageSize);

        $(".commit-message").click((e) => {
            let msg = $(e.target).attr('title');
            $("#commit-msg-input").val(msg);
        });

        $(".patch-link").click((e) => {
            let patch = $(e.target).data('content');
            $("#patch-content").text(patch);
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

    formatMessage(msg) {
        let message = msg;
        if (msg.length > 50) {
            message = msg.substr(0, 47) + "...";
        }  
        return `<a title="${msg}"
                   class="commit-message"
                   href="#" role="button"
                   data-toggle="modal"
                   data-target="#commit-msg-modal">${message}</a>`;
    }

    formatPatch(patchStr) {
        this.tmpEl.innerHTML = patchStr;
        return this.tmpEl.innerText;
    }

    formatFiles(files) {
        return files.map(f => {
            if (f.patch) {
                return `<a href="#" class="patch-link" role="button"
                data-toggle="modal"
                title="Patch for ${f.filename}"
                data-placement="top" 
                data-trigger="focus"
                data-target="#patch-modal"
                data-content="${this.formatPatch(f.patch)}"
                >${f.filename}</a>`;
            } else {
                return f.filename;
            }
        }).join(" ");
    }


}
