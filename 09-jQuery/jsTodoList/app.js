$(function () {

    //check localStorage

    if (localStorage.getItem('To do list') != null) {
        $('.list').html(localStorage.getItem('To do list'))
        countTasks()
        countRemains()
    } else {
        //count Tasks & Remains
        countTasks()
        countRemains()
    }

    //add Task
    $('footer').on('click', '#add', function () {
        if ($('#input-task').val().length > 0) {

            $task = '<article> \
       <input type="checkbox"> \
       <p>'+ $('#input-task').val() + '<\p> \
       <button>&times;</button>  \
       </article>'
            $('section.list').append($task)
            $('#input-task').val('')
            countTasks()
            countRemains()
        }
        else {
            alert('please! Enter a Task')
        }
    })

})
$('body').on('click', 'input[type=checkbox]', function () {
    // if checked
    if ($(this).prop('checked')) {
        $(this).attr('checked', true)
        $(this).parent().addClass('checked')
    } else {
        $(this).attr('checked', false)
        $(this).parent().removeClass('checked')
    }
    countRemains()
})
//Remove Tasks
$('body').on('click', 'article button', function () {
    $(this).closest('article').remove()
    countTasks()
    countRemains()
})


function countTasks() {
    $('.num-tasks').text($('article').length)
    $('.title-tasks').text(('article').length > 1 ? 'Tasks' : 'Task')
}
//Count remains
function countRemains() {
    $remain = Math.abs($('.checked').length - $('article').length)
    $('.num-remains').text($remain)
    $('.title-remains').text($remain > 1 ? 'Remains' : 'Remain')
    //set localStorage
    localStorage.setItem('To do list', $('.list').html())
}

function reset() {
    $('.list').html('')
    localStorage.removeItem('To do list')
    countTasks()
    countRemains()
}

$('main').on('click', '#reset', function () {
    reset()
})
