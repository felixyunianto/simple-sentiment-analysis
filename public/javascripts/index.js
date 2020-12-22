const submitReview = (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const options = {
        method: 'POST',
        body: JSON.stringify({ review }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }

    const emojiSection = document.getElementById('emojiSection');
    const textSection = document.getElementById('textSection');
    const title = document.getElementById('title');
    const outline = document.querySelector(':focus');

    fetch('/api/nlp/s-analyzer', options)
        .then(res => res.json())
        .then(({ analysis }) => {
            if (analysis < 0) {
                emojiSection.innerHTML = '<img src="https://img.icons8.com/emoji/96/000000/angry-face.png">';
                textSection.innerHTML = "You can tell me why you didn't like it"
                responsiveVoice.speak(
                    "Anda dapat menyampaikan keluhan anda pada kami",
                    "Indonesian Female",
                    {
                        pitch: 1,
                        rate: 1,
                        volume: 1
                    }
                );
                title.style.color = 'red';
                outline.style.borderColor = 'red';
            }
            else if (analysis === 0) {
                emojiSection.innerHTML = '<img src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png">';
                textSection.innerHTML = 'Thank You!'
                responsiveVoice.speak(
                    "Terimakasih",
                    "Indonesian Female",
                    {
                        pitch: 1,
                        rate: 1,
                        volume: 1
                    }
                );
                title.style.color = '#00367c';
                outline.style.borderColor = '#00367c';
            }
            else {
                emojiSection.innerHTML = '<img src="https://img.icons8.com/color/96/000000/happy.png">';
                textSection.innerHTML = 'Thank You very much!'
                title.style.color = 'green';
                outline.style.borderColor = 'green'
                responsiveVoice.speak(
                    "Terimakasih telah menilai dengan baik",
                    "Indonesian Female",
                    {
                        pitch: 1,
                        rate: 1,
                        volume: 1
                    }
                );
            }
        })
        .catch(err => {
            emojiSection.innerHTML = 'There was an error processing your request!'
        })
}

// document.getElementById('review').addEventListener('keyup', submitReview);
document.getElementById('reviewForm').addEventListener('submit', submitReview);