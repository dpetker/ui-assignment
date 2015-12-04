import ScrollableList from './ScrollableList';

export default class CommitList {

    constructor(el, items=[]) {

        this.el = el;
        this.items = items;
        this.template = (commit, idx) =>
        `<tr class="commit ${idx%2 === 0 ? 'even' : 'odd'}" id="${commit.sha}">
              <td class="author-name">${commit.author.login}</td>
              <td class="time">${this.formatDateTime(commit.commit.committer.date)}</td>
              <td class="msg" title="${commit.commit.message}">${this.formatMessage(commit.commit.message)}</td>
              <td class="additions">+${(commit.stats.additions)}</td>
              <td class="deletions">-${(commit.stats.additions)}</td>
              <td class="files">${this.formatFiles(commit.files)}</td>

         </tr>`
        this.pageSize = 25;

        this.list = new ScrollableList(el, this.items.slice(0, this.pageSize), this.template);
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
