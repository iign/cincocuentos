/* global $ */
function markVowels (word) {
  return word.replace(/(a|e|i|o|u)/ig, '<span class="vowel">$1</span>')
}

var words

;(function () {
  // init vocales
  // $('.book').html(
  //   $('.book').html().replace(/(a|e|i|o|u)|(?=<.*?>.*<\/.*?>)/ig, "<span class='vowel'>$1</span>")
  // )

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
    $('body').toggleClass('size')
  })

  // Cambiar contraste
  $('.js-btn-contrast').on('click', function () {
    $('body').toggleClass('contrast')
  })

  // Diferenciar vocales
  $('.js-btn-vowels').on('click', function () {
    $('body').toggleClass('vowels')
  })
})()
