let scenarios = [
    {
        image: '../Images/faketext1.png',
        text: 'A stranger asks your name. Who do you tell?',
        correct: ['parent', 'teacher']
    },
    {
        image: '../Images/bullyMessage.png',
        text: 'Someone is mean online. Who do you tell?',
        correct: ['parent', 'teacher']
    },
    {
        image: '../Images/strangerDanger.png',
        text: 'A stranger says, "Meet me." Who do you tell?',
        correct: ['parent', 'teacher']
    },
    {
        image: '../Images/privatePhoto.png',
        text: 'You shared a private photo. Who do you tell?',
        correct: ['parent', 'teacher']
    },
    {
        image: '../Images/askingScreentime.webp',
        text: 'More screen time? Who do you ask?',
        correct: 'parent'
    }
]

function check(choice) {
    const feedback = document.getElementById('feedback');

    // showScenario() increments currentScenario after rendering, so current question is -1.
    const activeScenario = scenarios[currentScenario - 1];
    if (!activeScenario) {
        return;
    }

    const correctChoices = Array.isArray(activeScenario.correct)
        ? activeScenario.correct
        : [activeScenario.correct];

    if (correctChoices.includes(choice)) {
        feedback.textContent = 'Correct! Great choice.';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Try again. Tell a trusted adult.';
        feedback.style.color = 'red';
    }

    setTimeout(() => {
        showScenario();
    }, 800);
}

let currentScenario = 0;
function showScenario() {
    if (currentScenario < scenarios.length) {
        const scenario = scenarios[currentScenario];
        document.getElementById('scenario').src = scenario.image;
        document.getElementById('scenario').alt = scenario.text;
        currentScenario++;
    } else {
        document.getElementById('scenario').src = '';
        document.getElementById('scenario').alt = 'No more scenarios';
        document.getElementById('options').style.display = 'none';
        document.getElementById('feedback').textContent = 'Thanks for playing!';
    }
}

showScenario();