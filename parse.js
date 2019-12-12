choices = [];

choices = $$('.optionPos').map((i, index) => ({ pos: i.innerText.replace('.', '').trim(), content: i.nextSibling.innerText.trim() || i.nextSibling.firstChild.classList.value.replace('u-icon-', ''), index: index }))

endAt = [0];

isLast = ch => {
    if (ch.pos === 'D') {
        return true;
    }
    if (ch.pos === 'B' && (ch.content === 'wrong' || ch.content === 'correct')) {
        return true;
    }
}

choices.filter((ch, index) => isLast(ch) && endAt.push(index + 1));

questions = [];

endAt.reduce((pre, cur) => {
    questions.push({
        choices: choices.slice(pre, cur)
    })
    return cur
})

$$('.tt2').forEach((i, index) => questions[index].answer = i.innerText)

questions.forEach(i => i.answerContent = i.choices.filter(ch => ch.pos.includes(i.answer))[0].content)

$$('.f-richEditorText').filter(i => !i.classList.value.includes('optionCnt')).forEach((q, index) => questions[index].question = q.innerText)

JSON.stringify(questions)
