const puppeteer = require('puppeteer');
const axios = require('axios');
const { app, BrowserWindow } = require('electron');
const { enableLogging, log } = require('./logger');

let mainWindow;

const strategy_chart_luckyland = {
    2: {
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        5: 'H',
        6: 'H',
        7: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'H',
        A7: 'Ds',
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
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        5: 'H',
        6: 'H',
        7: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'H',
        A5: 'H',
        A6: 'D',
        A7: 'Ds',
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
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'S',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        5: 'H',
        6: 'H',
        7: 'H',
        17: 'S',
        18: 'S',
        A2: 'H',
        A3: 'H',
        A4: 'D',
        A5: 'D',
        A6: 'D',
        A7: 'Ds',
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
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'S',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        5: 'H',
        6: 'H',
        7: 'H',
        17: 'S',
        18: 'S',
        A2: 'D',
        A3: 'D',
        A4: 'D',
        A5: 'D',
        A6: 'D',
        A7: 'Ds',
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
        8: 'H',
        9: 'D',
        10: 'D',
        11: 'D',
        12: 'S',
        13: 'S',
        14: 'S',
        15: 'S',
        16: 'S',
        5: 'H',
        6: 'H',
        7: 'H',
        17: 'S',
        18: 'S',
        A2: 'D',
        A3: 'D',
        A4: 'D',
        A5: 'D',
        A6: 'D',
        A7: 'Ds',
        A8: 'Ds',
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
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        5: 'H',
        6: 'H',
        7: 'H',
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
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        5: 'H',
        6: 'H',
        7: 'H',
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
        8: 'H',
        9: 'H',
        10: 'D',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        5: 'H',
        6: 'H',
        7: 'H',
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
        8: 'H',
        9: 'H',
        10: 'H',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        5: 'H',
        6: 'H',
        7: 'H',
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
        88: 'P',
        99: 'S',
        20: 'S',
        AA: 'P',
    },
    A: {
        8: 'H',
        9: 'H',
        10: 'H',
        11: 'D',
        12: 'H',
        13: 'H',
        14: 'H',
        15: 'H',
        16: 'H',
        5: 'H',
        6: 'H',
        7: 'H',
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
        88: 'P',
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

    // Finds first hand with isDone set to False (for Luckyland)
    findActiveHand(seats) {
        log('Entering findActiveHand');
        for (let seatIndex = 0; seatIndex < seats.length; seatIndex++) {
            const hands = seats[seatIndex].hands;
            log('seat:', seats[seatIndex]);
            for (let handIndex = 0; handIndex < hands.length; handIndex++) {
                log('hands:', hands[handIndex]);
                if (!hands[handIndex].isDone) {
                    log(
                        'active seatIndex:',
                        seatIndex,
                        ' Hand Index: ',
                        handIndex
                    );
                    log('Leaving findActiveHand');
                    return {
                        activeSeatIndex: seatIndex,
                        activeHandIndex: handIndex,
                    };
                }
            }
        }
        log('Leaving findActiveHand');
        return { activeSeatIndex: null, activeHandIndex: null }; // No active hand found
    }

    updateForLuckyLand(responseBody) {
        log('Entering UpdateForLuckyLand');
        if (responseBody.clientGame && responseBody.finalAction) {
            this.allHandsCompleted = true;
        } else if (responseBody.clientGame) {
            // Game Start
            this.allHandsCompleted = false;
            const clientGame = responseBody.clientGame;
            this.gamePhase = clientGame.gamePhase;
            this.dealerHand = extractCardRank(clientGame.dealer.faceUpCard);
            log('dealerHand: ', this.dealerHand);
            this.playerHands = clientGame.seats.map((seat) =>
                seat.hands.map((hand) => hand.initialCards.map(extractCardRank))
            );

            this.seats = clientGame.seats; // Store the seats structure
            const activeHandInfo = this.findActiveHand(this.seats);
            this.activeSeatIndex = activeHandInfo.activeSeatIndex;
            this.activeHandIndex = activeHandInfo.activeHandIndex;
            if (
                this.activeSeatIndex !== null &&
                this.activeHandIndex !== null
            ) {
                log(
                    'activePlayerHands: ',
                    this.playerHands[this.activeSeatIndex][this.activeHandIndex]
                );
            }
        } else if (responseBody.updatedHand) {
            // Hit, Double, or Stand
            const updatedHand = responseBody.updatedHand;
            const updatedSeatIndex = updatedHand.seatIndex;
            const updatedHandIndex = updatedHand.handIndex;

            // Combine initialCards with resulting cards from actionStack to get the updated cards for the hand
            const updatedCards = [
                ...updatedHand.initialCards.map(extractCardRank),
                ...updatedHand.actionStack
                    .map((action) =>
                        action.resultingCard
                            ? extractCardRank(action.resultingCard)
                            : null
                    )
                    .filter(Boolean), // Ensure the resultingCard exists and filter out null values
            ];

            // Update the specific player's old hand based on seat and hand index
            this.playerHands[updatedSeatIndex][updatedHandIndex] = updatedCards;

            // Update the corresponding seats data
            this.seats[updatedSeatIndex].hands[updatedHandIndex].initialCards =
                updatedHand.initialCards;
            this.seats[updatedSeatIndex].hands[updatedHandIndex].actionStack =
                updatedHand.actionStack;

            if (updatedHand.isDone !== undefined) {
                this.seats[updatedSeatIndex].hands[updatedHandIndex].isDone =
                    updatedHand.isDone;
            }

            // Get new Active Card using the stored seats structure
            const activeHandInfo = this.findActiveHand(this.seats);
            this.activeSeatIndex = activeHandInfo.activeSeatIndex;
            this.activeHandIndex = activeHandInfo.activeHandIndex;
            if (
                this.activeSeatIndex !== null &&
                this.activeHandIndex !== null
            ) {
                log(
                    'activePlayerHands: ',
                    this.playerHands[this.activeSeatIndex][this.activeHandIndex]
                );
            }
        } else if (responseBody.updatedSeat) {
            // Split
            const seatIndex = responseBody.updatedSeat.hands[0].seatIndex; // Get the seat index from one of the new hands

            // Update the seats structure with the new hands after the split, and filter card values
            this.seats[seatIndex].hands = responseBody.updatedSeat.hands.map(
                (hand) => {
                    return {
                        ...hand,
                        initialCards: hand.initialCards.map((card) =>
                            extractCardRank(card)
                        ),
                    };
                }
            );

            // Update the playerHands array with filtered card values
            this.playerHands[seatIndex] = this.seats[seatIndex].hands.map(
                (hand) => hand.initialCards
            );

            // Get new Active Hand using the updated seats structure
            const activeHandInfo = this.findActiveHand(this.seats);
            this.activeSeatIndex = activeHandInfo.activeSeatIndex;
            this.activeHandIndex = activeHandInfo.activeHandIndex;
            if (
                this.activeSeatIndex !== null &&
                this.activeHandIndex !== null
            ) {
                log(
                    'activePlayerHands after split: ',
                    this.playerHands[this.activeSeatIndex][this.activeHandIndex]
                );
            }
        }
        this.optimalAction = getOptimalActionLuckyLand(
            this,
            strategy_chart_luckyland
        );
        log('Optimal Action: ' + this.optimalAction);

        log('Outside functions, values:');
        log('dealerHand: ', this.dealerHand);
        log(
            'activePlayerHands: ',
            this.playerHands[this.activeSeatIndex][this.activeHandIndex]
        );
        log('Leaving UpdateForLuckyLand');
    }
}

function extractCardRank(card) {
    return card.slice(-1);
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('LuckyLand.html');
}

app.disableHardwareAcceleration();
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

function getOptimalActionLuckyLand(gameState, strategyChart) {
    log('Entering getOptimalActionLuckyLand');
    let strategy;

    if (gameState.allHandsCompleted) {
        strategy = 'Repeat';
        const amountPlayedPerHour = gameState.getAmountPlayedPerHour();
        displayOptimalAction(
            strategy,
            0,
            0,
            gameState.sweepsRemaining,
            gameState.amountPlayed,
            amountPlayedPerHour 
        );
    } else {
        const symbolToValue = {
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            T: 10,
            J: 10,
            Q: 10,
            K: 10,
            A: 'A',
        };

        const dealerCard = symbolToValue[gameState.dealerHand];
        log('dealerCard:');
        log(dealerCard);

        // Dealer Black Jack
        if (gameState.dealerHand.length > 1) {
            return 'Repeat';
        }

        const playerHand =
            gameState.playerHands[gameState.activeSeatIndex][
                gameState.activeHandIndex
            ];
        log('playerHand:');
        log(playerHand);

        // convert the player's hand to a key that can be used to lookup the strategy chart
        const playerKey = getPlayerKeyLuckyLand(playerHand);

        // get the optimal strategy for the player's current hand against the dealer's face-up card
        strategy = strategyChart[dealerCard][playerKey];

        // If strategy is 'Double else Stand' and player doesn't have exactly 2 cards, update strategy to Stand
        if (strategy === 'Ds' && playerHand.length !== 2) {
            strategy = 'S';
        } else if (strategy === 'Ds' && playerHand.length == 2) {
            strategy = 'D';
        } else

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
    }
    log('Leaving getOptimalActionLuckyLand');
    return strategy;
}

function getPlayerKeyLuckyLand(hand) {
    log('Entering getPlayerKeyLuckyLand');
    const symbolToValue = {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        T: 10,
        J: 10,
        Q: 10,
        K: 10,
        A: 1,
    };
    const values = hand.map((card) => symbolToValue[card]);
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
    } else if (values.includes(1)) {
        const sum = values.reduce((a, b) => a + b, 0) - 1; // subtract Ace's value
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
    log('Leaving getPlayerKeyLuckyLand');
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
    const targetPage = pages.find((page) => page.url().includes('luckyland'));
    log('connected');
    if (!targetPage) {
        throw new Error('Target page not found');
    }

    // Fix the viewport resizing bug from Puppeteer by toggling it on and off
    const client = await targetPage.target().createCDPSession();
    await client.send('Emulation.setDeviceMetricsOverride', {
        width: 800, 
        height: 600,
        deviceScaleFactor: 1,
        mobile: true,
    });
    await client.send('Emulation.clearDeviceMetricsOverride');

    targetPage.on('response', async (response) => {
        if (
            response.url().includes('blackjack.llc.prod.vgw-us.com') &&
            (response.request().resourceType() === 'fetch' ||
                response.request().resourceType() === 'xhr') &&
            (response.url().includes('hit') ||
                response.url().includes('stand') ||
                response.url().includes('double') ||
                response.url().includes('split') ||
                response.url().includes('deal') ||
                response.url().includes('init') ||
                response.url().includes('resolve') ||
                response.url().includes('games'))
        ) {
            log('NEW Luckyland Response:', response.url());
            const text = await response.text();

            const responseBody = JSON.parse(text);
            log('Luckyland Response body:');
            log(responseBody);
            if (
                response.url().includes('resolve') &&
                responseBody.balanceUpdates[1]
            ) {
                log('Updating Luckyland Balances');
                log(
                    'responseBody.balanceUpdates[1].new_balance:',
                    responseBody.balanceUpdates[1].new_balance
                );
                log(
                    'responseBody.balanceUpdates[1].new_balance:',
                    responseBody.balanceUpdates[0].new_balance
                );
                gameState.updateBal(
                    responseBody.balanceUpdates[1].new_balance -
                        responseBody.balanceUpdates[0].new_balance
                );
                log('Amount Played:', gameState.amountPlayed);
                log(
                    'Amount Played Per Hour:',
                    gameState.getAmountPlayedPerHour()
                );
            }
            gameState.updateForLuckyLand(responseBody);
        }
    });
}