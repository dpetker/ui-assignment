import CommitHistory from './CommitHistory';
import CommitList from './CommitList';
import 'bootstrap';

$(function() {
  console.log( 'ALL_DATA is loaded with ' + ALL_DATA.length + ' records available.' );
    
  let commitHistory = new CommitHistory(ALL_DATA);

  let commitsView = new CommitList($("#commit-list"), commitHistory.getCommits());

});
