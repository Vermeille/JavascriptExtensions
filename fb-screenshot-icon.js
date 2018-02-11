// code for Custom Javascript for Websites 2
// External library needed: https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js
// and jQuery 3

function delay(t, v) {
   return new Promise(function(resolve) {
       setTimeout(resolve.bind(null, v), t);
   });
}

function loadAllComments(e) {
  if ($('.UFIPagerLink', e).length === 0) {
    return Promise.resolve(e);
  } else {
    $('.UFIPagerLink', e)[0].click();
    return delay(1000).then(() => loadAllComments(e));
  }
}

function loadAllReplies(e) {
  var to_open = $('.UFICommentLink').not(':has(.UFICollapseIcon)');
  if (to_open.length === 0) {
    return Promise.resolve(e);
  } else {
    to_open[0].click();
    console.log(to_open);
    return delay(1000).then(() => loadAllReplies(e));
  }
}

function seeAllComments(e) {
  if ($('.fss', e).length === 0) {
    return Promise.resolve(e);
  } else {
    $('.fss', e)[0].click();
    return delay(10).then(() => seeAllComments(e));
  }
}
customjsReady('.userContentWrapper', function (e) {
  var clicker = $('<img src="https://image.flaticon.com/icons/svg/25/25315.svg" width="16" height="16"/>').click(function (b) {
    loadAllComments(e)
      .then(e => loadAllReplies(e))
      .then(e => seeAllComments(e))
      .then(e => {
        $(e).css('background-color', 'white');
        html2canvas(e, {
          allowTaint: false,
          useCORS: true,
          backgroundcolor: '#00ffff',
          onrendered: function(canvas) {
              $(e).prepend(canvas);
          }
        });
      });
  });
  $('.uiPopover', e).prepend(clicker);
});
