//add modal container to body
$(function () {
    $(document.body).append($("<div id='modal-container'></div>"));
    $(window).on('resize', this.setBgSize);
});

function setBgSize() {
    $('#modal-container').width(window.innerWidth).height(window.innerHeight);
}

export default {
    
    show(id, title, content, buttons) {

        $("#modal-container").html(`
                    <div id="${id}" class="modal-dialog">
                        <div class="modal-dialog-header">
                             <h3 class="modal-dialog-title">${title}</h3>
                             <a href="#" class="modal-dialog-close-btn">X</a>
                         </div>
                         <div class="modal-dialog-content">${content}</div>
                         <div class="modal-dialog-footer"></div>
                     </div>
                 </div>`);

        for (let btnConfig of buttons) {
            $("#modal-container .modal-dialog-footer").append(this.getButton(btnConfig));
        }

        setBgSize();
        $("#modal-container").show();

        $(`#${id} .modal-dialog-close-btn`).click(this.close);
    
    },

     
    close(evt) {
        if (evt) evt.preventDefault();
        $("#modal-dialog-footer a.btn").off();
        $("#modal-container").html("");
        $("#modal-container").hide();
    },

    getButton(btn) {
        let $btn = $(`<button type="button" id="${btn.id}" 
                     class="btn ${btn.primary ? 'btn-primary': ''}"
                     >${btn.label}</button>`);

        $btn.on('click', btn.handler);
        return $btn;
    }

}
   



