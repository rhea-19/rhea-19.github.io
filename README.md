# Rhea Sudheer — Portfolio

Personal portfolio featuring production software engineering, AI and retrieval systems, low-level systems, and published research.

[View the portfolio](https://rhea-19.github.io/)

## Preview locally

This is a static site with no build step. From the repository root:

```bash
python3 -m http.server 8001 --bind 127.0.0.1
```

Open [localhost:8001](http://localhost:8001). If the port is occupied, choose another port.

## Site files

- `index.html`: portfolio content, project source links, experience, publications, and contact details.
- `styles.css`: responsive layouts, typography, and visual styling.
- `script.js`: mobile navigation, project filters, scroll progress, and reveal effects.
- `project-quicklook.js`: accessible “How it works” project dialogs.
- `assets/`: photographs and downloadable résumés.

The résumé selector offers Backend / Software Engineering and AI / ML & Systems versions. The Data Science résumé is currently unlisted.

## Project browsing

Additional projects can be filtered by category. “How it works” opens a quick-look dialog with the project's workflow and available source links, without expanding neighboring cards. Escape, the close button, or a click outside the dialog dismisses it and restores focus to the opener. Native inline disclosures remain available without JavaScript.

Public project entries link to matching GitHub repositories and, where available, implementation files, notebooks, or reports. Publications include DOI links.

## GitHub Pages

The publishing repository is `rhea-19/rhea-19.github.io`. Configure **Settings → Pages → Deploy from a branch → main → /(root)**. Changes pushed to `main` are published by GitHub Pages when deployment completes.

When changing CSS or JavaScript, update the corresponding asset version in `index.html` so returning visitors receive the latest files.
