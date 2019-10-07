var gun = Gun() ;
var tasks = gun.get('tasks') ;

$('form').on('submit' , function(event){

    var t = $('form').find('#title') ;
    var d = $('form').find('#duration') ;
    var s = $('form').find('#start') ;
    var e = $('form').find('#end') ;

    tasks.set({

        title : t.val() ,
        duration : d.val() ,
        start : s.val() ,
        end : e.val() ,

    });

    t.val('') ;
    d.val('') ;
    s.val('') ;
    e.val('') ;

    event.preventDefault() ;

});

tasks.map().on(function(task , id){

    var tr = $('#' + id).get(0) || $('<tr>').attr('id', id).appendTo('#saved') ;

    if(task){

        var html = `<td class="saved">${task.title}</td><td class="saved">${task.duration}</td><td class="saved">${task.start}</td><td class="saved">${task.end}</td>` ;
        
        html += '<td class="options"><input type="checkbox" onclick="clickCheck(this)" ' + (task.done ? 'checked' : '') + '></td>' ;
        
        html += '<td class="options"><img onclick="clickDelete(this)" src="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-x.svg"/></td>' ;
        
        tr.html(html) ;
    
    }
    else{

        tr.remove() ;
    
    }

});

function clickCheck (element) {

    tasks.get($(element).parent().parent().attr('id')).put({done: $(element).prop('checked')}) ;

};

function clickDelete (element) {

    tasks.get($(element).parent().parent().attr('id')).put(null) ;

};
