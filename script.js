document.addEventListener('DOMContentLoaded', () => {
  const volumeOn = document.querySelector('.volume-on')
  const volumeOff = document.querySelector('.volume-mute')
  const audio = document.querySelector('audio')

  if (volumeOn && volumeOff && audio) {
    function toggleMute() {
      audio.muted = !audio.muted;
      volumeOn.classList.toggle('on', !audio.muted);
      volumeOff.classList.toggle('mute', audio.muted);
    }

    volumeOn.addEventListener('click', toggleMute);
    volumeOff.addEventListener('click', toggleMute);

  }

  if (document.querySelector('.questions1')) {
    const questions = document.querySelector('.questions1');
    const options = document.querySelectorAll('.option');
    const next = document.querySelector('.next');
    const score = document.querySelector('.questions');
    const timerEl = document.querySelector('.timer');
    const showScore = document.querySelector('.show-score');

    const quizData = [
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Character"],
        correct: 3,
      },
      {
        question: "Who developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Sun Microsystems"],
        correct: 2,
      },
      {
        question: "Which symbol is used for multi-line comments in JavaScript?",
        options: ["//", "/* */", "#", "<!-- -->"],
        correct: 1,
      },
      {
        question: "How do you declare a constant variable in JavaScript?",
        options: ["var", "let", "const", "static"],
        correct: 2,
      },
      {
        question: "Which of the following is NOT a valid JavaScript keyword?",
        options: ["function", "return", "define", "class"],
        correct: 2,
      },
      {
        question: "Which operator is used for strict equality?",
        options: ["==", "===", "!=", "!=="],
        correct: 1,
      },
      {
        question: "Which method converts a JSON string into an object?",
        options: [
          "JSON.stringify()",
          "JSON.parse()",
          "JSON.toObject()",
          "JSON.convert()",
        ],
        correct: 1,
      },
      {
        question: "Which of the following is a loop in JavaScript?",
        options: ["repeat", "for", "foreachloop", "doRepeat"],
        correct: 1,
      },
      {
        question: "How do you check the type of a variable?",
        options: ["typeof", "instanceof", "varType", "checkType"],
        correct: 0,
      },
      {
        question: "Which method selects an element by class?",
        options: [
          "document.getElementsByClassName()",
          "document.querySelector('.class')",
          "document.getElementById()",
          "document.selectClass()",
        ],
        correct: 1,
      },
      {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "const", "dim"],
        correct: 1,
      },
      {
        question:
          "Which of the following is used to write a function in JavaScript?",
        options: [
          "function myFunc() {}",
          "func myFunc() {}",
          "def myFunc() {}",
          "function:myFunc()",
        ],
        correct: 0,
      },
      {
        question: "Which of these is used to create a JavaScript array?",
        options: [
          "let arr = []",
          "let arr = {}",
          "let arr = ()",
          "let arr = array()",
        ],
        correct: 0,
      },
      {
        question: "What does DOM stand for?",
        options: [
          "Data Object Model",
          "Document Object Model",
          "Document Orientation Model",
          "Data Orientation Model",
        ],
        correct: 1,
      },
      {
        question: "How do you write a single-line comment in JavaScript?",
        options: [
          "// comment",
          "/* comment */",
          "<!-- comment -->",
          "# comment",
        ],
        correct: 0,
      },
    ];

    let currentIndex = 0;
    let correctAnswer = 0;
    let countDown;
    let time;

    function startTimer() {
      clearInterval(countDown);
      time = 51;
      countDown = setInterval(() => {
        time--;
        timerEl.textContent = `00:${time < 10 ? '0' + time : time}`;
        if (time === 30) {
          document.body.style.backgroundColor = '#E4E5C7'
          timerEl.classList.add('yellow');
        }
        if (time === 10) {
          document.body.style.backgroundColor = '#DBADAD';
          timerEl.classList.remove('yellow');
          timerEl.classList.add('red');
          next.classList.add('color');
        }
        if (time <= 0) {
          clearInterval(countDown)
          alert('Times Up !');
          location.reload();
        }
      }, 1000)
    }

    function loadQuestion(index) {
      clearInterval(countDown);
      startTimer();
      const q = quizData[index];
      questions.textContent = q.question;
      options.forEach((el, i) => {
        el.textContent = q.options[i];
        el.classList.remove('correct', 'wrong');
        el.style.pointerEvents = 'auto';
        el.onclick = () => {
          options.forEach((btn) => (btn.style.pointerEvents = 'none'))
          if (i === q.correct) {
            el.classList.add('correct');
            correctAnswer++;
          } else {
            el.classList.add('wrong');
            options[q.correct].classList.add('correct');
          }
          if (showScore)
            showScore.textContent = `Score: ${correctAnswer}/${quizData.length}`;
        }
      });
      score.textContent = `${index + 1}/${quizData.length}`;

      if (showScore)
        showScore.textContent = `Score: ${correctAnswer}/${quizData.length}`
    }
    loadQuestion(currentIndex);

    next.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.backgroundColor = '#CCE2C2';
      timerEl.classList.remove('yellow');
      timerEl.classList.remove('red');
      next.classList.remove('color');

      currentIndex++;
      if (currentIndex >= quizData.length) {
        localStorage.setItem('corrects', correctAnswer);
        localStorage.setItem('total', quizData.length);
        setTimeout(() => {
          window.location.href = 'result.html'
        }, 1000)
      } else {
        loadQuestion(currentIndex);
      }
    })

  }

  if (document.querySelector('.scores')) {
    const scores = document.querySelector('.scores')
    const greenBox = document.querySelector('.green-box')
    const greenRate = document.querySelector('.green-rate')
    const redBox = document.querySelector('.red-box')
    const redRate = document.querySelector('.red-rate')
    const rtyBtn = document.querySelector('.retry-btn')

    const corrects = parseInt(localStorage.getItem('corrects')) || 0;
    const total = parseInt(localStorage.getItem('total')) || 1;
    const greenPercent = (corrects / total) * 100;
    const redpercent = 100 - greenPercent;
    // debugger
    scores.textContent = `You scored ${corrects}/${total}`;
    greenBox.style.width = `${greenPercent}%`;
    greenRate.textContent = `${greenPercent.toFixed(0)}%`;
    // redBox.style.width = `${redpercent}%`
    redRate.textContent = `${redpercent.toFixed(0)}%`;
    if (rtyBtn) {
      rtyBtn.addEventListener('click', () => {
        window.location.href = 'quiz.html';

      });
    }
  }
  const showScore = document.querySelector('.show-score');
  if (showScore) {
    const corrects = parseInt(localStorage.getItem('corrects')) || 0;
    const total = parseInt(localStorage.getItem('total')) || 1;
    showScore.textContent = `Highest Score: ${corrects}/${total}`
  }
});

