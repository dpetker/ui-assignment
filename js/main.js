
import CommitHistory from './CommitHistory';
import CommitList from './CommitList';
import EventBus from './EventBus';
import ModalDialog from './ModalDialog';

window.ModalDialog = ModalDialog;

//import 'bootstrap';

$(function() {
  console.log( 'ALL_DATA is loaded with ' + ALL_DATA.length + ' records available.' );
    
  let commitHistory = new CommitHistory(ALL_DATA);

  let commitsView = new CommitList($("#commit-list"), commitHistory.getCommits());
  
  EventBus.on("EDIT_COMMIT_MESSAGE", evt => {
      let sha = evt.data.sha;
      let commit = commitHistory.getCommit(sha);

      ModalDialog.show("commit-msg-modal",
                       "Commit Message",
                       `<div id="msg-editable" contentEditable="true">${commit.commit.message}</div>`,
                       [{
                           id: "commit-msg-cancel-btn",
                           label: "Cancel",
                           handler:() => {
                               ModalDialog.close();
                           }
                       },{
                           id: "commit-msg-save-btn",
                           primary: true,
                           label: "Save",
                           handler:() => {
                               //save the commit to history
                               let newMsg = $("#msg-editable").text();
                               commitHistory.setMessage(sha, newMsg);
                               ModalDialog.close();
                           }
                       }]);
  });

});
