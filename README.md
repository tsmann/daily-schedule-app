# Daily Schedule & Care Tracker

A personal schedule management app designed for caregivers managing multiple responsibilities including childcare, eldercare, work, and household management.

## Features

- Real-time schedule tracking with current time block highlighting
- Interactive task checklists with progress tracking
- FlyLady zone cleaning integration with 4-week rotation
- Custom task addition and management
- Data persistence using browser local storage
- Mobile-friendly responsive design
- Progress tracking across different activity categories

## Usage

The app automatically highlights your current time block and allows you to:

1. Check off completed tasks
2. Add custom tasks to any time block
3. Switch between FlyLady zones (4-week rotation)
4. Reset daily progress with the "Reset Day" button
5. Track progress across Personal, Care, Work, and FlyLady categories

## FlyLady Zones

- **Week 1**: Entrance, Front Porch & Dining Room
- **Week 2**: Kitchen
- **Week 3**: Bathroom & Kids' Rooms  
- **Week 4**: Master Bedroom

## Installation

Simply open index.html in any modern web browser. The app works entirely client-side and saves your progress locally.

## Customization

You can modify the schedule times and tasks by editing the `schedule` array in `app.js`.
```# Files to Create for GitHub

You'll need to create these 3 files in your GitHub repository:

## 1. index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Schedule & Care Tracker</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="apple-touch-icon" sizes="180x180" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📅</text></svg>">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📅</text></svg>">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Daily Schedule">
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.js"></script>
</body>
</html>
