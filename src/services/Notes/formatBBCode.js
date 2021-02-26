export default function formatBBCodeText(note) {
    let formattedNote = [];

    const encoding = [
        {
            tag: "***",
            addElement: (formattedNote, i, text) => { formattedNote.push(<strong key={i}>{formatBBCodeText(text)}</strong>) }
        },
        {
            tag: "///",
            addElement: (formattedNote, i, text) => { formattedNote.push(<em key={i}>{formatBBCodeText(text)}</em>) }
        },
        {
            tag: "---",
            addElement: (formattedNote, i, text) => { formattedNote.push(<del key={i}>{formatBBCodeText(text)}</del>) }
        },
        {
            tag: "___",
            addElement: (formattedNote, i, text) => { formattedNote.push(<ins key={i}>{formatBBCodeText(text)}</ins>) }
        },
    ]

    for (let i = 0; i < note.length; i++) {
        for (let k = 0; k < encoding.length; k++) {
            if (note.substring(i, i + 3) === encoding[k].tag) {
                let text = "";
                let ok = 0;

                for (let j = i + 3; j < note.length; j++) {
                    if (note.substring(j, j + 3) === encoding[k].tag) {
                        i = j + 3;
                        ok = 1;
                        break;
                    }
                    else text += note[j];
                }

                if (ok === 1) encoding[k].addElement(formattedNote, i, text);
            }
        }

        formattedNote.push(note[i]);
    }

    return formattedNote;
}