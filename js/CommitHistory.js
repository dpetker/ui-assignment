

class CommitHistory { 

    constructor(all_commits) {
        this.all_commits = [...all_commits];
    }
    
    getCommits() {
        return [...this.all_commits]
    }

}


export default CommitHistory;
