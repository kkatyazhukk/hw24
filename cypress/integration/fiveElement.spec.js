describe('5element tests', () => {

    it('Open catalog', () => {
        cy.visit('https://5element.by/');

        cy.get('.h-burger__text')
            .click();

        cy.get('.js-catalog-nav')
            .should('be.visible');     
    });

    it('No Favorites', () => {
        cy.visit('https://5element.by/');

        cy.get('div:nth-child(2) > div.n-item.js-drop-select-trigger')
            .click();

        cy.get('div.h-drop.js-drop-select.active > div.h-drop__body > div')
            .should('be.visible')
            .contains('У нас столько замечательных товаров, а в Избранном у Вас – пусто :(');   
    });

    it('Open Product page', () => {
        cy.visit('https://5element.by/');

        cy.get('div.swiper-slide-visible.swiper-slide-next > a')
            .click();

        cy.get('#filters-0 > div > ul > li:nth-child(2) > a')
            .click();

        cy.get('div.catalog-default > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > a')
            .click();

        cy.get('div.section-heading > h1')
            .invoke('text')
            .should('contain', 'Смартфон APPLE iPhone');

        cy.url()
            .should('include', 'smartfon-apple-iphone');  
    });

    it('Add product to Cart', () => {
        cy.visit('https://5element.by/catalog/2679-smartfony-apple');

        cy.get('div:nth-child(1) > div:nth-child(1) > div > div:nth-child(3) > div.c-sku').invoke('text').as('productCodeOnProductPage');

        cy.get('div:nth-child(1) > div:nth-child(1) > div > div:nth-child(3) > div.c-controls > button.btn.c-cart.ec-add-to-cart > span')
            .click();
        
        cy.get('div.m-controls > a:nth-child(2)')
            .click();

        cy.url()
            .should('eq', 'https://5element.by/cart');

        cy.get('p[data-v-381e3b5f]')
            .invoke('text')
            .as('productCodeOnCartPage')
            .then(function () {
                let cutProductCodeOnProductPage = this.productCodeOnProductPage.slice(5);
                let cutProductCodeOnCartPage = this.productCodeOnCartPage.slice(12);
                expect(cutProductCodeOnProductPage).to.equal(cutProductCodeOnCartPage)
            });  
    });

    it('Subscribe', () => {
        cy.visit('https://5element.by/');

        cy.get('form > input[type=email]')
            .type('test12@gmail.com{enter}');

        cy.get('div:nth-child(7) > div > div.modal-popup__head > div')
            .invoke('text')
            .should('eq', 'Благодарим Вас');
    });
});