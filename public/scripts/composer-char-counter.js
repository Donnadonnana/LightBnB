$(document).ready(() => {
  console.log(this);
  console.log('document ready!!!'); 

  $('#tweet-text').keyup(function() {
    const counterNum = this.value.length;
     const newCounterNum = 140 - counterNum;
    $('#counter-number').text(newCounterNum);
    if (newCounterNum < 0) {
      $('#counter-number').css('color', 'red');
    } else {
       $('#counter-number').css('color', 'black');
    }
  })
  
})

