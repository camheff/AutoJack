# AutomaticBlackJack
![Example Screenshot](Software.PNG)
JS app that displays visual indicator for best action to take. Currently supports Chumba Purple BJ and LuckyLand BJ. Uses the logic from the strategy chart and Chrome remote debugger to analyze network requests, track the current Game's State, and displays the optimal action to take for perfect strategy. Also shows some analytics functions at the bottom.

# How does this work?
You just launch your chrome with an extra flag to enable remote debugging. This basically makes the dev tools available to other programs on your computer. I then created a custom program that attaches to your dev tools and reads the network data to keep track of your game state, and then implemented the logic from the strategy charts to display a visual indicator for the appropriate action based on the game state. 

This will not click the actual buttons for you, but you can move the program window directly below the game window and the Optimal Action display should line up with the actual game button, allowing you to play quickly while doing something else like watching youtube.

It also displays other helpful information, like the hands detected, Amount Remaining To Wash, Estimated Wash Per Hour, Etc.

I highly recommend to compare the Dealer/PlayerHands detected to the Actual Game as well as the actual Chart to ensure its all being detected and displayed correctly. I've tested this heavily but its definitely not bug free.


# Instructions
### If you've never touched a line of code before: 
You will need to download a code editor (I personally use VS Code: https://code.visualstudio.com/ ), Node JS: https://nodejs.org/en as well as git: https://gitforwindows.org/

TODO: Come back and Check Above ^

### Clone this project (easiest way is just click the Green Clone Button then "Open with Visual Studio")
Open a VS Code Integrated Terminal after opening the project, and run npm install.

TODO: Might need instructions for configuring VS Code Extensions/Environments/Interpreters?

### Setting up Chrome:
Find or create a shortcut to your Google Chrome, then right click it, select "Properties", and add " --remote-debugging-port=9222" (without the quotes, with the space in front) to the end target field.

So it should look like:  
"C:\Program Files\Google\Chrome\Application\chrome_dev.exe" --remote-debugging-port=9222 

You will probably need to either turn off your Firewall or add an exception for this Chrome in your firewall rules, otherwise it will probably block the remote debugger.

To ensure this is working, launch the Chrome with this short cut, and open a command prompt (search command prompt in the Windows Start Menu) then run

netstat -an | find "9222"

This should display a line like

  TCP    127.0.0.1:9222         0.0.0.0:0              LISTENING
  
If it shows nothing, its likely a firewall issue. If it shows a bunch of entries and you cant connect program instance to it, try restarting your PC and make sure you launch the Chrome with remote debugging before any other Chrome instance. If you see a similar line your Chrome is setup correctly.

### Running it:
Back in your VS Code window, after running npm install, you can run "npm run start:luckyland" or "npm run start:chumba" to launch the program, you need to have a remote debugger window opened at either chumba or luckyland before running the command. Only have one single window opened, at the sites lobby page when launching.

And that should be it. I would recommend resizing the program window so that it sits right below the game window. I made it so the indicator for what action to take roughly lines up with button position in the gamee.

# Weird Things to Note about Each Site
### Both:
For some reason, when you initially connect the program to your Chrome Debugger, it resizes the Chrome Window. After some research, it appears this is a bug with Puppeteer itself (so its not something I can fix sadly), but the quick work around to fix your window is just right click on the window, select Inspect, you should now see DevTools Pop Up. On the very top left of the screen, to the left of "Elements" click the little Laptop/Phone Icon Twice (Toggle device toolbar) or hit "CTRL + SHIFT + M" if you cant find it. That should fix the resolution.

### Chumba:
Launch the Code while on the main lobby page at Chumba, then open Purple BlackJack. You need to click the Sweeps Coins thing at the top atleast once (so it displays your Balance and Redeemable Balance) for the program to know those values and make the appropriate calculations for analytics.

### LuckyLand:
After Dealer BlackJack, it displays Hit instead of Repeat. It also doesn't start showing the correct values for Time, Bets Per hour, etc. until two wins. 

Since these are super minor bugs they are low priority but I will fix them eventually when I get time. The code is also pretty rough with a lot of duplicationss. This is because it was initially designed only for Chumba but LuckyLand had a much different process for how the game works, and adapting the code for both sites was challenging, but now that the code works, it works.

# FAQ
### Are you going to make this fully automated for playing too?
Maybe in the future, but as of now im leaning towards that not being worth the risk. Automation most likely breaks TOS and is bannable. While we can read the data with a 100% guarantee of being undetectable, actually interacting with the browser will always carry a possiblity of detection (albeit very small one). But given the size of the deposit's we're all putting on these sites its a risk im not willing to take.

### If I already memorized the chart is this program useless?
Besides the added benefit of not having to actually play/follow the game (which I find super boring and tedious), since the program tracks the game state through network requests it has access to the hand data before your screen animations complete, so its guaranteed to speed up your game (you will already see the correct action to take before the hands are even finished being dealt). 
It can also prevent making any mistakes, which is useful considering even a single mistake can heavily effect your sessions RTP and the profitability of this method. 

### If you've found any kind of bug, have trouble getting it running, or have an interesting idea to add to it let me know in discord @tracer6136 (Camheff)

# Sources For Tables:
Chumba Purple:
https://www.beatingbonuses.com/bjstrategy.php?decks2=6&h17=stand&doubleon2=9to11s&das2=on&peek2=off&surrender2=no&charlie2=no&dsa2=on&resplits2=4&resplitA=0&shuffle=0&bj=3to2&opt2=2&btn2=Generate+Strategy

LuckyLand:
https://www.beatingbonuses.com/bjstrategy.php?decks2=6&h17=stand&doubleon2=any2cards&das2=on&peek2=ace&surrender2=no&charlie2=no&resplits2=3&shuffle=0&bj=3to2&opt2=1&btn2=Generate+Strategy
