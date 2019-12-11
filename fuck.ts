import { writeFileSync } from "fs";

type ABCD = 'A' | 'B' | 'C' | 'D';

interface Choice {
    pos: ABCD;
    content: string;
    index: number;
}

interface Question {
    choices: Choice[];
    answer: ABCD;
    answerContent: string;
    question: string;
    id: number;
}

const chapters = [1, 2, 3, 5, 6, 7, 9, 10];

chapters.forEach(ch => {
    const questions = require(`./data/${ch}.json`) as Question[];
    writeFileSync(`./data/submit/${ch}-submit.json`, JSON.stringify(questions.map((a, index) => ({
        ans: a.answerContent, id: index
    }))))
});
