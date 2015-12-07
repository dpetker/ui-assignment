
import EventBus from './EventBus';

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

class CommitHistory {

    constructor(all_commits) {
        this.all_commits = [...all_commits];
    }

    getCommits() {
        return [...this.all_commits]
    }

    getCommit(sha) {
        let commit = this.all_commits.find(c => c.sha === sha);
        if (commit) {
            //clone the object to prevent direct modification
            return clone(commit);
        }
    }

    setMessage(sha, msg) {
        let commit = this.all_commits.find(c => c.sha === sha);
        if (commit) {
            commit.commit.message = msg;
            //mark commit as dirty
            commit._dirty = true;
            EventBus.dispatch("COMMIT_MESSAGE_CHANGE", clone(commit));
        }
    }

    getPatch(commit, filename) {
        let file = commit.files.find(f => f.filename === filename);
        if (file) {
            return file.patch;
        } else {
            return "";
        }
    }

}


export default CommitHistory;
