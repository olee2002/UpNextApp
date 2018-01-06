$(document).ready(() => {

    let counter = 0
    let timeLeft = parseInt(($('#waitTime').html())*60)
    console.log($('#waitTime').html())
    console.log(timeLeft)
    function convertSeconds(s) {
        var min = (Math.floor(s / 60)).toString()
        var sec = s % 60
        if (min.length < 2) {
            // min = parseInt(`${0 + min}`)
            return '0' + min + ':' + sec
        }
    }
    const timer = $('#timer')
    timer.html(counter)
    var audio = new Audio('/audio/ding.mp3')

    function timeIt() {
        counter++
        timer.html(convertSeconds(timeLeft - counter))
        if (counter === timeLeft) {
            $('#timer').html('Your food is ready!')
            audio.play()
            audio.loop = true
        }
    }

    setInterval(timeIt, 1000)
    console.log(timeLeft)
    $('#pause').on('click', () => { audio.pause() })






})