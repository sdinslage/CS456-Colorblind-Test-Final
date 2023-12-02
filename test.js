// Global errors object to track mistakes
let errors = {
    redGreen: 0,
    blueYellow: 0,
    fakeGuess: 0,
    total: 0
};

function submitTest() {
    let diagnosis = '';
    if (errors.redGreen > errors.blueYellow && errors.redGreen > 3 && errors.fakeGuess == 0) {
        diagnosis = 'red-green';
    } else if (errors.blueYellow > errors.redGreen && errors.blueYellow > 3 && errors.fakeGuess == 0) {
        diagnosis = 'blue-yellow';
    } else if (errors.total > 6 && errors.fakeGuess == 0) {
        diagnosis = 'monochromia';
    } else if (errors.fakeGuess > 0) {
        diagnosis = 'random-guessing';
    } else {
        diagnosis = 'none';
    }

    // Redirect to results page with query parameters
    window.location.href = `results.html?diagnosis=${diagnosis}`;
}

document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 1;

    const questions = document.querySelectorAll('.question'); // Get all question elements
    const totalQuestions = questions.length;
    const answersForm = document.getElementById('shared-answers'); // Get the shared answer grid

    const correctAnswers = {
        "question1": "7",
        "question2": "1",
        "question3": "Other",
        "question4": "9",
        "question5": "5",
        "question6": "3",
        "question7": "8",
        "question8": "Other",
        "question9": "7",
        "question10": "4",
    };

    // Hide all questions initially
    questions.forEach(question => {
        question.style.display = 'none';
    });

    // Show the first question
    document.getElementById('question1').style.display = 'block'; // This line ensures Q1 is visible initially

    function goToNextQuestion() {
        // Hide the current question
        document.getElementById('question' + currentQuestion).style.display = 'none';
        
        // Clear the radio button selection
        const radioButtons = answersForm.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.checked = false);
    
        currentQuestion++;
    
        if (currentQuestion <= totalQuestions) {
            // Show the next question
            document.getElementById('question' + currentQuestion).style.display = 'block';
        } else {
            // If all questions have been answered, evaluate the test
            submitTest();
        }
    }    

    answersForm.addEventListener('change', function(e) {
        if (e.target && e.target.type === 'radio') {
            const selectedAnswer = e.target.value;
            const questionId = 'question' + currentQuestion;

            if (selectedAnswer !== correctAnswers[questionId]) {
                // Increment appropriate error counters based on the question
                switch (questionId) {
                    case "question1":
                        errors.redGreen++;
                    break;
                    case "question2":
                        errors.blueYellow++;
                    break;
                    case "question3":
                        errors.blueYellow++;
                    break;
                    case "question4":
                        errors.redGreen++;
                    break;
                    case "question5":
                        errors.fakeGuess++
                    break;
                    case "question6":
                        errors.blueYellow++;
                    break;
                    case "question7":
                        errors.redGreen++;
                    break;
                    case "question8":
                        errors.redGreen++;
                    break;
                    case "question9":
                        errors.blueYellow++;
                    break;
                    case "question10":
                        errors.fakeGuess++;
                    break;
                    
                }
                errors.total++;
            }

            // After selecting an answer, go to the next question
            goToNextQuestion();
        }
    });
});
