import { Parser } from "htmlparser2";

function isHTML(code) {
    let isValidHTML = false;

    const parser = new Parser({
        onopentag() {
            isValidHTML = true; // If at least one tag is found, it's likely HTML
        }
    });

    parser.write(code);
    parser.end();

    return isValidHTML;
}


console.log(isHTML("### Double-click this cell to edit <div>Hello</div>")); // true

