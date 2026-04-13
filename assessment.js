document.addEventListener('DOMContentLoaded', () => {
    // Make sure we are on the assessment page
    if (!document.getElementById('quiz-container')) return;

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const counterText = document.getElementById('question-counter');

    // Start Quiz
    startBtn.addEventListener('click', () => {
        // Shuffle the master question bank (from questions.js) and grab first 10
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
        currentQuestions = shuffled.slice(0, 10);
        
        currentQuestionIndex = 0;
        score = 0;
        
        startScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        loadQuestion();
    });

    function loadQuestion() {
        const q = currentQuestions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = '';

        // Update progress bar
        const progress = ((currentQuestionIndex) / 10) * 100;
        progressBar.style.width = `${progress}%`;
        counterText.textContent = `Question ${currentQuestionIndex + 1} of 10`;

        q.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = option;
            btn.addEventListener('click', () => checkAnswer(option, q.answer));
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            score++;
        }

        currentQuestionIndex++;
        
        if (currentQuestionIndex < 10) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        
        const titleEl = document.getElementById('level-title');
        const nameEl = document.getElementById('level-name');
        const descEl = document.getElementById('level-description');
        const recEl = document.getElementById('recommendation-text');

        let level = '';
        let name = '';
        let desc = '';
        let rec = '';

        if (score <= 3) {
            level = 'A1'; name = 'Beginner';
            desc = 'You have a basic understanding of English. It\'s the perfect time to build strong foundations!';
            rec = 'We highly recommend starting with our Foundation Spoken English courses to build your confidence block by block.';
        } else if (score <= 6) {
            level = 'B1'; name = 'Intermediate';
            desc = 'You can communicate effectively in most everyday situations, but may struggle with nuanced grammar.';
            rec = 'Our Spoken English Mastery or generic IELTS Preparation course will help you polish your skills and achieve fluency.';
        } else if (score <= 8) {
            level = 'B2'; name = 'Upper Intermediate';
            desc = 'You have strong English skills and can handle complex discussions natively.';
            rec = 'You are ready! We recommend our Intensive IELTS or PTE Coaching programs to maximize your band score.';
        } else {
            level = 'C1'; name = 'Advanced';
            desc = 'Excellent! You possess a highly advanced, near-native grasp of English grammar and vocabulary.';
            rec = 'You are an excellent candidate for the OET or IELTS Academic variants. Book a demo to fine-tune your exam strategy.';
        }

        titleEl.textContent = level;
        nameEl.textContent = name;
        descEl.textContent = desc;
        recEl.textContent = rec;
    }

    // Connect Demo button on Results screen to Modal
    const resultsDemoBtn = document.getElementById('book-demo-btn');
    if (resultsDemoBtn) {
        const modal = document.getElementById('demo-modal');
        resultsDemoBtn.addEventListener('click', () => {
            if (modal) modal.classList.add('active');
        });
    }
});
