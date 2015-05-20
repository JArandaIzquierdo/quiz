var count = 1, correct = 0, error = 0;

var Questions = {
  get : function() {
    if (count === 1) {
      return Question01.get();
    }
    if (count === 2) {
      return Question02.get();
    }
    if (count === 3) {
      return Question03.get();
    }
    if (count === 4) {
      return Question04.get();
    }
    if (count === 5) {
      return Question05.get();
    }

    Quiz.$answer.fadeOut('slow');
    Quiz.$answer.remove();
    Quiz.$title.text('Obrigado!');

    var obj = {};
    var msg = '';
    msg += 'Perguntas: ' + (count-1);
    msg += '\n\r';
    msg += 'Acertos: ' + correct;
    msg += '\n\r';
    msg += 'Erros: ' + error;
    obj.msg = msg;
    return obj;
  }
};

var Quiz = {

  $title : $('#div-title'),
  $answer : $('#div-answer'),
  $btn : $('#btn-answer'),

  question : function() {
    $('#div-question').typed({
      strings: [ Questions.get().msg ],
      typeSpeed: 30,
      callback: function() {
        Quiz.callback();
      }
    });
  },
  callback : function() {
    Quiz.$title.text('Questão ' + count);
    Quiz.$answer.fadeIn('slow');

    Quiz.$answer.find('li').removeClass('wrong');
    Quiz.$answer.find('li').removeClass('right');

    Quiz.$answer.find('input:eq(0)').attr('data-valid', Questions.get().val1);
    Quiz.$answer.find('input:eq(1)').attr('data-valid', Questions.get().val2);
    Quiz.$answer.find('input:eq(2)').attr('data-valid', Questions.get().val3);

    Quiz.$answer.find('span:eq(0)').text(Questions.get().ans1);
    Quiz.$answer.find('span:eq(1)').text(Questions.get().ans2);
    Quiz.$answer.find('span:eq(2)').text(Questions.get().ans3);

    count++;
  },
  nextQuestion : function() {
    if (typeof $('#div-question').data('typed') !== 'undefined') {
      $('#div-question').data('typed').reset();
    }

    Quiz.question();
  },
  answer : function() {
    if (Number(Quiz.$answer.find('input[name=ans]:checked').attr('data-valid')) === 0) {
      Quiz.$answer.find('input[name=ans]:checked').parent().parent().addClass('wrong');
      Quiz.$answer.find('input[data-valid="1"]').parent().parent().addClass('right');

      error++;
    }

    if (Number(Quiz.$answer.find('input[name=ans]:checked').attr('data-valid')) === 1) {
      Quiz.$answer.find('input[name=ans]:checked').parent().parent().addClass('right');

      correct++;
    }
  }
};

$(function() {

  Quiz.question();
  Quiz.$btn.click(function(e) {

    Quiz.answer();

    setTimeout(function() {
      Quiz.nextQuestion();
    }, 500);

  });

});
