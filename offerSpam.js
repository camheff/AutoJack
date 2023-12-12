const puppeteer = require('puppeteer-extra');
const ghostCursor = require('ghost-cursor');
const { createCursor, getRandomPagePoint, installMouseHelper } = ghostCursor;

const axios = require('axios');

/**
 * Delays the execution of a function for a random amount of time between a minimum and maximum value.
 *  @param {number} [min=500] - The minimum delay time in milliseconds.
 *  @param {number} [max=1500] - The maximum delay time in milliseconds.
 *  @returns {number} - Returns a random delay amount between 50 to 150 unless params are specified.
 */
function getRandomDelay(min = 50, max = 150) {
    return Math.random() * (max - min) + min;
}

/**
 * Delays the execution of a function for a random amount of time between a minimum and maximum value.
 * @async
 * @param {} params - description of parameters
 * @param {number} [min=500] - The minimum delay time in milliseconds.
 * @param {number} [max=1500] - The maximum delay time in milliseconds.
 * @returns {Promise<void>} - A Promise that resolves after the delay time has passed.
 */
async function randomDelay(min = 500, max = 1500) {
    const delay = Math.random() * (max - min) + min;
    await new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Pulsz Offer Spam Function.
 * NOTE: You must run this with a chrome browser that ONLY has a tab open at
 * pulsz.com/store
 * You must also have Skrill connected to your Pulsz and have the Merchant & Device set as trusted.
 * It will open tabs equal to the number of packages you want to buy, setup Skrill,
 * then click all the tabs at once to buy the packages simultaneously. I've tested it up to 30 tabs
 * so far but it can likely do around 50-70.
 */
async function offerSpam() {
    console.log('Starting Offer Spammer');

    console.log('Attempting to grab webSocketDebuggerUrl');
    const response = await axios.get('http://127.0.0.1:9222/json/version');
    const webSocketDebuggerUrl = response.data.webSocketDebuggerUrl;
    if (!webSocketDebuggerUrl) {
        throw new Error('webSocketDebuggerUrl not found');
    }
    console.log('Successfully got the webSocketDebuggerUrl');

    console.log('Connecting to browser');
    const browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
        defaultViewport: null,
        slowMo: 0,
    });
    const pages = await browser.pages();
    const targetPage = pages.find((page) =>
        page.url().includes('https://www.pulsz.com/store')
    );
    console.log('Connected');
    if (!targetPage) {
        throw new Error('Target page not found');
    }
    let cursor = await createCursor(
        targetPage,
        await getRandomPagePoint(targetPage),
        false
    );
    await installMouseHelper(targetPage);

    // Prepare the first tab
    console.log('Preparing the inital Page');
    await prepareTab(targetPage, cursor, false); // false indicates this is the first tab
    await randomDelay(10000, 11000);

    console.log('Opening New Tabs');
    const tabs = [];

    // Determines number to buy
    // CHANGE THIS TO THE NUMBER YOU WANT (Minus one)
    let numberOfPackagesToBuy = 29;

    for (let i = 1; i <= numberOfPackagesToBuy; i++) {
        await randomDelay(500, 800);
        const newPage = await browser.newPage();
        await randomDelay(500, 800);
        let newCursor = await createCursor(
            newPage,
            await getRandomPagePoint(newPage),
            false
        );
        await randomDelay(500, 800);
        tabs.push({ page: newPage, cursor: newCursor });
        await prepareTab(newPage, newCursor, true);
        console.log('Opened Tab ' + i);
        console.log('Waiting 10 seconds for next tab');
        await randomDelay(10000, 10500);
    }

    // Re-fetch all open pages
    const allPages = await browser.pages();
    const skrillTabs = allPages.filter((page) =>
        page.url().includes('pay.skrill.com')
    );

    console.log('Found Skrill Tabs: ' + skrillTabs.length);
    // Now use all the skrillTabs to hover the mouse over
    // "//button[@class='pay-with-balance-button ps-flat-button ps-primary ps-button-base ps-block-button']"
    for (let i = 0; i < skrillTabs.length; i++) {
        const page = skrillTabs[i];
        await page.bringToFront();
        await randomDelay();

        console.log('Interacting with tab ' + i);

        // Pay with balance button
        const payWithBalanceButtons = await page.$x('(//button)[5]');
        if (payWithBalanceButtons.length > 0) {
            console.log('Clicking Pay with Balance Button');
            await payWithBalanceButtons[0].click();
            console.log('Clicked Pay with Balance Button on tab ' + i);
        } else {
            console.log('Pay with Balance Button not found for tab ' + i);
        }
        await randomDelay();

        // THIS IS THE SELECTOR TO ACTUALLY PURCHASE IT
        const confirmButtons = await page.$x(
            "//span[normalize-space()='Confirm']"
        );

        if (confirmButtons.length > 0) {
            const boundingBox = await confirmButtons[0].boundingBox();
            const centerX = boundingBox.x + boundingBox.width / 2;
            const centerY = boundingBox.y + boundingBox.height / 2;
            await page.mouse.move(centerX, centerY);
            console.log('Hovering over Confirm Button on tab ' + i);
        } else {
            console.log('Pay with Confirm Button not found for tab ' + i);
        }
    }

    console.log('All tabs are in position, clicking them all at once');
    // Now we should have all the tabs with the mouse down on the button
    // Now just do mouse up
    for (let i = 0; i < skrillTabs.length; i++) {
        const page = skrillTabs[i];
        await page.bringToFront();
        await randomDelay(3, 8);
        await page.mouse.down();
        console.log('Mouse down on tab ' + i);
        await page.mouse.up();
        console.log('Mouse up on tab ' + i);
    }
}

/**
 * @param {} params - description of parameters
 * @param {import('puppeteer').Page} page
 * @param {import("ghost-cursor").GhostCursor} cursor
 * @param {boolean} isAdditionalTab - False if initial Page
 * @returns {Promise<void>} - description of return value
 */
async function prepareTab(page, cursor, isAdditionalTab) {
    // This one simply gets the Skrill Tabs made
    if (isAdditionalTab) {
        await randomDelay();
        await page.goto('https://www.pulsz.com/store');
        await randomDelay();
    }

    // Click the "Buy Package" button

    // IF YOUR OFFER IS A POPUP, SET THIS TO TRUE
    // Otherwise, UPDATE THE PRICE BELOW to the correct price
    // Of the package you want to buy
    let offerIsPopup = false;
    if (offerIsPopup) {
        await cursor.click(
            "//body/div[@role='presentation']/div/div[@role='button']/div/button[1]//following::button",
            { delay: getRandomDelay() }
        );
    } else {
        // CHANGE THIS TO THE PRICE OF THE PACKAGE YOU WANT TO BUY
        // If your offer is NOT a popup
        await cursor.click("//button[normalize-space()='$23.99']", {
            delay: getRandomDelay(),
        });
    }

    await randomDelay();

    // Click the "Buy with Skrill" button
    const initialTabCount = (await page.browser().pages()).length;
    await cursor.click(
        "//div[@data-test='payment-button-Buy with Skrill']//button",
        { delay: getRandomDelay() }
    );
    await randomDelay();
    console.log('Clicked Buy with Skrill Button');
    // Check if a new tab has been opened within 5-8 seconds
    try {
        await page.waitForFunction(
            `window.openedTabsCount !== ${initialTabCount}`,
            { timeout: 8000 }
        );
    } catch (e) {
        // If the new tab hasn't opened, try clicking the button again
        await cursor.click(
            "//div[@data-test='payment-button-Buy with Skrill']//button",
            { delay: getRandomDelay() }
        );
    }
    // Additional delay to ensure the new tab is fully loaded
    await randomDelay(2000);
}

async function offerSpamRecover() {
    // If Skrill Tabs are already opened
    // Dont use this right now, haven't tested it in a while
    console.log('Starting Offer Spammer');

    console.log('Attempting to grab webSocketDebuggerUrl');
    const response = await axios.get('http://127.0.0.1:9222/json/version');
    const webSocketDebuggerUrl = response.data.webSocketDebuggerUrl;
    if (!webSocketDebuggerUrl) {
        throw new Error('webSocketDebuggerUrl not found');
    }
    console.log('Successfully got the webSocketDebuggerUrl');

    console.log('Connecting to browser');
    const browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
        defaultViewport: null,
        slowMo: 0,
    });
    const allPages = await browser.pages();
    const skrillTabs = allPages.filter((page) =>
        page.url().includes('pay.skrill.com')
    );

    console.log('Found Skrill Tabs: ' + skrillTabs.length);
    // Now use all the skrillTabs to hover the mouse over
    // "//button[@class='pay-with-balance-button ps-flat-button ps-primary ps-button-base ps-block-button']"
    for (let i = 0; i < skrillTabs.length; i++) {
        const page = skrillTabs[i];
        await page.bringToFront();
        await randomDelay();

        console.log('Interacting with tab ' + i);

        // Pay with balance button
        const payWithBalanceButtons = await page.$x('(//button)[5]');
        if (payWithBalanceButtons.length > 0) {
            console.log('Clicking Pay with Balance Button');
            await payWithBalanceButtons[0].click();
            console.log('Clicked Pay with Balance Button on tab' + i);
        } else {
            console.log('Pay with Balance Button not found for tab ' + i);
        }
        await randomDelay();

        // THIS BUYS IT
        const confirmButtons = await page.$x(
            "//span[normalize-space()='Confirm']"
        );

        if (confirmButtons.length > 0) {
            const boundingBox = await confirmButtons[0].boundingBox();
            const centerX = boundingBox.x + boundingBox.width / 2;
            const centerY = boundingBox.y + boundingBox.height / 2;
            await page.mouse.move(centerX, centerY);
            console.log('Hovering over Confirm Button on tab ' + i);
        } else {
            console.log('Confirm Button not found for tab ' + i);
        }
    }
    console.log('All tabs are in position, now clicking them all at once');
    // Now we should have all the tabs with the mouse down on the button
    // Now just do mouse up
    for (let i = 0; i < skrillTabs.length; i++) {
        const page = skrillTabs[i];
        await page.bringToFront();
        await randomDelay(3, 8);
        await page.mouse.down();
        console.log('Mouse down on tab ' + i);
        await page.mouse.up();
        console.log('Mouse up on tab ' + i);
    }
}

offerSpam();
// offerSpamRecover();
