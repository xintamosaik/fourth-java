# memoji - Emoji Memory Game

A simple single-player memory game that uses fruit and veggie emojis as cards. The goal is to flip two matching emojis in as few attempts as possible.

## How to Play
1. Open `index.html` in your web browser (or serve it locally).
2. Flip any card to see its emoji.
3. Flip a second card:
   - If they match, they remain face-up as "matched."
   - If they don't match, they flip back face-down.
4. Keep flipping cards until you match them all!

## How to Run Locally
- start a local server (for example, using Python): 
```bash
cd your-project-folder
python -m http.server 8000
```
Then go to `http://localhost:8000/index.html` in your browser.

## File Structure

- `index.html`: Main HTML file.
- `static/style.css`: Main CSS file.
- `static/script.js`: Main JavaScript file.