---
title: 'Build your resume using markdown'
date: '2025-03-09T19:52:52.687Z'
tags:
    - code
    - side projects
summary: 'Ditch clunky wordprocessors to build your own resume generator using markdown'
slug: 'build-your-resume-using-markdown'
image: '/blog-images/markdown-blog-remastered.png'
readingTime: '10'
---

It's that phase of my life again where I'm on the hunt for a new job, so I needed to create a resume to apply for jobs and I traditionally always just used Google Docs. However this process felt really slow and cumbersome since I had to modify my resume to fit every unique job description. I found myself aggressively backspacing every line because my template just felt inflexible.<br/>
<br/>

So instead of giving in to the tyrannical word processor I decided to build a tool that would
![image](/blog-images/markdown-blog-remastered.png)

- Allow me to just use code to build my resume.
- Not stress over formatting.
- Something I could just run locally.
- Would not make me cry.

I already use Markdown for all my [blog posts](/blog/next-js-blog-using-app-router) so I decided to build something that would just leverage Markdown, and after a quick [Sonnet 3.5](https://www.anthropic.com/news/claude-3-5-sonnet) search I found out this was actually feasible and had a rather straightforward workflow.

![image](/blog-images/resume-flow.png)

### The workflow
---
1. Write your resume in markdown and wrap key sections with HTML tags.
2. Convert the markdown file to HTML using Pandoc which will render your HTML tags in markdown into actual semantic elements.
3. Convert this HTML to PDF.

### Project setup
---
All you need are these two packages:  `npm i node-pandoc puppeteer`
We need `node-pandoc` to interface with Pandoc (a universal document converter) and `puppeteer` to automate the conversion of HTML to PDF.

*Note: Make sure you have `pandoc` installed on your machine, as `node-pandoc` depends on the local `pandoc` installation.
[Installing pandoc](https://pandoc.org/installing.html) should set you up with the pandoc installation.

### Markdown to HTML
---
Start with drafting your resume in markdown and wrapping key sections using HTML tags.
Prepare your CSS stylesheet with base styles in a `style.css` file that will then be attached to the HTML file.
We'll create a script called convert.js that holds all our logic to run this conversion.
The snippet below calls pandoc to convert the markdown file to HTML and attach our  `style.css` styles to our HTML template.

```js
    <!-- convert.js -->
    import nodePandoc from 'node-pandoc';

    // Input Markdown file
    const src = './resume.md';

    // Pandoc Arguments
    const args = '-f markdown -t html5 -s -c style.css -o resume.html';

    // Callback function to handle conversion result
    const callback = (err, result) => {
    if (err) {
        console.error('❌ Error:', err);
        return;
    }
    console.log('✅ Resume successfully converted to HTML!');
    };

    // Call Pandoc to convert Markdown to HTML
    nodePandoc(src, args, callback);

```

Now to test our markdown conversion, you can just run this file using `node convert.js` or to make life simple you can just add it to your `package.json`
```json
    "scripts": {
        "convert": "node convert.js",
    },
```

So now `npm run convert` should output a `resume.html`

### Adjusting styles
---
If you open the HTML you'll see our `style.css` coming into effect. You can adjust the root variables or modify the stylesheet to fit your needs.

### Converting HTML to PDF
---
Once we're happy with our HTML and the styling we need to convert this HTML to PDF using puppeteer.
The snippet below spins up puppeteer to convert our HTML to PDF and has some additional properties passed into puppeteer to fit our resume neatly.

```js
    <!-- generate-pdf.js -->
    import puppeteer from "puppeteer";
    import { fileURLToPath } from "url";
    import path from "path";

    // Define __dirname manually
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set viewport size to match A4 dimensions
        await page.setViewport({ width: 794, height: 1123 });

        // Load the HTML file
        await page.goto(`file://${__dirname}/resume.html`, { waitUntil: "networkidle0" });

        // Generate PDF with proper scaling
        await page.pdf({
            path: "resume.pdf",
            format: "A4",
            printBackground: true,
            margin: { top: "5mm", right: "10mm", bottom: "5mm", left: "10mm" },  // Reduce margins
            scale: 0.85,  // Scale down content to fit in one page
        });

        await browser.close();
        console.log("📄 PDF generated successfully and now fits one page!");
    })();
```

Again we can add this to our `package.json` to run it using npm

```json
    "scripts": {
        "convert": "node convert.js",
        "pdf": "node generate-pdf.js",
    },
```

So now `npm run pdf` should output a `resume.pdf`

Finally you can combine the two commands into one and just run `npm run build` to trigger the entire flow.

```json
    "scripts": {
        "convert": "node convert.js",
        "pdf": "node generate-pdf.js",
        "build": "npm run convert && npm run pdf"
    },
```

This is how my [resume](/resume.pdf) turned out. I now no longer have to wrestle with Google docs and can ship out edits much faster.
The [source code](https://github.com/allanmosesfernandes/markdown-resume-builder) for this can be found here.

TLDR: Leverage Markdown, Pandoc, and Puppeteer to [build some cool shit](/blog/start-your-side-project).