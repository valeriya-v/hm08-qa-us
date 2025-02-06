module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField:'#number',
    cardCodeField: '.card-second-row #code',
    messageField: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlan: 'div=Supportive',
    paymentButton:  '.pp-text',
    addCardButton: 'div=Add card',
    cardLinkButton: 'button=Link',
    cardCloseButton: '.payment-picker .close-button',
    cardDisplay: 'img[alt="card"]',
    blanketHanderchiefSlider:'.switch',
    addIceCreamButton: 'div=+',
    carSearchButton: '.smart-button',
    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: '.order',
    driverInfoModal: '.order-header-title',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportivePlan: async function() {
        const supportivePlan = await $(this.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        return supportivePlan;
    },
   addCreditCard: async function(cardNumber,cvvCode) {
    const paymentButton = await $(this.paymentButton);
    await paymentButton.waitForDisplayed();
    await paymentButton.click();

    const addCardButton = await $(this.addCardButton);
    await addCardButton.waitForDisplayed();
    await addCardButton.click();
    
    const cardNumberField = await $(this.cardNumberField);
    await cardNumberField.waitForDisplayed();
    await cardNumberField.setValue(cardNumber);

    const cardCodeField = await $(this.cardCodeField);
    await cardCodeField.waitForDisplayed();
    await cardCodeField.setValue(cvvCode);
    await browser.keys("Tab");

    const cardLinkButton = await $(this.cardLinkButton);
    await cardLinkButton.waitForDisplayed();
    await cardLinkButton.click();

    const cardCloseButton = await $(this.cardCloseButton);
    await cardCloseButton.waitForDisplayed();
    await cardCloseButton.click();
    },

    addMessage: async function(message) {
        const messageField = await $(this.messageField);
        await messageField.setValue(message); 
        await browser.keys("Tab");
    },

    addBlanketandHandkerchiefs: async function() {
        const blanketHanderchiefSlider = await $(this.blanketHanderchiefSlider);
        await blanketHanderchiefSlider.waitForDisplayed();
        await blanketHanderchiefSlider.click();
    },

    addIceCream: async function() {
        const addIceCreamButton = await $(this.addIceCreamButton);
        await addIceCreamButton.waitForDisplayed();
        await addIceCreamButton.click();
        await addIceCreamButton.click();
    },

    activateCarSearch: async function() {
        const carSearchButton = await $(this.carSearchButton);
        await carSearchButton.waitForDisplayed();
        await carSearchButton.click();
    }
};
