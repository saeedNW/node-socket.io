$('.progress-pie-chart').each(function(){

    let percent = parseInt($(this).data('percent'));
    let type = $(this).attr('type');
    let deg = 360 * percent / 100;

    if(percent > 50){
        type === 'cpu' ? $(this).addClass('gt-50') : $(this).addClass('gt-50-ram')
    }

    $(this).find('.ppc-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
    $(this).find('.percent-title').html(percent + '%');
    
})