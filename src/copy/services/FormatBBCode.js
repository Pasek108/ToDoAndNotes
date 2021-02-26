export function formatBBCodeText(note) {
    let formattedNote = [];
    for (let i = 0; i < note.length; i++) {
        if (note[i] === "[" && note[i + 2] === "]") {
            const tag = note[i + 1];
            if (tag !== "b" && tag !== "i" && tag !== "s" && tag !== "u") {
                formattedNote.push(note[i]);
                continue;
            }

            let text = "";
            for (let j = i + 3; j < note.length; j++) {
                if (note.substring(j, j + 4) === `[/${tag}]`) {
                    i = j + 3;
                    break;
                }
                else text += note[j];
            }

            if (tag === "b") formattedNote.push(<strong key={i}>{formatBBCodeText(text)}</strong>);
            else if (tag === "i") formattedNote.push(<em key={i}>{formatBBCodeText(text)}</em>);
            else if (tag === "s") formattedNote.push(<del key={i}>{formatBBCodeText(text)}</del>);
            if (tag === "u") formattedNote.push(<ins key={i}>{formatBBCodeText(text)}</ins>);
        }
        else formattedNote.push(note[i]);
    }

    return formattedNote;
}