var jQDoc = $(document);

// begin:bootstrap onepage_scroll plugin

jQDoc.ready(function () {
  $('.main').onepage_scroll({
    animationTime: 600,
    easing: 'ease-in-out',
    updateURL: true,
    loop: false
  });
});

// end:bootstrap onepage_scroll plugin

// begin:bootstrap owl-carousel plugin

jQDoc.ready(function () {
  $('#u16-tech-event-carousel').owlCarousel({
    autoPlay: 4000,
    items: 6
  });

  $('#u16-non-tech-event-carousel').owlCarousel({
    autoPlay: 4000,
    items: 4
  });
});

// end:bootstrap owl-carousel plugin