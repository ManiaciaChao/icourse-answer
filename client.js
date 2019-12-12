var all = $$(".u-questionItem");

// using var for re-declaring
var simulateClick =
  simulateClick ||
  (elem => {
    // Create our event (with options)
    let evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
  });

var qsMap = new Map(qs);

all
  .filter((item, index) =>
    qsMap.has(patch(item.querySelector(".f-richEditorText").textContent))
      ? true
      : console.warn(`Missing Question: No.${index + 1}!`)
  )
  .map((item, index) =>
    Array.from(item.querySelectorAll(".optionCnt")).map(ans => {
      var question = patch(item.querySelector(".f-richEditorText").textContent);
      var option = patch(ans.innerText); // used for common ABCD
      var className = ans.children[0].className; // used for true or false
      var img = ans.querySelector("img"); // used for image answer
      var answer = patch(qsMap.get(question));
      if (
        option === answer ||
        className.includes(answer) ||
        (img && img.src === answer)
      ) {
        return () => simulateClick(ans);
      }
    })
  )
  .flat()
  .filter(item => item)
  .forEach(click => click());
