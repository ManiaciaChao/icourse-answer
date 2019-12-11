let all = $$('.j-choicebox');

let simulateClick = elem => {
    // Create our event (with options)
    let evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
};

all.map((i, index) => Array.from(i.querySelectorAll('.optionCnt')).filter(ans => ans.innerText === qs[index].ans)).flat().forEach(a => simulateClick(a))

qs.filter(q => q.ans === 'wrong' || q.ans === 'correct').forEach(q => simulateClick(all[q.id].querySelector(`.u-icon-${q.ans}`)))