
export default class CommitList {

    constructor(el, items=[]) {

        this.$el = el;
        this.items = items;
        this.itemTemplate = (commit, idx) =>
        `<tr class="commit ${idx%2 === 0 ? 'even' : 'odd'}" id="${commit.sha}">
              <td class="author-name">${commit.author.login}</td>
              <td class="time">${this.formatDateTime(commit.commit.committer.date)}</td>
              <td class="msg" title="${commit.commit.message}">${this.formatMessage(commit.commit.message)}</td>
              <td class="additions">+${(commit.stats.additions)}</td>
              <td class="deletions">-${(commit.stats.additions)}</td>
              <td class="files">${this.formatFiles(commit.files)}</td>

         </tr>`

        this.pageSize = 25;

        this.render(0, this.pageSize);

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
        if (msg.length > 50) {
            return msg.substr(0, 47) + "...";
        } else {
            return msg;
        }
    }

    formatFiles(files) {
    
        return files.map(function (f) {
            if (f.patch) {
                return `<a href="#" class="patch-link" >${f.filename}</a>`;
            } else {
                return f.filename;
            }
        }).join(" ");
    }

}
