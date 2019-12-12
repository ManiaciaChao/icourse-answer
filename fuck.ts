import { writeFileSync, readFileSync } from "fs";
import * as mkdirp from "mkdirp";

type ABCD = 'A' | 'B' | 'C' | 'D';

interface Choice {
    pos: ABCD;
    content: string;
    index: number;
};

interface Question {
    choices: Choice[];
    answer: ABCD;
    answerContent: string;
    question: string;
    id: number;
};

mkdirp('./data/submit', e => e && console.error(e.stack));

const p = (content: string) => content.replace(/\s/g, '');

const patch = `var patch = patch || (content => content.replace(/\\s/g, ''));`;

writeFileSync('./patch.js', patch);

const chapters = [1, 2, 3, 5, 6, 7, 9, 10];

const client = readFileSync('./client.js').toString();

chapters.forEach(ch => {
    const questions = require(`./data/${ch}.json`) as Question[];
    const output = patch + "qs = JSON.parse(`" + JSON.stringify(questions.map((a, index) => ({
        ans: p(a.answerContent), id: index
    }))) + "`);" + client;

    writeFileSync(`./data/submit/${ch}-submit.js`, output);
});
