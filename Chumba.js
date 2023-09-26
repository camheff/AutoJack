const puppeteer = require('puppeteer');
const axios = require('axios');
const { app, BrowserWindow } = require('electron');
const { enableLogging, log } = require('./logger');

let mainWindow;

const strategy_chart = {
    2: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'S',
        A8: 'S',
        A9: 'S',
        22: 'P',
        33: 'P',
        44: 'H',
        55: 'D',
        66: 'P',
        77: 'P',
        88: 'P',
        99: 'P',
        20: 'S',
        AA: 'P',
    },
    3: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'S',
        A8: 'S',
        A9: 'S',
        22: 'P',
        33: 'P',
        44: 'H',
        55: 'D',
        66: 'P',
        77: 'P',
        88: 'P',
        99: 'P',
        20: 'S',
        AA: 'P',
    },
    4: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'S',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'S',
        A8: 'S',
        A9: 'S',
        22: 'P',
        33: 'P',
        44: 'H',
        55: 'D',
        66: 'P',
        77: 'P',
        88: 'P',
        99: 'P',
        20: 'S',
        AA: 'P',
    },
    5: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'S',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'S',
        A8: 'S',
        A9: 'S',
        22: 'P',
        33: 'P',
        44: 'P',
        55: 'D',
        66: 'P',
        77: 'P',
        88: 'P',
        99: 'P',
        20: 'S',
        AA: 'P',
    },
    6: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'S',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'S',
        A8: 'S',
        A9: 'S',
        22: 'P',
        33: 'P',
        44: 'P',
        55: 'D',
        66: 'P',
        77: 'P',
        88: 'P',
        99: 'P',
        20: 'S',
        AA: 'P',
    },
    7: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'S',
        A8: 'S',
        A9: 'S',
        22: 'P',
        33: 'P',
        44: 'H',
        55: 'D',
        66: 'H',
        77: 'P',
        88: 'P',
        99: 'S',
        20: 'S',
        AA: 'P',
    },
    8: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'S',
        A8: 'S',
        A9: 'S',
        22: 'H',
        33: 'H',
        44: 'H',
        55: 'D',
        66: 'H',
        77: 'H',
        88: 'P',
        99: 'P',
        20: 'S',
        AA: 'P',
    },
    9: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'H',
        A8: 'S',
        A9: 'S',
        22: 'H',
        33: 'H',
        44: 'H',
        55: 'D',
        66: 'H',
        77: 'H',
        88: 'P',
        99: 'P',
        20: 'S',
        AA: 'P',
    },
    10: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'H',
        10: 'H',
        11: 'H',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'H',
        A8: 'S',
        A9: 'S',
        22: 'H',
        33: 'H',
        44: 'H',
        55: 'H',
        66: 'H',
        77: 'H',
        88: 'H',
        99: 'S',
        20: 'S',
        AA: 'P',
    },
    A: {
        5: 'H',
        6: 'H',
        7: 'H',
        8: 'H',
        9: 'H',
        10: 'H',
        11: 'H',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'H',
        A8: 'S',
        A9: 'S',
        22: 'H',
        33: 'H',
        44: 'H',
        55: 'H',
        66: 'H',
        77: 'H',
        88: 'H',
        99: 'S',
        20: 'S',
        AA: 'P',
    },
};

class GameState {
    constructor() {
        this.dealerHand = [];
        this.playerHands = [];
        this.activeHandIndex = 0;
        this.currentBet = 0;
        this.allHandsCompleted = false;
        this.optimalAction = null;
        this.sweepsRemaining = 0;
        this.startTime = null; // To track when we started tracking
        this.startBalance = 0; // To save the initial balance
        this.amountPlayed = 0; // To save the total delta in the balance over time
        this.gamePhase = null; // For LuckyLand
        this.seats = [];
    }

    updateForChumba(playOutcome) {
        this.dealerHand = playOutcome.dealerHand.cards;
        this.playerHands = playOutcome.playerHands
            .sort((a, b) => a.handIndex - b.handIndex)
            .map((hand) => hand.hand.cards);
        this.activeHandIndex = playOutcome.playerHands.findIndex(
            (hand) =>
                hand.handIndex ===
                Math.min(
                    ...playOutcome.playerHands
                        .filter(
                            (hand) =>
                                hand.actions.hit ||
                                hand.actions.stand ||
                                hand.actions.double ||
                                hand.actions.split
                        )
                        .map((hand) => hand.handIndex)
                )
        );
        log('ActiveIndex:' + this.activeHandIndex);
        this.currentBet = playOutcome.bet;
        this.allHandsCompleted = playOutcome.allHandsCompleted;
        if (playOutcome.allHandsCompleted) {
            this.sweepsRemaining = this.sweepsRemaining - playOutcome.bet;
            this.amountPlayed = this.amountPlayed + playOutcome.bet;
        }
        this.optimalAction = getOptimalAction(this, strategy_chart);
        log('Optimal Action: ' + this.optimalAction);
    }

    updateBal(sweepsRemaining) {
        if (this.startTime === null) {
            this.startTime = Date.now();
        } else {
            let delta = this.sweepsRemaining - sweepsRemaining;
            this.amountPlayed += delta;
            this.startBalance = sweepsRemaining;
        }
        this.sweepsRemaining = sweepsRemaining;
    }

    getAmountPlayedPerHour() {
        const elapsedTime = Date.now() - this.startTime;
        const hoursElapsed = elapsedTime / (1000 * 60 * 60);
        return this.amountPlayed / hoursElapsed;
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('Chumba.html');
}

app.whenReady().then(createWindow).then(run);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

function displayOptimalAction(
    optimalAction,
    dealerCard,
    playerKey,
    sweepsRemaining,
    amountPlayed,
    amountPlayedPerHour
) {
    mainWindow.webContents.send('optimalAction', {
        optimalAction,
        dealerCard,
        playerKey,
        sweepsRemaining,
        amountPlayed,
        amountPlayedPerHour,
    });
}

function getOptimalAction(gameState, strategyChart) {
    const symbolToValue = {
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        NINE: 9,
        TEN: 10,
        JACK: 10,
        QUEEN: 10,
        KING: 10,
        ACE: 'A',
    };

    let strategy;
    if (!gameState.allHandsCompleted) {
        const dealerCardSymbol = gameState.dealerHand[0].symbol;
        const dealerCard = symbolToValue[dealerCardSymbol];
        log('dealerCard:');
        log(dealerCard);
        const playerHand = gameState.playerHands[gameState.activeHandIndex];
        log('playerHand:');
        log(playerHand);

        // convert the player's hand to a key that can be used to lookup the strategy chart
        const playerKey = getPlayerKey(playerHand);

        // get the optimal strategy for the player's current hand against the dealer's face-up card
        strategy = strategyChart[dealerCard][playerKey];

        // Always stand above 17
        if (
            !strategy &&
            (playerKey == 18 ||
                playerKey == 19 ||
                playerKey == 20 ||
                playerKey == 21)
        ) {
            strategy = 'S';
        }
        const amountPlayedPerHour = gameState.getAmountPlayedPerHour();
        displayOptimalAction(
            strategy,
            dealerCard,
            playerKey,
            gameState.sweepsRemaining,
            gameState.amountPlayed,
            amountPlayedPerHour
        );
    } else {
        strategy = 'Repeat';
        const amountPlayedPerHour = gameState.getAmountPlayedPerHour();
        displayOptimalAction(strategy, 0, 0, gameState.sweepsRemaining, gameState.amountPlayed, amountPlayedPerHour);
    }
    return strategy;
}

function getPlayerKey(hand) {
    const symbolToValue = {
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        NINE: 9,
        TEN: 10,
        JACK: 10,
        QUEEN: 10,
        KING: 10,
        ACE: 1,
    };

    const values = hand.map((card) => symbolToValue[card.symbol]);
    log('GetPlayerKey');
    log(values);
    let key = '';

    // Check for pair
    if (values.length === 2 && values[0] === values[1] && values[0] !== 10) {
        log('Pair');
        key = values[0].toString() + values[1].toString();
        if (key == 11) {
            key = 'AA';
        }
        log(key);
    }

    // Check for Ace and move it to the front and sum other cards
    else if (values.includes(1)) {
        const sum = values.reduce((a, b) => a + b, 0) - 1; // subtract Ace
        if (sum < 11) {
            // Soft total
            key = 'A' + sum;
        } else {
            // Hard total
            key = sum + 1;
        }
        log('Aces');
        log(key);
    }

    // Otherwise convert to hard total
    else {
        const sum = values.reduce((a, b) => a + b, 0);
        key = sum.toString();
        log('Hard');
        log(key);
    }

    return key;
}

async function run() {
    const gameState = new GameState();

    // Get webSocketDebuggerUrl
    const response = await axios.get('http://127.0.0.1:9222/json/version');
    const webSocketDebuggerUrl = response.data.webSocketDebuggerUrl;

    const browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
    });

    log('connecting');
    const pages = await browser.pages();
    const targetPage = pages.find((page) => page.url().includes('chumba'));
    log('connected');
    if (!targetPage) {
        throw new Error('Target page not found');
    }

    targetPage.on('response', async (response) => {
        // Chumba Requests
        if (
            response.url().includes('blackjack') &&
            response.url().includes('play.chumbacasino.com') &&
            response.request().resourceType() === 'xhr' &&
            (response.url().includes('hit') ||
                response.url().includes('stand') ||
                response.url().includes('double') ||
                response.url().includes('split') ||
                response.url().includes('deal') ||
                response.url().includes('init'))
        ) {
            log('Chumba Response:', response.url());
            const text = await response.text();
            log('Chumba Response Body:', text);

            const responseBody = JSON.parse(text);
            if (responseBody.playOutcome) {
                gameState.updateForChumba(responseBody.playOutcome);
                log('Updated Game State For Chumba:', gameState);
                log('Updated gamestate.playerHands');
                gameState.playerHands.forEach((hand) => log(hand));
            } else if (responseBody.restoringObject) {
                gameState.updateForChumba(responseBody.restoringObject);
                log('Restoring Game State For Chumba:', gameState);
                log('Restoring gamestate.playerHands');
                gameState.playerHands.forEach((hand) => log(hand));
            }
        }
        if (
            response
                .url()
                .includes('api.prod.chumbacasino.com/player-token/v1/amounts/')
        ) {
            log('Chumba update bal');
            const text = await response.text();
            const responseBody = JSON.parse(text);
            gameState.updateBal(responseBody.sweepsCoins.amount);
        }
    });
}