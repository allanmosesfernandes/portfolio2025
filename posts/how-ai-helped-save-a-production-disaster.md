---
title: 'How AI helped save a prod disaster'
date: '2025-05-18T10:40:03.371Z'
tags:
    - frontend
    - life
summary: 'How GPT helped us feed 9000 entries into our codebase on launch day.'
slug: 'how-ai-helped-save-a-production-disaster'
image: '/blog-images/blog-6-ai-.png'
readingTime: '5'
---

The stage was set, we were all ready to go live with our shiny new web portal built extensively over 9 months. 9 solid months of sweat, blood, annoying merge conflicts, over time, and endless PR reviews to get us through the line.
<br/>
![image](/blog-images/blog-6-ai-.png)

I’ve always found launch days as a developer very special, it’s like your code being baptized and a validation of your effort by the masses. The very people you build the software for.

We were so confident about our flawless launch that we started celebrating prematurely by going out for celebratory pints 🍻 the night prior.

Come to launch morning, we’ve hit LIVE and we were rocking, everything was going fine until it wasn’t.

On our sign up page we had a dropdown that linked users with the company they were signing up for, now this was a simple select dropdown populated with the list of company names.

![image](/blog-images/blog-6/dropdown.png)

However, If your company was not listed on the dropdown you had to manually create a request for approval. Which meant no instant registration, delays, tickets and a flood of frantic pings to our back office for approval.

We set launch, and over-heard the back office team going on about how they’ve had to register atleast 9 firms which should already have been listed.

One look at the codebase made us realise we only had 4 firms on that dropdown.

No problem, just add the rest of the firms right? Right…?
The only problem was the exact number of firms was more than 4500+ and with their accompanying firm numbers so thats 9000 entries we had to get in.

Now the correct way to resolve this would be to create an API endpoint to list the various firms and their firm numbers and it could be dynamic.

But we didn’t have that kind of time, the requests were coming in thick and fast. (and remember we had too many pints 🍻 the previous night?_ yea that wasn’t helping our cause either)

Our senior backend engineer quickly pulled up a CSV that contained everything we needed: each firm’s name and number.
The problem was simple, take these columns from the CSV, and convert them into an array of objects for our dropdown. And do it fast ⚡.

### Enter the hero of our times: GPT
I fed my problem to our hero:
![image](/blog-images/blog-6/script.png)

And voila:
```js
npm install xlsx

const xlsx = require('xlsx');
const fs   = require('fs');

// 1. Load the workbook (replace with your actual filename)
const workbook = xlsx.readFile('firms.xlsx');

// 2. Pick the sheet you want (0 = first sheet)
const sheetName = workbook.SheetNames[0];
const sheet     = workbook.Sheets[sheetName];

// 3. Convert sheet to JSON, using the header row to name columns
//    defval: '' ensures empty cells come through as empty strings (not undefined)
const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

// 4. Map to your desired format, and drop any incomplete rows
const firmFcaNumbers = rows
.map(row => ({
    name:      row.FirmName,
    fcaNumber: String(row.FCANo).trim()
}))
.filter(item => item.name && item.fcaNumber);

// 5. Print out (or write) the resulting array literal
const output = `const firmFcaNumbers = ${JSON.stringify(firmFcaNumbers, null, 2)};\n`;

// a) Log to console:
console.log(output);

// b) Optionally write to a file for import elsewhere:
fs.writeFileSync('firmFcaNumbers.js', `${output}module.exports = firmFcaNumbers;\n`, 'utf8');
```

This entire process took no longer than 5 minutes. We’d transformed the data, tested across every environment, and pushed the patch live.

Suddenly the whole backdrop office got less complaints and AI helped save our skins. And I also got a triumphant fist bump 🤜🏻 🤛🏻 from our senior backend engineer and we went back to nursing our hangovers.

This might be the most underwhelming article you’ll ever read on the things AI can help you achieve, but in that moment I was so glad to have access to a tool that made these things easier and not swift through 5 different takes on stackoverflow.

I personally find myself going away from AI models for my coding workflow, because it feels like outsourcing the very joy of solving problems. Don't get me wrong I still use AI to help me when I'm stuck or do a review to ensure I'm not shipping idiot code.

I don’t want AI to do the thinking for me, I code because I enjoy and love solving problems. but I don't want AI to come up with a solution before I have even got a chance to think about the problem myself.

But was I glad I had access to GPT when I had to transform 4500+ rows using a script and not laboriously editing each one by hand like I was shackled in a data-entry dungeon? Absolutely f***** yes!

![image](/blog-images/blog-6/thankyou.png)
