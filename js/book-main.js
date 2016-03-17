var jQDoc = $(document);

jQDoc.ready(function ($) {
  var gallery = $('.cd-gallery'),
    foldingPanel = $('.cd-folding-panel'),
    mainContent = $('.cd-main');

  /* open folding content */
  gallery.on('click', 'a', function (event) {
    event.preventDefault();
    openItemInfo($(this).attr('href'));
  });

  /* close folding content */
  foldingPanel.on('click', '.cd-close', function (event) {
    event.preventDefault();
    toggleContent('', false);
  });
  gallery.on('click', function (event) {
    /* detect click on .cd-gallery::before when the .cd-folding-panel is open */
    if ($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0) toggleContent('', false);
  });

  function openItemInfo(url) {
    var mq = viewportSize();
    if (gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
      /* if content is visible above the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top
      }, 100, function () {
        toggleContent(url, true);
      });
    } else if (gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height() && mq != 'mobile') {
      /* if content is visible below the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
      }, 100, function () {
        toggleContent(url, true);
      });
    } else {
      toggleContent(url, true);
    }
  }

  function toggleContent(url, bool) {
    if (bool) {
      /* load and show new content */
      var foldingContent = foldingPanel.find('.cd-fold-content');

      var event = getEvent(url.substr(1)),
        eventManagers = event.eventManagers.split('\n'),
        contactInfo = event.contactInfo.split('\n');
      event.managers = [];

      for (var i = 0; i < eventManagers.length; i++) {
        event.managers.push({
          name: eventManagers[i],
          contact: contactInfo[i]
        });
      }

      // Set event art
      event.eventArt = getEventArt(eventCategory, event.eventName);

      // Jot down the data and bootstrap components
      foldingContent.html(Handlebars.templates.eventpage(event));
      $('.collapsible').collapsible();

      // Hash-bang
      location.hash = url;

      $('body').addClass('overflow-hidden');
      foldingPanel.addClass('is-open');
      mainContent.addClass('fold-is-open');
    } else {
      /* close the folding panel */
      var mq = viewportSize();
      foldingPanel.removeClass('is-open');
      mainContent.removeClass('fold-is-open');
      history.back();

      (mq == 'mobile' || $('.no-csstransitions').length > 0 )
        /* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
        ? $('body').removeClass('overflow-hidden')

        : mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
        $('body').removeClass('overflow-hidden');
        mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      });
    }

  }

  function viewportSize() {
    /* retrieve the content value of .cd-main::before to check the actual mq */
    return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
  }

  function getEvent(eventName) {
    for (var i = 0; i < eventData.length; i++) {
      if (eventData[i].eventName == eventName) return eventData[i];
    }
    throw 'Could not find event ' + eventName;
  }

  function getEventArt(categoryName, eventName) {
    return 'img/event-arts' + categoryName + '/' + hyphenify(eventName) + '.svg';
  }

  function hyphenify(string) {
    return string.replace(/\s/g, '-').replace(/[<>]/g, '').toLowerCase();
  }

  function hashChange() {
    if (location.hash) {
      toggleContent(location.hash, true);
    } else {
      var mq = viewportSize();
      foldingPanel.removeClass('is-open');
      mainContent.removeClass('fold-is-open');

      (mq == 'mobile' || $('.no-csstransitions').length > 0 )
        /* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
        ? $('body').removeClass('overflow-hidden')

        : mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
        $('body').removeClass('overflow-hidden');
        mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      });
    }
  }

  $(window).on('hashchange', hashChange);

  if (location.hash) {
    toggleContent(location.hash, true);
  }
});

// Color tiles and background
jQDoc.ready(function () {
  var colors = [
      'red',
      'indigo',
      'pink',
      'deep-purple',
      'green',
      'blue',
      'deep-orange',
      'cyan',
      'teal'
    ],
    currentIndex = 0,
    bgc = toRGBA($('#u16-bgc').css('background-color'), 0.4),
    bgi = 'url("img/event-backgrounds/' +
      (eventCategory.match(/(cultural|non-tech|nights|special-events-for-girls)/) ? 'non-tech' : 'tech') +
      '.png")';

  $('.cd-gallery >  li').each(function () {
    currentIndex == colors.length ? currentIndex = 0 : false;
    $(this).addClass(colors[currentIndex++]);
  });

  $('body')[0].style.background = bgc + ' ' + bgi;

  function toRGBA(colorString, alpha) {
    return 'rgba' +
      colorString.match(/\(.*\)/).toString().replace(')', ', ') +
      alpha +
      ')';
  }

});