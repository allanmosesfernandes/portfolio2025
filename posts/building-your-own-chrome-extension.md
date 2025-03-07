---
title: 'Build your own chrome extension'
date: '2025-03-03T15:44:11.388Z'
tags:
    - frontend
    - side projects
summary: 'Build your own year progress extension in just three files.'
slug: 'build-your-own-chrome-extension'
image: '/blog-images/chrome-extension.png'
readingTime: '10'
---

I wanted a simple way to track the year's progress, so I decided to build a Chrome extension for it.
I’ve also for some reason figured it would be super challenging to build my own chrome extension (spoiler alert: it's not) so I decided to do something about it and got to work:<br/><br/>

![image](/blog-images/chrome-extension.png)

### What we'll be building:


![image](/blog-images/chrome-extension/final.png)


Create a New Folder and name it whatever you like, for the purpose of this demo I’m going to call my folder `Year Timer`.
As the title says this is how you can build your own chrome extension in three files.

### File 1: manifest.json

-

```
{
    "name": "Timer",
    "version": "1.0",
    "description": "Displays the percentage of the current month and year that has passed.",
    "manifest_version": 3,
    "action": {
        "default_popup": "popup.html"
    }
}
```

- This `manifest.json` is the blueprint of our chrome extension, it tells Chrome what our extension does and how to run it. Every extension must have a manifest.json file in its root directory.

### File 2: popup.html
-
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Time tracker</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: "Fira Code", monospace;
      width: 350px;
    }

    .today-wrapper {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .title {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 0;
    }

    .legend {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .month {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .month-color {
      display: block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #004E0D;
      animation: pulse 3s infinite;
    }

    .month-color.year {
      background-color: #94E583;
    }

    .text-muted {
      color: #90A2B9;
      font-weight: medium;
    }


    .font-700 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .progress-container {
      margin: 1rem 0 -0.25rem 0;
      width: 100%;
      height: 10px;
      border-radius: 10px;
      background-color: #94E583;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      width: 0;
      background-color: #004E0D;
      border-radius: 10px;
      transition: width 0.5s ease-in-out; /* smooth animation on update */
    }
  </style>
</head>
<body>
  <p class="title" id="yearTitle">Arc of Time</p>
  <!-- Month & Year Legend -->
  <div class="legend">
      <div class="month">
        <span class="month-color"></span>
        <p class="text-muted">Month</p>
      </div>
      <div class="month">
        <span class="month-color year"></span>
        <p class="text-muted">Year</p>
      </div>
  </div>
  <!-- Month & Year progress-->
  <div class="wrapper">
    <div class="progress">
      <div id="monthProgress" class="font-700">Calculating...</div>
      <div id="getDaysOfMonth" class="text-muted bold">Calculating...</div>
    </div>
    <div class="progress">
      <div class="monthProgress"></div>
      <div id="yearProgress" class="font-700">Calculating...</div>
      <div id="daysOfYearLeft" class="text-muted bold">Calculating...</div>
    </div>
  </div>
  <!-- Progress Bar -->
  <div class="progress-container">
    <!-- This div will be updated with the current year progress -->
    <div class="progress-bar" id="year-progress-bar"></div>
  </div>
  <!-- Today -->
  <div class="today-wrapper">
    <p class="text-muted">Today</p>
    <p id="currentDay">Calculating</p>
  </div>
  <script src="popup.js"></script>
</body>
</html>
```
-
Quite simply `popup.html` is the user interface of our extension. This is what the user sees and interacts with in the browser.
Think of this as in iFrame within your browser. There are limitations with the UI as you cannot alter the host window within which your iFrame resides but you can go crazy with the actual iFrame.
If you load this file onto your browser you should see the static user interface as below:

![image](/blog-images/chrome-extension/html.png)

### File 3: popup.js
-
```
    // Calculate the percentage of the current month that has passed.
    function getMonthProgress() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Note: months are 0-indexed (0 = January, 11 = December)

    // Get the total number of days in the current month:
    // By creating a date for the next month and setting day 0 (which gives the last day of the current month)
    const totalDays = new Date(year, month + 1, 0).getDate();
    const currentDay = now.getDate();

    // Calculate progress: using the current day as a fraction of total days.
    const progress = (currentDay / totalDays) * 100;
    return progress.toFixed(2); // returns a string with 2 decimal places
    }

    function getDaysOfMonth() {
    // Get today's date
    const now = new Date();

    // Extract day, month, and year
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    // Calculate total days in this month
    // Creating a date with day=0 for the next month automatically gives
    // us the last day of the current month.
    const totalDays = new Date(year, month + 1, 0).getDate(); // e.g. 28 in Feb 2025

    // Return the fraction "currentDay/totalDays Days"
    return `${day}/${totalDays} Days`;
    }

    function getYearProgress() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

    // Total time in the year (milliseconds)
    const totalTime = startOfNextYear - startOfYear;
    // Elapsed time since the beginning of the year (milliseconds)
    const elapsed = now - startOfYear;

    const progress = (elapsed / totalTime) * 100;
    return progress.toFixed(2);
    }

    function getYearDays() {
    const now = new Date();
    const year = now.getFullYear();

    // Get January 1st of the current year
    const startOfYear = new Date(year, 0, 1);

    // Calculate days passed (including the current day)
    const diffInMs = now - startOfYear;
    const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

    // Check for leap year: divisible by 4, but not by 100 unless also by 400
    const totalDays = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;

    return `${daysPassed}/${totalDays} Days`;
    }

    // Helper function to get ordinal suffix (st, nd, rd, th)
    function getOrdinalSuffix(day) {
    const j = day % 10, k = day % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
    }

    // Short names for days and months
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    function updateUI() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const progressValue = getYearProgress(); // compute once

    const yearTitle = document.getElementById('yearTitle');
    yearTitle.textContent = `${currentYear} Progress`;

    const monthProgressElement = document.getElementById("monthProgress");
    const yearProgressElement = document.getElementById("yearProgress");
    const daysOfMonthText = document.getElementById("getDaysOfMonth");
    const daysOfYearLeft = document.getElementById("daysOfYearLeft");
    const progressBar = document.getElementById("year-progress-bar");

    progressBar.style.width = progressValue + "%";
    monthProgressElement.textContent = getMonthProgress() + "%";
    yearProgressElement.textContent = progressValue + "%";
    daysOfMonthText.textContent = getDaysOfMonth();
    daysOfYearLeft.textContent = getYearDays();

    // Current day display
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const suffix = getOrdinalSuffix(date);

    document.getElementById("currentDay").textContent = `${dayName}, ${monthName} ${date}${suffix}`;
    }

    // Update the progress when the popup loads.
    document.addEventListener("DOMContentLoaded", updateUI);

    // Refresh the calculations every hour:
    setInterval(updateUI, 3600000);

```
-

Now that we have our interface built what we need next is to add interactivity to this bad boy, and `popup.js` does exactly that.

For the extension we are creating we need to programmatically calculate the total days in the current month `(getDaysOfMonth)` and the days that have passed `(getMonthProgress)` and similarly calculate the total days in the current year `(getYearDays)` and the days that have elapsed since the start of the year `(getYearProgress)`.
Finally we create an `(updateUI)` function that calls these functions and updates the user interface.

If you now try and open the popup.html file in the browser you should see your app correctly calculating the progress.

![image](/blog-images/chrome-extension/final-js.png)

### Loading your extension

All that’s left now is to load our nifty application as a chrome extension.
Click on the 3 vertical dots on the far right of your chrome browser labelled Customise and control Google Chrome.
Click on Extensions and Select Manage Extensions

![image](/blog-images/chrome-extension/sidebar.png)
Or you can simply just enter `chrome://extensions/` into the address bar

Once here click on Load unpacked and select the folder you created.

![image](/blog-images/chrome-extension/select-folder.png)

Your extension should now appear within the All extensions section

![image](/blog-images/chrome-extension/load-extension.png)

### Pinning your extension

Lastly we want our extension to be pinned so it’s always at the forefront and easily accessible. To do so Click on the Extension icon and ensure you’ve Clicked on the Pin beside the name of our extension.
![image](/blog-images/chrome-extension/enable-pinned-extension.png)
****
You can download the extension for free from the [Chrome Store](https://chromewebstore.google.com/detail/jdbccgeplefjfpgfaadkmahbpbihlapd?utm_source=item-share-cb)

(You could also be ultra generous and give the bad boy 5 stars?)

### PS:
The design for this extension was developed by my [very talented designer brother](https://linktr.ee/rollen43) who took my not so slick design and converted it into the slick little extension that it is now.

![image](/blog-images/chrome-extension/design.png)

### Helpful Links
- [Google's guide on building chrome extensions](https://developer.chrome.com/docs/extensions/get-started)
