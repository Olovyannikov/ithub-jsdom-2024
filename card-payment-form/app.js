const CARD_ENDPOINT = 'http://icons.iconarchive.com/icons/designbolts/credit-card-payment/128/';
const CARD_NOT_FOUND = 'https://cdn1.iconfinder.com/data/icons/bank-7/40/card_not_found-128.png';

const FORM = document.querySelector('.credit-card');
const TABLE = document.querySelector('.card-table tbody');

let currentCardName = '';


FORM.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data);
    console.log(currentCardName)

    TABLE.insertAdjacentHTML('beforeend', `<tr><td>${data.name}</td><td>${currentCardName.name}</td><td>${data.number}</td></tr>`);
    FORM.reset();
    FORM.querySelector('input').focus();
});


const card_types = [
    {
        name: 'amex',
        src: CARD_ENDPOINT + 'American-Express-icon.png',
        range: {
            equals: [34, 37]
        },
        valid_length: [15]
    },
    {
        name: 'diners_club_carte_blanche',
        src: CARD_ENDPOINT + 'Diners-Club-International-icon.png',
        range: {
            between: [{start: 300, end: 305}]
        },
        valid_length: [14]
    },
    {
        name: 'diners_club_international',
        src: CARD_ENDPOINT + 'Diners-Club-International-icon.png',
        range: {
            equals: [36]
        },
        valid_length: [14]
    },
    {
        name: 'jcb',
        src: 'http://www.uidownload.com/files/269/479/761/card-cash-checkout-jcb-online-shopping-payment-method-service-icon.png',
        range: {
            between: [
                {start: 3528, end: 3589}
            ]
        },
        valid_length: [16]
    },
    {
        name: 'laser',
        src: 'https://www.shareicon.net/data/128x128/2015/09/13/100673_card_512x512.png',
        range: {
            equals: [6304, 6706, 6709, 6771]
        },
        valid_length: [16, 17, 18, 19]
    },
    {
        name: 'visa_electron',
        src: CARD_ENDPOINT + 'Visa-icon.png',
        range: {
            equals: [4026, 417500, 4508, 4844, 4913, 4917]
        },
        valid_length: [16]
    },
    {
        name: 'visa',
        src: CARD_ENDPOINT + 'Visa-icon.png',
        range: {
            equals: [4]
        },
        valid_length: [13, 14, 15, 16, 17, 18, 19]
    },
    {
        name: 'mastercard',
        src: CARD_ENDPOINT + 'Master-Card-Blue-icon.png',
        range: {
            between: [
                {start: 51, end: 55},
                {start: 2221, end: 2720}
            ]
        },
        valid_length: [16]
    },
    {
        name: 'discover',
        src: CARD_ENDPOINT + 'Discover-icon.png',
        range: {
            equals: [6011, 65],
            between: [
                {start: 622126, end: 622925},
                {start: 644, end: 649}
            ]
        },
        valid_length: [16]
    },
    {
        name: 'dankort',
        src: CARD_NOT_FOUND,
        range: {equals: [5019]},
        valid_length: [16]
    },
    {
        name: 'maestro',
        src: CARD_ENDPOINT + 'Maestro-icon.png',
        range: {
            equals: [50],
            between: [{start: 56, end: 69}]
        },
        valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
    },
    {
        name: 'uatp',
        src: CARD_NOT_FOUND,
        range: {equals: [1]},
        valid_length: [15]
    }
];

const creditCards = document.getElementsByClassName('credit-card');

for (let i = 0; i < creditCards.length; i++) {
    let creditCard = creditCards[i];

    arrangeCard(creditCard);
}

function arrangeCard(card) {
    let back = card.querySelector('.back');
    back.addEventListener('click', function () {
        bringToFront(back)
    });

    let number = card.querySelector('.number');
    number.addEventListener('input', validateCompany);

    function bringToFront(side) {
        if (!side.className.indexOf('front') < 0) {
            return;
        }

        let currentFront = card.querySelector('.front');
        let currentBack = card.querySelector('.back');

        currentFront.className = 'card back';
        currentFront.addEventListener('click', function () {
            bringToFront(currentFront)
        });
        currentBack.className = 'card front';
        currentBack.addEventListener('click', function () {
        });
    }

    function validateCompany() {
        let cardNumber = number.value;
        let company = card.querySelector('.company');
        let type = undefined;
        let match = false;

        for (let i = 0; i < card_types.length; i++) {
            type = card_types[i];
            let ranges = type.range;
            let equals = ranges['equals'];
            let between = ranges['between'];

            if (!!equals) {
                function validateEquality(cardNumber, pattern) {
                    return cardNumber.indexOf(pattern) === 0;
                }

                for (let j = 0; j < equals.length; j++) {
                    let item = equals[j].toString();
                    if (validateEquality(cardNumber, item)) {
                        match = true;
                        break;
                    }
                }
            }

            if (!!between) {
                for (let j = 0; j < between.length; j++) {
                    let item = between[j];
                    let start = item.start;

                    let segment = cardNumber.split(0, start.toString().length);

                    if (segment >= item.start && segment <= item.end) {
                        match = true;
                        break;
                    }
                }
            }

            if (match) {
                break;
            }
        }

        if (match) {
            company.innerHTML = '<img src="' + type.src + '" title="' + type.name + '"  alt="cardname"/>';
        } else {
            company.innerHTML = '';
        }

        currentCardName = type;
    }
}
