const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTariff = await page.selectSupportivePlan();
        expect(supportiveTariff.parentElement()).toHaveElementClass('active');
    })

    it('should add credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const cardNumber = helper.getCreditCardNumber();
        const cvvCode = helper.getCVVcode();
        await page.addCreditCard(cardNumber, cvvCode);
        await expect($(page.cardDisplay)).toBeExisting();
    })

    it('should add message for a driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addMessage('Please wait near the entrance');
        await expect($(page.messageField)).toHaveValue('Please wait near the entrance');
    })

    it('should add Blanket and Handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.addBlanketandHandkerchiefs();
        await expect($('.switch-input')).toBeChecked();
    })
    
    it('should order 2 ice creams', async () => {
     await browser.url(`/`)
     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
     await page.selectSupportivePlan();
     const iceCreamQuantity = 2;
     await page.addIceCream(iceCreamQuantity);
     await expect($(`div=${iceCreamQuantity}`)).toBeExisting();
    })

    it ('should activate car search modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.activateCarSearch();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
       })

       it ('should wait for driver info modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.activateCarSearch();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
        await browser.pause(40000);
        const driverInfoModal = await $(page.driverInfoModal);
        await driverInfoModal.waitForDisplayed();
        await expect(await $(driverInfoModal)).toBeExisting();
       })
})