import CommitHistory from './CommitHistory';
import CommitList from './CommitList';

$(function() {
  console.log( 'ALL_DATA is loaded with ' + ALL_DATA.length + ' records available.' );
    
  let commitHistory = new CommitHistory(ALL_DATA);

  let commitsView = new CommitList($("#commits"), commitHistory.getCommits());

});
