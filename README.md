# AutomaticBlackJack
![Example Screenshot](Software.PNG)

# Updates in V2.0:

Added new mode: ***ChadMode***. This allows you to play on ***BOTH*** Chumba AND LuckyLand at the same time. Double your wash rate like a true degenerate.

Fixed the view resizing bug. After running the code you should no longer have to open the dev tools to manually fix this.

Fixed LuckyLand Chart logic to use corrected Chat.

Updated Optimal Action Indicator to match colors of LuckyLand's Buttons

Fixed bugs displaying double when that is not possible, will now show correct "Hit" or "Stand" instead.

Fixed bug to correctly show repeat when dealer has Black Jack.

All known bug's should now be fixed. 

To update your code, just run:

***git pull***

then run:

***npm install***

And thats it!

# What is this?
JS Application that displays visual indicator for best action to take based on the dealer hand and your hands. ***Currently supports Chumba Purple BJ and LuckyLand BJ***. Uses the logic from the strategy chart (referenced at the bottom) and Chrome remote debugger to analyze network requests, track the current Game's State, and displays the optimal action to take for perfect strategy. Supports splitting, multiple hands, doubles, etc. Also shows some nifty analytics functions at the bottom.

# Quick Facts:

Yes Automation Breaks TOS but ***this program is safe***. Remote debugging is a feature built into chrome to help developers. Websites have ***no way*** of detecting it and even if they could, its not a red flag. 

I have redeemed around ***$30k*** accross both sites all while using this app with ***zero issues***. As long as you dont do something stupid like set up a macro or auto clicker there is zero risk of detection/ban (seriously, dont do that).

The installation instructions might look scary if your new to Open Source but I take you through it step by step. You dont need to know how to code. If you get lost, just ask a question in the chat and I or someone will help you. ***Installation video planned to be coming soon.***

***What are the benefits of this?*** You dont have to stare at a chart and actually focus on the game. You can chill, have your girlfriend or grandma play for you, or even use ChadMode and play on both sites at the same time. This is meant to make your life easier.

***Will I get a virus?*** The code is open source, plenty of people in the discord have used and read it. Nothing sketchy going on here. Feel free to chuck it into Chat GPT if you want to verify its safety. ***Just make sure you dont forget to turn your FireWall back on after you finish playing*** if you turned it off, its not something you want to keep off unless you need to.

# Commands reference:

For a ***Single Site***, Either:

***npm run start:luckyland***    

***npm run start:chumba***    

***For both***:

***npm run start:ChadMode***

***(IF YOU GET AN ERROR MESSAGE ABOUT GPU CACHE DONT WORRY, ITS NOT AN ISSUE)***

(these two are ran from Command Prompt, not VS Code)

Useful to fix your chrome without restarting:

***taskkill /f /im chrome.exe***

Check to see if your Chrome Started Correctly:

***netstat -an | find "9222"***

***NOTE:*** X'ing out the application window might not stop the program, to stop it type in your VS Code Terminal:

Ctrl + C 

To actually stop it.

# For the nerds:

### How does this work?

You just launch your chrome with an extra flag to enable remote debugging. This makes the dev tools available to other programs on your computer at port 9222. This code creates a Puppeteer instance that attaches to your dev tools through a Websocket and then reads the network request data and keeps track of your game state. I then implemented the logic from the strategy charts to display a visual indicator for the appropriate action based on the game state as well as provided some handy analytics functions. 

You can move the program window directly below the game window and the Optimal Action Indicator should line up with the actual game buttons and match their color, allowing you to play quickly while doing something else like watching youtube.

It displays helpful information like the hands detected, Amount Remaining To Wash, Estimated Wash Per Hour, Etc.

***I highly recommend to compare the Dealer/PlayerHands detected to the Actual Game as well as the actual Chart to ensure its all being detected and displayed correctly.*** I've tested this heavily but bugs may exist.

I also had issues running this on my M1 Mac (the browser is very laggy due to Rosetta) but Windows and Intel Mac's appear to work fine.


# Installation Instructions
### 1. PRE-REQ: If you've never touched a line of code before, first do this 

You will need to download a code editor (I personally use VS Code, available here: https://code.visualstudio.com/ )

Install nodejs: Node JS: https://nodejs.org/en

When installing nodejs ***make sure to check "Automatically install the necessary tools. Note this will install Chocolatey..."*** on Windows. When the powershell stops doing stuff for a while you can X it out.

Install git, dont need to change anything from the default in the installer unless you know what your doing, available here: https://gitforwindows.org/

### 2. Clone (download) this project 

Go back to the github page for this project, and click the green Code button, then copy the link it has under HTTPS ( its https://github.com/camheff/AutomaticBlackJack.git )

Open VS Code, on the left sidebar, click the Explorer button (just above the Magnifying glass), then click the blue "Clone Repository" button. (If you dont see this, try exiting and reopening VS Code).

Paste this link into the little bar at the top of your screen for Clone from GitHub, then click "Clone from ...."

After selecting a location to download it to, once the download completes click "Open" on the popup.

Click Yes, I trust the authors.

### 3. AFTER Cloning:

Open a VS Code Integrated Terminal by selecting ***Terminal*** then ***New Terminal*** (On the Bar on the Top Left with File, Edit, etc.)

Run the command: ***npm install***

***If you get an error try running npm install a second time***

This will install dependencies for the project so it can run. 

***The project is now installed, you just need to configure Chrome so it can be accessed by this code***.


### 4. Setting up Chrome:
Find or create a shortcut to your Google Chrome, then right click it, select "Properties", and add " --remote-debugging-port=9222" (without the quotes, with the space in front) to the end target field.

So it should look something like:  

"C:\Program Files\Google\Chrome\Application\chrome_dev.exe" --remote-debugging-port=9222 

You will probably need to either turn off your Firewall or add an exception for this Chrome in your firewall rules, otherwise it will ***probably block the remote debugger***.

To ensure this is working, launch the Chrome with this short cut, and open a command prompt (search command prompt in the Windows Start Menu) then run

netstat -an | find "9222"

This should display a line like

  TCP    127.0.0.1:9222         0.0.0.0:0              LISTENING
  
If it shows nothing, its likely a firewall issue. If it shows a bunch of entries and the program cant connect to chrome when ran, try running the command:  taskkill /f /im chrome.exe

then opening chrome from your shortcut again, or try restarting your PC and make sure you launch the Chrome shortcut with remote debugging ***before*** a regular Chrome instance. If you see a similar line your Chrome is setup correctly.

If you dont want to make a shortcut, or this doesn't make any sense, you could alternatively try launching it like this: https://www.youtube.com/watch?v=LEJX645aeFU&t=3s&ab_channel=AutoTest

### 5. Running it:
Back in your VS Code window, after running npm install, you can run the Application with:

***npm run start:luckyland***    

or

***npm run start:chumba***    

You need to have your remote debugging Chrome window ***opened*** at either chumba or luckyland **_before_** running this command (I run the command when im on the BJ page). Only have **one single window/tab** opened per Casino, having multiple tabs open on the same site will likely mess things up.

### NEW MODE ADDED:
***NEW***
Or If you're feeling crazy, run: ***npm run start:ChadMode***   

ChadMode allows you to play on ***BOTH*** Chumba and LuckyLand at the same time, greatly increasing your hourly wash rate. Just have two chrome tabs opened, with one at Chumba Purple BJ and one at LuckyLand BJ. You'll see two Application Windows open this time, each having the title corresponding to the correct Casino. (If you get a GPU Cache error in the terminal when running this, dont worry about it thats normal)
***END NEW***

And that should be it. I would recommend **resizing the program window so that it sits right below the game window**. I made it so the indicator buttons roughly line up with the button position in the game and match the color. Resize the electron window as you need in order to have the button positions line up correctly.

# Weird Things to Note about Each Site
### Both:
~~For some reason, when you initially connect the program to your Chrome Debugger, it resizes the Chrome Window. After some research, it appears this is a bug with Puppeteer itself (so its not something I can fix sadly), but the quick work around to fix your window is just right click on the window, select Inspect, you should now see DevTools Pop Up. On the very top left of the screen, to the left of "Elements" click the little Laptop/Phone Icon Twice (Toggle device toolbar) or hit "CTRL + SHIFT + M" if you cant find it. That should fix the resolution.~~ Fixed in latest Version 2.0

### Chumba:
Launch the Code while on the main lobby page at Chumba, then open Purple BlackJack. You need to click the Sweeps Coins thing at the top atleast once (so it displays your Balance and Redeemable Balance) for the program to know those values and make the appropriate calculations for analytics.
***NEW*** Added a reminder to the UI if you haven't clicked this when playing

### LuckyLand:
~~After Dealer BlackJack, it displays Hit instead of Repeat.~~ It also doesn't start showing the correct values for Time, Bets Per hour, etc. until two wins. 

Since these are super minor quirks they arent on my radar to fix. The code is pretty rough with a lot of duplications. This is because it was initially designed only for Chumba but LuckyLand had a ***much*** different (shittier) process for how the game works with its state management and network requests and I was too lazy to make the code modular and efficient. Its not an enterprise app or a resume builder, the code does its job and I'm busy working on ***many other important automations that everyone in the group can take advantage of soon***.


# FAQ
### Are you going to make this fully automated for actually clicking the buttons too?
Probably not, I dont view this as worth the risk. Automation breaks TOS and is bannable. While we can ***read*** the data with a ***100% guarantee of that being undetectable***, **_actually interacting with the browser_** will always carry a possiblity of detection (albeit very small one). Given the size of the deposits we are making on these websites this is not worth the risk to save a couple hours of time per week. The hourly profit is at Lawyer/Surgeon levels, dont risk a ban out of greed/laziness.

### If I already memorized the chart is this program useless?
Besides the added benefit of not having to actually play/follow the game (which I find super boring and tedious), since the program ***tracks the game state through network requests*** it has access to the hand data ***before*** your screen animations complete, so **_its guaranteed to speed up your game_** (you will already see the correct action to take before the hands even finish dealing). 

It can also help prevent you from making any mistakes, very useful considering that even a single mistake can heavily effect your sessions RTP and the profitability of this method.

And with the addition of ChadMode, it opens up the opportunities to complete your daily wash simultaneously on both sites without mistakes, greatly reducing the time needed.

### Are you planning any more updates?
Unless a breaking change happens like a site layour change, not at this time. I believe all useful features have been added but am always open to suggestions. ***If*** more 5% Casino's open I will definitely investigate adding support to those but for the time being I believe all goals have been met. Only update I'm currently considering is creating an install video for people that arent good with technology and are struggling with the installation instructions.

### Will you add support for Chumba Green?
I dont see any point in adding this. Play through is slower than Purple and there is not an EV difference between playing multiple small hands versus playing one large hand, plus it has slightly worse RTP. Purple is Goated.

### If you've found any kind of bug, have trouble getting it running, or have an interesting idea to add to it let me know in discord Camheff (@tracer6136)

# Sources For Tables:
Chumba Purple:
https://www.beatingbonuses.com/bjstrategy.php?decks2=6&h17=stand&doubleon2=9to11s&das2=on&peek2=off&surrender2=no&charlie2=no&dsa2=on&resplits2=4&resplitA=0&shuffle=0&bj=3to2&opt2=2&btn2=Generate+Strategy

LuckyLand:
https://www.beatingbonuses.com/bjstrategy.php?decks2=6&h17=hit&doubleon2=any2cards&das2=on&peek2=on&surrender2=no&charlie2=no&resplits2=3&shuffle=0&bj=3to2&opt2=1&btn2=Generate+Strategy

# Sponsorships/Donations

This code is open source and 100% free for anyone to use, but it did take me a lot of effort and I spent a few weeks researching and working on the best way to implement something like this for everyone's benefit while I could have just been doing the 5% method during that time. If you like the software and find it useful and want to show your appreciation the Sponsors button at the top of the Github page is the best way to do so and I would greatly appreciate any support. Im not expecting to make anything off this but any Sponsor money I plan on using in opening my SEP IRA's, and knowing theres people out there enjoy my work enough to be willing to sponsor it would really be a dream come true. I will continue to try my best to continue provide anything useful I create to the group (like my fully-automatic RSA Trade's Profit/Loss tracker for Google Sheets & Gmail coming out very soon).

### OmniTrader Early Access, the Automated RSA CLI

Some of the Sponsorship tiers are also eligible to get **early access to an RSA CLI program** I've been working on called ***OmniTrader***, an Application with the goal of **automate your RSA trading** so you can place your Buy's and Sell's accross ***ALL*** brokers with a ***single command*** (no more pulling over on the side of highways to get last minute trades in). 

Currently it supports TastyTrade and Tradier, with Wells Fargo, Vanguard, and others coming very soon. Its currently an active work in progress and I plan to add just about every broker used for RSA to the Project starting with the slowest and most annoying brokers to trade on being focused first.
