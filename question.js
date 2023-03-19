
function start() {
    let apiURL = 'https://opentdb.com/api.php?amount=10&type=multiple';
    let questions = [];
    let questionIndex = 0;
    let score = 0;
    let scr = document.getElementById('player-score');
    scr.innerText = score;
    let ques = document.getElementById('question-number');
    ques.innerText = questionIndex + 1;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            showQuestion();

        });

    function showQuestion() {
        let questionElement = document.getElementById('question');
        let choicesElement = document.getElementById('choices');
        choicesElement.innerText = "";
        let question = questions[questionIndex];
        questionElement.innerHTML = question.question;

        let choices = question.incorrect_answers.concat(question.correct_answer);
        choices = shuffle(choices);

        choices.forEach(choice => {
            let button = document.createElement('button');
            button.innerHTML = choice;
            button.setAttribute('class', 'btn')
            button.onclick = () => checkAnswer(choice === question.correct_answer);
            choicesElement.appendChild(button);
        });

        function checkAnswer(correct) {
            if (correct) {
                score++;
                let questionElement = document.getElementById('question');
                questionElement.innerHTML = "Correct Answer";

                let scr = document.getElementById('player-score');
                scr.innerText = score;
            }
            else{
                let questionElement = document.getElementById('question');
                questionElement.innerHTML = "Incorrect Answer";
            }
            questionIndex++;
            let choicesElement = document.getElementById('choices');
            let button = document.createElement('button');
            button.innerHTML = 'Next';
            button.setAttribute('class', 'btn')
            button.onclick = () => next();
            choicesElement.innerHTML="";
            choicesElement.appendChild(button);}

function next(){
            let scr = document.getElementById('question-number');
            scr.innerText = questionIndex + 1;
            if (questionIndex === questions.length - 1) {
                showResults();
            } else {
                showQuestion();
            }
        }

        function showResults() {
            let questionElement = document.getElementById('question');
            let choicesElement = document.getElementById('choices');
            let submitButton = document.getElementById('submit');
            let percentage = (score / questions.length) * 100;
            questionElement.innerHTML = `You scored ${score} out of ${questions.length} (${percentage}%) </br></br>`;
            let button = document.createElement('button');
            button.innerHTML = 'Retake Quiz';
            button.setAttribute('class', 'btn')
            button.onclick = () => start();
            questionElement.appendChild(button);
            choicesElement.innerHTML = '';
            submitButton.style.display = 'none';
        }


        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    }
}