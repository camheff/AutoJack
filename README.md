# AutomaticBlackJack 🃏

![Gif Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXp4aHAyeGthcHJ1ZGMwNzIzMWp4eGEwaTc3YTZscDYzZTFhbnFkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3rxOqVKVTFYPIeP5wk/giphy-downsized-large.gif)

## Updates in V4.0: 📢

-   Added New Mode **Pulsz OFFER SPAMMER\_** that automatically sets up your Skrill Multi-Tab's and then clicks purchase on all tabs simultaneously.
    -   Currently tested up to 30 tabs, likely works on up to 60-70

### To update your code, just run

```bash
git pull
npm install
```

-   To run the offerSpam mode, run:

```bash
npm run start:offerSpam
```

-   To configure it:
    -   To change the number of packages to buy, open offerSpam.js and see line 81. Change this value to the number of packages you want to buy MINUS one (so 29 buys 30 packages)

```js
let numberOfPackagesToBuy = 29;
```

-   To set the correct package to buy:

    -   See line 177. IF your offer is a pop up (that shows whenever you open pulsz.com/store) SET offerIsPopup equal to true;
    -   IF your offer is NOT a popup, see line 186. Change the price inside those quotes to the price of the package you want. Currently its set to click the $23.99 package (the one I got).

-   IMPORTANT: This requires you to have Skrill linked to your Pulsz account and you MUST have Pulsz set as a trusted Merchant and your Device set as a trusted device. If you dont have this, just buy the $2 package and click the check box during checkout before running.

## What is this? 🔍

-   JS Application that displays a visual indicator for the best action to take based on the dealer's hand and your hands. **_Currently supports Chumba Purple BJ and LuckyLand BJ_**. Uses the logic from the strategy chart (referenced at the bottom) and Chrome remote debugger to analyze network requests, track the current Game's State, and displays the optimal action to take for perfect strategy. Supports splitting, multiple hands, doubles, etc. Also shows some nifty analytics functions at the bottom.

## Quick Facts: 📊

-   Yes, Automation Breaks TOS but **_this program is safe_**. Remote debugging is a feature built into chrome to help developers. Websites have **_no way_** of detecting it and even if they could, it's not a red flag.
-   I have redeemed around **_$30k_** across both sites all while using this app with **_zero issues_**. As long as you don't do something stupid like set up a macro or auto clicker, there is zero risk of detection/ban (seriously, don't do that).
-   The installation instructions might look scary if you're new to Open Source but I take you through it step by step. You don't need to know how to code. If you get lost, just ask a question in the chat and I or someone will help you.

## Commands Reference: ⌨️

### For a **_Single Site_**

```bash
npm run start:luckyland
```

or

```bash
npm run start:chumba
```

**_For both_**:

```bash
npm run start:ChadMode
```

-   **_(IF YOU GET AN ERROR MESSAGE ABOUT GPU CACHE DONT WORRY, ITS NOT AN ISSUE)_**

### (Run these from Command Prompt, not VS Code terminal)

Useful to fix your chrome without restarting:

```bash
taskkill /f /im chrome.exe
```

Check to see if your Chrome Started Correctly:

```bash
netstat -an | find "9222"
```

-   **_NOTE:_** X'ing out the application window might not stop the program, to stop it properly type in your VS Code Terminal:

    -   **_Ctrl_** and **_C_**

-   Which will kill the process.

## For the Nerds 🤓

### How does this work?

-   You just launch your chrome with an extra flag to enable remote debugging. This makes the dev tools available to other programs on your computer at port 9222. This code creates a Puppeteer instance that attaches to your dev tools through a Websocket and then reads the network request data and keeps track of your game state.
-   I then implemented the logic from the strategy charts to display a visual indicator for the appropriate action based on the game state as well as provided some handy analytics functions.
-   You can move the program window directly below the game window and the Optimal Action Indicator should line up with the actual game buttons and match their color, allowing you to play quickly while doing something else like watching youtube.

-   It displays helpful information like the hands detected, Amount Remaining To Wash, Estimated Wash Per Hour, Etc.

-   **_I highly recommend to compare the Dealer/PlayerHands detected to the Actual Game as well as the actual Chart to ensure its all being detected and displayed correctly._** I've tested this heavily but bugs may exist.

    -   I also had issues running this on my M1 Mac (the browser is very laggy due to Rosetta) but Windows and Intel Mac's appear to work fine.

## Installation Instructions 📜

### 1. PRE-REQ: If you've never touched a line of code before, first do this

-   You will need to download a code editor (I personally use VS Code, available here: [VS Code](https://code.visualstudio.com/))
-   Install nodejs available here: [Node JS](https://nodejs.org/en)
-   When installing nodejs **_make sure to check "Automatically install the necessary tools. Note this will install Chocolatey..."_** on Windows. When the powershell stops doing stuff for a while you can X it out.
-   Install git, dont need to change anything from the default in the installer unless you know what your doing, available here: [Git For Windows](https://gitforwindows.org/)

### 2. Clone (download) this project

-   Go back to the github page for this project, and click the green Code button, then copy the link it has under HTTPS ( its <https://github.com/camheff/AutomaticBlackJack.git> )
-   Open VS Code, on the left sidebar, click the Explorer button (just above the Magnifying glass), then click the blue "Clone Repository" button. (If you dont see this, try exiting and reopening VS Code).
-   Paste this link into the little bar at the top of your screen for Clone from GitHub, then click "Clone from ...."
-   After selecting a location to download it to, once the download completes click "Open" on the popup.
-   Click Yes, I trust the authors.

### 3. AFTER Cloning

-   Open a VS Code Integrated Terminal by selecting **_Terminal_** then **_New Terminal_** (On the Bar on the Top Left with File, Edit, etc.)

Run the command:

```bash
npm install
```

-   **_If you get an error try running it a second time_**

-   This will install dependencies for the project so it can run.

**_The project is now installed, you just need to configure Chrome so it can be accessed by this code_**.

### 4. Setting up Chrome

-   Find or create a shortcut to your Google Chrome, then right click it, select "Properties", and add " --remote-debugging-port=9222" (without the quotes, with the space in front) to the end target field.

So it should look something like:

```bash
"C:\Program Files\Google\Chrome\Application\chrome_dev.exe" --remote-debugging-port=9222
```

-   You will probably need to either turn off your Firewall or add an exception for this Chrome in your firewall rules, otherwise it will **_probably block the remote debugger_**.

To ensure this is working, launch the Chrome with this short cut, and open a command prompt (search command prompt in the Windows Start Menu) then run

```bash
netstat -an | find "9222"
```

This should display a line like

```cmd
TCP 127.0.0.1:9222 0.0.0.0:0 LISTENING
```

-   If it shows nothing, its likely a firewall issue. If it shows a bunch of entries and the program cant connect to chrome when ran, try running the command:

```cmd
taskkill /f /im chrome.exe
```

-   Then try opening chrome from your shortcut again, or try restarting your PC and make sure you launch the Chrome shortcut with remote debugging **_before_** a regular Chrome instance.
-   If you see LISTENING your Chrome is setup correctly.

    -   If you dont want to make a shortcut, or this doesn't make any sense, you could alternatively try launching it like this [Youtube Video](https://www.youtube.com/watch?v=LEJX645aeFU&t=3s&ab_channel=AutoTest)

### 5. Running it

-   Back in your VS Code window, after running npm install, you can run the Application with:

```bash
npm run start:luckyland
```

or

```bash
npm run start:chumba
```

-   You need to have your remote debugging Chrome window **_opened_** at either chumba or luckyland **_before_** running this command (I run the command when im on the BJ page).
-   Only have **one single window/tab** opened per Casino, having multiple tabs open on the same site will likely mess things up.

#### CHAD MODE 💪

-   Try it out with:

```bash
npm run start:ChadMode
```

-   The mode for the true degen. Allows you to run the code on both sites at the same time
-   Will correctly track each one individually, allowing you to wash on both sites for 2X playthrough
-   Id recommend having your windows arranged as I do in the GIF to make it easier
    -   (If you get a GPU Cache error in the terminal when running this, dont worry about it thats normal)

## Weird Things to Note about Each Site⚠️

### Chumba

-   Launch the Code while on the main lobby page at Chumba, then open Purple BlackJack.
-   **_You need to click the Sweeps Coins thing at the top atleast once_** (so it displays your Balance and Redeemable Balance) for the program to know those values and make the appropriate calculations for analytics.
-   **_NEW_** Added a reminder to the UI if you haven't clicked this when playing

### LuckyLand

-   ~~After Dealer BlackJack, it displays Hit instead of Repeat.~~ It also doesn't start showing the correct values for Time, Bets Per hour, etc. until one or two wins.

Since these are super minor quirks they arent on my radar to fix. The code is pretty rough with a lot of duplications. This is because it was initially designed only for Chumba but LuckyLand had a **_much_** different (shittier) process for how the game works with its state management and network requests and I was too lazy to make the code modular and efficient. Its not an enterprise app or a resume builder, the code does its job and I'm busy working on **_many other important automations that everyone in the group can take advantage of soon_**.

## FAQ ❓

### Are you going to make this fully automated for actually clicking the buttons too?

-   Probably not, I dont view this as worth the risk. Automation breaks TOS and is bannable.
-   While we can **_read_** the data with a **_100% guarantee of that being undetectable_**, **_actually interacting with the browser_** will always carry a possiblity of detection (albeit very small one).
    -   Given the size of the deposits we are making on these websites this is not worth the risk to save a couple hours of time per week. The hourly profit is at Lawyer/Surgeon levels, dont risk a ban out of greed/laziness.

### If I already memorized the chart is this program useless?

-   Besides the added benefit of not having to actually play/follow the game (which I find super boring and tedious), since the program **_tracks the game state through network requests_** it has access to the hand data **_before_** your screen animations complete
-   This means **_its guaranteed to speed up your game_** (you will already see the correct action to take before the hands even finish dealing).

-   It can also help prevent you from making any mistakes, very useful considering that even a single mistake can heavily effect your sessions RTP and the profitability of this method.

-   And with the addition of **_ChadMode_**, it opens up the opportunities to **_complete your daily wash simultaneously_** on both sites without mistakes, greatly reducing the time needed.

### Are you planning any more updates?

-   Unless a breaking change happens like a site layour change, not at this time. I believe all useful features have been added but am always open to suggestions.
-   **_If_** more 5% Casino's open I will definitely investigate adding support to those but for the time being I believe all goals have been met.

### Will you add support for Chumba Green?

-   I dont see any point in adding this. Play through is slower than Purple and there is not an EV difference between playing multiple small hands versus playing one large hand, plus it has slightly worse RTP. **_Purple is Goated._**

### If you've found any kind of bug, have trouble getting it running, or have an interesting idea to add to it let me know in discord Camheff (@tracer6136)

## Sources For Tables 📜

-   [Chumba Purple Table](https://www.beatingbonuses.com/bjstrategy.php?decks2=6&h17=stand&doubleon2=9to11s&das2=on&peek2=off&surrender2=no&charlie2=no&dsa2=on&resplits2=4&resplitA=0&shuffle=0&bj=3to2&opt2=2&btn2=Generate+Strategy)

-   [LuckyLand Table](https://www.beatingbonuses.com/bjstrategy.php?decks2=6&h17=hit&doubleon2=any2cards&das2=on&peek2=on&surrender2=no&charlie2=no&resplits2=3&shuffle=0&bj=3to2&opt2=1&btn2=Generate+Strategy)

## Sponsorships/Donations 🤝

-   This code is open source and 100% free for anyone to use, but it did take me a lot of effort and I spent a few weeks researching and working on the best way to implement something like this for everyone's benefit while I could have just been doing the 5% method during that time.
-   If you like the software, find it useful and want to show your appreciation the Sponsors button at the top of the Github page is the best way to do so and I would greatly appreciate any support.
-   Im not expecting to make anything off this besides what we win from the Casino's but any Sponsor money would help me in opening my SEP IRA's, and knowing theres people out there enjoy my work enough to be willing to sponsor it would really be a dream come true.
-   I will continue to try my best to continue provide anything useful I create to the group (like my **_Fully-automatic RSA Trade's Profit/Loss tracker_** for **_Google Sheets & Gmail_** coming out very soon).

## **_OmniTrader_** Early Access, the Automated RSA CLI 📈

-   Some of the Sponsorship tiers are also eligible to get **early access to an RSA CLI program** I've been working on called **_OmniTrader_**
    -   An Application with the goal of **automating your RSA trading** so you can place your Buy's and Sell's accross **_ALL_** brokers with a **_single command_** (no more pulling over on the side of highways to get last minute trades in).
    -   Currently it supports:
        -   TastyTrade
        -   Tradier
        -   Wells Fargo
        -   Vanguard
        -   Public
    -   And more coming very soon. Its currently an active work in progress and I plan to add just about every broker used for RSA to the Project starting with the slowest and most annoying brokers to trade on being focused first.
