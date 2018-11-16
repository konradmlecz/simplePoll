class Draw {
    constructor() {
        this.numbersDraw = []
    }
    getNumberDraw(length) {
        const actualNumber = Math.floor(Math.random() * length)

        if (this.numbersDraw.includes(actualNumber)) {
            return this.getNumberDraw(length)
        }
        this.numbersDraw.push(actualNumber)
        return actualNumber
    }
    cleanNumbersDraw() {
        this.numbersDraw.splice(0, this.numbersDraw.length)
    }
}

class Statistic {
    constructor() {
        this.checkedAnswer;
        this.rightAnswer;
        this.numberRightAnswer = 0;
        this.numberQ = 0;
    }
    checkNumberQ() {
        return this.numberQ
    }
    setNumberQ() {
        this.numberQ++
    }
    checkRightAnswer() {
        this.checkedAnswer == this.rightAnswer ? this.numberRightAnswer++ : console.log("zła odpowiedź");
    }
    setRightAnswer(rightAnswer) {
        this.rightAnswer = (parseInt(rightAnswer) - 1);
    }
    setCheckedAnswer(checkedAnswer) {
        this.checkedAnswer = checkedAnswer;
    }
    getNumberRightAnswer() {
        return this.numberRightAnswer
    }
    cleanStat() {
        this.numberRightAnswer = 0;
        this.numberQ = 0;
    }
}


class Questions {
    constructor() {
        let questionsArray;
        this.loadData = () => {
            fetch('q.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    questionsArray = myJson
                });

        }
        this.loadData()
        this.getLengthQuestions = () => questionsArray.length
        this.getQuestion = (numberQuestion) => questionsArray[numberQuestion]
        this.get = () => questionsArray
    }

}



class Quiz {

    constructor() {
        this.questions = new Questions();
        this.statistic = new Statistic();
        this.draw = new Draw();

        this.greetingDiv = document.querySelector('[data-q=greetingDiv]');
        this.h1First = document.querySelector('[data-q=firstH1]');
        this.h1Second = document.querySelector('[data-q=secondH1]');
        this.greetingBtn = document.querySelector('[data-q=greetingBtn]');
        this.greetingBtn.addEventListener("click", this.start.bind(this))
        this.questionsDiv = document.querySelector('[data-q=questionsDiv]');
        this.submitBtn = document.querySelector('[data-q=submit]');
        this.submitBtn.addEventListener("click", this.main.bind(this))
        this.questionH1 = document.querySelector('[data-q=thirdH1]')
        this.answersSpan = [...document.querySelectorAll("label span")]
        this.answersInput = [...document.querySelectorAll("input[type=radio]")]


    }
    start() {
        this.greetingDiv.style.left = "250%";
        this.questionsDiv.style.left = "50%";
        this.main();
    }
    main() {

        for (let i = 0; i < this.answersInput.length; i++) {
            if (this.answersInput[i].checked) {
                this.statistic.setCheckedAnswer(i);
            }
        }
        console.log(this.statistic.checkNumberQ());
        if ((this.statistic.checkNumberQ())) {
            this.statistic.checkRightAnswer()
        }
        this.statistic.setNumberQ();
        if (this.statistic.checkNumberQ() == 6) {
            this.greetingDiv.style.left = "50%";
            this.questionsDiv.style.left = "-150%";
            this.h1First.textContent = `ZGADŁEŚ ${this.statistic.getNumberRightAnswer()} ODPOWIEDŹ(I) na 5`;
            this.h1Second.textContent = "SPRÓBUJ JESZCZE RAZ!!!"
            this.statistic.cleanStat()
            this.draw.cleanNumbersDraw()
        }
        let numberDraw = this.draw.getNumberDraw(this.questions.getLengthQuestions())
        let question = this.questions.getQuestion(numberDraw)
        this.questionH1.textContent = question.question
        this.answersSpan[0].textContent = question.answer1
        this.answersSpan[1].textContent = question.answer2
        this.answersSpan[2].textContent = question.answer3
        this.statistic.setRightAnswer(question.rightAnswer)

    }
}
const quiz = new Quiz()