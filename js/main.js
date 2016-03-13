var jQDoc = $(document);

// begin:bootstrap onepage_scroll plugin

jQDoc.ready(function () {
  $('.main').onepage_scroll({
    easing: 'ease-in-out',
    pagination: false,
    loop: false
  });
});

// end:bootstrap onepage_scroll plugin

// begin:bootstrap onepage_scroll plugin

jQDoc.ready(function () {
  $('#u16-tech-event-carousel').owlCarousel({
    autoPlay: 2000,
    items: 6
  });

  $('#u16-non-tech-event-carousel').owlCarousel({
    autoPlay: 2000,
    items: 4
  });
});

// end:bootstrap onepage_scroll plugin

// begin:canvas

jQDoc.ready(function () {
  $('#u16-canvas').particleground({
    dotColor: '#5DB72D',
    lineColor: '#0F7DAE'
  });
});

// end:canvas