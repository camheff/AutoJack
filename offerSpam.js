const puppeteer = require('puppeteer-extra');
const ghostCursor = require('ghost-cursor');
const { createCursor, getRandomPagePoint, installMouseHelper } = ghostCursor;
const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');

const clickOptions = {
    waitForClick: 500, // Specific to ClickOptions
    waitForSelector: 15000, // From MoveOptions, but applicable here
    maxTries: 3, // From MoveOptions, but applicable here
    paddingPercentage: 40,
    moveSpeed: 100,
};

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
    //console.log('Preparing the inital Page');
    //await prepareTabSkrill(targetPage, cursor, false); // false indicates this is the first tab
    //await randomDelay(10000, 11000);

    //console.log('Opening New Tabs');
    const tabs = [];
    // here I need some kind of data structure that holds a cards last four and its CVV
    //let cardsArray = [];

    // Have the if's create and setup the tabs so they select the card
    // Then re-fetch all pulsz tabs, assign them to ccTabs array, and position the mouse over the button
    // then at the end (after skrill), loop through ccTabs array and skrillTabsArray and do the click.
    const packagePrice = process.env.PACKAGE_PRICE;
    let numberOfPackagesToBuyCardOne = parseInt(
        process.env.NUMBER_OF_PACKAGES_TO_BUY_CARD_ONE
    );
    if (numberOfPackagesToBuyCardOne > 0) {
        console.log(
            'Buying ' + numberOfPackagesToBuyCardOne + ' packages on card one'
        );
        let cardOneLastFour = process.env.CARD_ONE_LAST_FOUR;
        let cardOneCVV = process.env.CARD_ONE_CVV;
        for (let i = 0; i <= numberOfPackagesToBuyCardOne; i++) {
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
            console.log('Creating tab ' + i);
            await prepareTabCC(
                newPage,
                newCursor,
                cardOneLastFour,
                cardOneCVV,
                '1',
                packagePrice
            );
            console.log('Created Card One Tab ' + i);
            console.log('Waiting 10 seconds for next tab');
            await randomDelay(10000, 10500);
        }
        console.log('Done opening Card One Tabs');
    }

    let numberOfPackagesToBuyCardTwo = parseInt(
        process.env.NUMBER_OF_PACKAGES_TO_BUY_CARD_TWO
    );
    if (numberOfPackagesToBuyCardTwo > 0) {
        console.log(
            'Buying ' + numberOfPackagesToBuyCardTwo + ' packages on card two'
        );
        let cardTwoLastFour = process.env.CARD_TWO_LAST_FOUR;
        let cardTwoCVV = process.env.CARD_TWO_CVV;
        for (let i = 0; i <= numberOfPackagesToBuyCardTwo; i++) {
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
            await prepareTabCC(
                newPage,
                newCursor,
                cardTwoLastFour,
                cardTwoCVV,
                '2',
                packagePrice
            );
            console.log('Opened Card Two Tab ' + i);
            console.log('Waiting 10 seconds for next tab');
            await randomDelay(10000, 10500);
        }
        console.log('Done opening Card Two Tabs');
    }

    let numberOfPackagesToBuyCardThree = parseInt(
        process.env.NUMBER_OF_PACKAGES_TO_BUY_CARD_THREE
    );
    if (numberOfPackagesToBuyCardThree > 0) {
        console.log(
            'Buying ' +
                numberOfPackagesToBuyCardThree +
                ' packages on card three'
        );
        let cardThreeLastFour = process.env.CARD_THREE_LAST_FOUR;
        let cardThreeCVV = process.env.CARD_THREE_CVV;
        for (let i = 0; i <= numberOfPackagesToBuyCardThree; i++) {
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
            await prepareTabCC(
                newPage,
                newCursor,
                cardThreeLastFour,
                cardThreeCVV,
                '3',
                packagePrice
            );
            console.log('Opened Card Three Tab ' + i);
            console.log('Waiting 10 seconds for next tab');
            await randomDelay(10000, 10500);
        }
        console.log('Done opening Card Three Tabs');
    }

    let numberOfPackagesToBuyCardFour = parseInt(
        process.env.NUMBER_OF_PACKAGES_TO_BUY_CARD_FOUR
    );
    if (numberOfPackagesToBuyCardFour > 0) {
        console.log(
            'Buying ' + numberOfPackagesToBuyCardFour + ' packages on card four'
        );
        let cardFourLastFour = process.env.CARD_FOUR_LAST_FOUR;
        let cardFourCVV = process.env.CARD_FOUR_CVV;
        for (let i = 0; i <= numberOfPackagesToBuyCardFour; i++) {
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
            await prepareTabCC(
                newPage,
                newCursor,
                cardFourLastFour,
                cardFourCVV,
                '4',
                packagePrice
            );
            console.log('Opened Card Four Tab ' + i);
            console.log('Waiting 10 seconds for next tab');
            await randomDelay(10000, 10500);
        }
        console.log('Done opening Card Four Tabs');
    }

    // Now we have all the tabs open, we need to re-fetch all the tabs
    // and position the mouse over the button
    // Then at the end, loop through all the tabs and click them all at once

    // Close targetPage since its the initial page and we didnt initialize it
    // Only close it if atleast one credit card tab was opened
    if (tabs.length > 0) {
        await targetPage.close();
    }

    const allPagesCC = await browser.pages();
    const ccTabs = allPagesCC.filter((page) =>
        page.url().includes('https://www.pulsz.com/store')
    );

    if (ccTabs.length > 0) {
        console.log('Found CC Tabs: ' + ccTabs.length);
        // Now use all the ccTabs to hover the mouse over
        for (let i = 0; i < ccTabs.length; i++) {
            const page = ccTabs[i];
            await page.bringToFront();
            await randomDelay();

            console.log('Interacting with CC tab ' + i);

            // THIS IS THE SELECTOR TO ACTUALLY PURCHASE IT
            const confirmButtons = await page.$x("//button[@type='submit']");

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
        console.log('All CC tabs are in position');
    }

    // At this point CC tabs are in position
    // Since we setup CC tabs first, we can now reliably grab
    // All the Pulsz Tabs without accidentally grabbing tabs that
    // Are being used for Skrill too.

    // Initializes Skrill Tabs
    let numberOfPackagesToBuySkrill = parseInt(
        process.env.NUMBER_OF_PACKAGES_TO_BUY_SKRILL
    );
    if (numberOfPackagesToBuySkrill > 0) {
        console.log(
            'Buying ' + numberOfPackagesToBuySkrill + ' packages on skrill'
        );
        // Might need to do i = 0 since were skipping the original tab now?
        for (let i = 0; i <= numberOfPackagesToBuySkrill; i++) {
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
            await prepareTabSkrill(newPage, newCursor, packagePrice);
            console.log('Opened Tab ' + i);
            console.log('Waiting 8 seconds for next tab');
            await randomDelay(8000, 8500);
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
        console.log('All Skrill tabs are in position');

        //console.log('All tabs are in position, clicking them all at once');
        //// Now we should have all the tabs with the mouse down on the button
        //// Now just do mouse up
        //for (let i = 0; i < skrillTabs.length; i++) {
        //    const page = skrillTabs[i];
        //    await page.bringToFront();
        //    await randomDelay(3, 8);
        //    await page.mouse.down();
        //    console.log('Mouse down on tab ' + i);
        //    await page.mouse.up();
        //    console.log('Mouse up on tab ' + i);
        //}
    }

    // Re-fetch all open pages to grab skrill tabs
    const allPagesSkrill = await browser.pages();
    const skrillTabs = allPagesSkrill.filter((page) =>
        page.url().includes('pay.skrill.com')
    );

    // ccTabs contains all the tabs that are used for credit cards
    // skrillTabs contains all the tabs that are used for skrill
    // All tabs are now in position, now click them all at once

    console.log('Waiting 5 seconds before clicking all tabs');
    await randomDelay(5000, 5100);
    console.log('Clicking all tabs');

    if (skrillTabs.length > 0) {
        console.log('Clicking Skrill Tabs');
        for (let i = 0; i < skrillTabs.length; i++) {
            const page = skrillTabs[i];
            await page.bringToFront();
            await randomDelay(3, 8);
            await page.mouse.down();
            console.log('Mouse down on Skrill tab ' + i);
            await page.mouse.up();
            console.log('Mouse up on Skrill tab ' + i);
        }
        console.log('All Skrill tabs clicked');
    }

    if (ccTabs.length > 0) {
        console.log('Clicking CC Tabs');
        for (let i = 0; i < ccTabs.length; i++) {
            const page = ccTabs[i];
            await page.bringToFront();
            await randomDelay(3, 8);
            await page.mouse.down();
            console.log('Mouse down on CC tab ' + i);
            await page.mouse.up();
            console.log('Mouse up on CC tab ' + i);
        }
        console.log('All CC tabs clicked');
    }
    console.log('Done!');
}

/**
 * @param {} params - description of parameters
 * @param {import('puppeteer').Page} page
 * @param {import("ghost-cursor").GhostCursor} cursor
 * @param {string} lastFour - Last four of the card
 * @param {string} cvv - Cvv of the card
 * @param {string} cardRow - Row the Card is displayed on Pulsz
 * @param {string} price - Optional, only needed if its not a popup
 * @returns {Promise<void>} - description of return value
 */
async function prepareTabCC(page, cursor, lastFour, cvv, cardRow, price = '') {
    await randomDelay();
    await page.goto('https://www.pulsz.com/store');
    await randomDelay();

    // Click the "Buy Package" button
    // If price is empty, then its a popup offer
    // Click it, else click the price
    try {
        const popupCloseButtons = await page.$x(
            "//button[@data-test='close-modal-button']"
        );
        if (popupCloseButtons.length > 0) {
            console.log('Clicking popup close button');
            await cursor.click(popupCloseButtons[0], clickOptions);
            console.log('Clicked popup close button');
        }
        await randomDelay();
    } catch (err) {
        console.log('Error clicking popup close button: ', err);
    }

    // priceSelector should look like:
    // "//button[normalize-space()='$23.99']"
    console.log('Clicking Buy Package Button');
    let priceSelector = "//button[normalize-space()='" + price + "']";
    await cursor.click(priceSelector, clickOptions);
    console.log('Clicked Buy Package Button');

    await randomDelay();
    // Click buy with card
    await cursor.click(
        "//div[@data-test='payment-button-Buy with Card']//button",
        clickOptions
    );
    console.log('Clicked Buy with Card Button');

    // Click add or change card
    await cursor.click(
        "//p[normalize-space()='Add or Change Card']",
        clickOptions
    );
    await randomDelay();
    console.log('Clicked Add or Change Card Button');

    // Click the card
    let cardSelector =
        "//p[normalize-space()='**** **** **** " + lastFour + "']";
    await cursor.click(cardSelector, clickOptions);
    console.log('Clicked Card');

    let selectButtonSelector =
        "(//span[contains(text(),'Select')])[" + cardRow + ']';
    await cursor.click(selectButtonSelector, clickOptions);
    console.log('Clicked Select Button');
    // The Pay button has selector //button[@type='submit']
    // Its now visible here
    // Do a quick check if //input[@name='code'] exists
    // On the page, if not continue. If it does, input to it
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    const [cvvInputExists] = await Promise.race([
        page.$x("//input[@name='code']"),
        delay(1000).then(() => []),
    ]);
    if (cvvInputExists) {
        await cursor.click("//input[@name='code']", clickOptions);
        await page.keyboard.type(cvv, { delay: getRandomDelay() });
        console.log('Entered CVV');
    }
}

/**
 * @param {} params - description of parameters
 * @param {import('puppeteer').Page} page
 * @param {import("ghost-cursor").GhostCursor} cursor
 * @param {string} price - Optional, only needed if its not a popup
 * @returns {Promise<void>} - description of return value
 */
async function prepareTabSkrill(page, cursor, price = '') {
    await randomDelay();
    await page.goto('https://www.pulsz.com/store');
    await randomDelay();

    // Click the "Buy Package" button
    // If price is empty, then its a popup offer
    // Click it, else click the price
    if (price === '') {
        await cursor.click(
            "//body/div[@role='presentation']/div/div[@role='button']/div/button[1]//following::button",
            { delay: getRandomDelay() }
        );
    } else {
        // priceSelector should look like:
        // "//button[normalize-space()='$23.99']"
        try {
            const popupCloseButtons = await page.$x(
                "//button[@data-test='close-modal-button']"
            );
            if (popupCloseButtons.length > 0) {
                console.log('Clicking popup close button');
                await cursor.click(popupCloseButtons[0], clickOptions);
                console.log('Clicked popup close button');
            }
            await randomDelay();
        } catch (err) {
            console.log('Error clicking popup close button: ', err);
        }
        console.log('Clicking Buy Package Button based on price');

        let priceSelector = "//button[normalize-space()='" + price + "']";
        // Wait for selector then click
        await page.waitForXPath(priceSelector, {
            timeout: 15000,
        });
        console.log('Found price selector');
        await cursor.click(priceSelector, {
            delay: getRandomDelay(),
        });
        console.log('Clicked Buy Package Button based on price');
    }

    await randomDelay();

    // Click the "Buy with Skrill" button
    const initialTabCount = (await page.browser().pages()).length;
    // Wait for selector then click
    await page.waitForXPath(
        "//div[@data-test='payment-button-Buy with Skrill']//button",
        {
            timeout: 15000,
        }
    );
    console.log("Found 'Buy with Skrill' button");
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
            { timeout: 3000 }
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

offerSpam();
