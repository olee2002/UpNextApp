
$(document).ready(() => {
    console.log('Script Connected')
    $(function () {
        $('.tlt').textillate();
    })

    let counter = 0
    // let timeLeft = 5

    function convertSeconds(s) {
        var min = (Math.floor(s / 60)).toString()
        var sec = s % 60
        return min + ':' + sec

    }
    const timer = $('#timer')
    timer.html(counter)
    var audio = new Audio('/audio/ding.mp3')

    function timeIt() {
        let timeLeft = parseInt(($('#waitTime').html()) * 60)
        console.log(timeLeft)
        counter++
        timer.html(convertSeconds(timeLeft - counter))
        if (counter === timeLeft) {
            $('#timer').html('Your food is ready!')
            audio.play()
            audio.loop = true
            clearInterval(foodTimer)
            $('#pause').css('display', 'flex')
        }
    }
    const foodTimer = setInterval(timeIt, 1000)

    $('#pause').on('click', () => { audio.pause() })
})