var jQDoc = $(document);

// begin:bootstrap onepage_scroll plugin

jQDoc.ready(function () {
  $('.main').onepage_scroll({
    easing: 'ease-in-out',
    loop: false
  });
});

// end:bootstrap onepage_scroll plugin

// begin:bootstrap owl-carousel plugin

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

// end:bootstrap owl-carousel plugin