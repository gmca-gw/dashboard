let datetime = null,
  date = null;

const update = function() {
  date = moment(new Date());
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm a'));
};

$(document).ready(function() {
  datetime = $('#time');
  update();
  setInterval(update, 1000);
});
