/* global $ */

var storage = window.localStorage


init()


function markVowels (word) {
  return word.replace(/(a|e|i|o|u)/ig, '<span class="vowel">$1</span>')
}

var words

function parseVowels () {
  words = $('.book').html().split(' ')
  var text = ''

  for (var i = 0; i < words.length; i++) {
    if (words[i].indexOf('mark') === -1 && words[i].indexOf('data-trigger') === -1) {
      // console.log(words[i], '--update')
      text += markVowels(words[i])
    } else {
      // console.log(words[i], '--skip')
      text += words[i]
    }
    text += ' '
  }

  $('.book').html(text)

  // Parse links
  $('mark').each(function () {
    console.log($(this).html())
    // console.log(markVowels($(this).html()))

    $(this).addClass('test')

    var newWord = markVowels($(this).html())

    $(this).html(newWord).addClass('test')
  })
}


function toggleSize(updateOption){
  $('body').toggleClass('size')
  $('.js-btn-size').toggleClass('active')
  if(updateOption){
      storage.setItem(slug + '_size', storage.getItem(slug + '_size') == 'on' ? 'off' : 'on')
  }
}

function toggleContrast(updateOption){
  $('body').toggleClass('contrast')
  $('.js-btn-contrast').toggleClass('active')
  if(updateOption){
      storage.setItem(slug + '_contrast', storage.getItem(slug + '_contrast') == 'on' ? 'off' : 'on')
  }
}

function toggleVowels(updateOption){
  $('body').toggleClass('vowels')
  $('.js-btn-vowels').toggleClass('active')
  if(updateOption){
      storage.setItem(slug + '_vowels', storage.getItem(slug + '_vowels') == 'on' ? 'off' : 'on')
  }
}

function init(){
  if(storage.getItem(slug + '_size') == 'on'){
    toggleSize(false)
  }
  if(storage.getItem(slug + '_contrast') == 'on'){
    toggleContrast(false)
  }
  if(storage.getItem(slug + '_vowels') == 'on'){
    toggleVowels(false)
  }
}

;(function () {
  if ($('body').hasClass('page-read')) {
    parseVowels()
  }

  $('mark').on('click', function () {
    var trigger = $(this).data('trigger')
    console.log('trigger', trigger)
    $('.help-box').removeClass('help-box--show')
    $(trigger).addClass('help-box--show')
  })

  $('.js-close-help').on('click', function () {
    $('.help-box').removeClass('help-box--show')
  })

  // Cambiar tamaño de letra
  $('.js-btn-size').on('click', function () {
    toggleSize(true)
  })

  // Cambiar contraste
  $('.js-btn-contrast').on('click', function () {
    toggleContrast(true)
  })

  // Diferenciar vocales
  $('.js-btn-vowels').on('click', function () {
    toggleVowels(true)
  })

})()
