///////////////////////////////////////// animation-logo
const animationLogo = document.getElementById('animation-logotip');

function anim() {
    let i = 0;
    const patr1 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i;
        if (i >= 50) clearInterval(patr1);
    }, 50)

    const part2 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i;
        if (i >= 70) clearInterval(part2);
    }, 90)

    const part3 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i;
        if (i >= 92) clearInterval(part3);
    }, 140)

    const part4 = setInterval(() => {
        i++;
        animationLogo.innerHTML = i;
        if (i >= 100) clearInterval(part4);
    }, 170)
}

anim()


////////////////////////////////////////////////// gamburge's number and price
const btnPlus = document.querySelectorAll('.plus');
const btnMinus = document.querySelectorAll('.minus');
const productNum = document.querySelectorAll('.main__product-num');
const summa = document.querySelectorAll('.main__product-price span');

//////////////////////////Foods price OBJ
const foodsPrice = [
    { price: 10000 },
    { price: 20500 },
    { price: 31900 },
]

for (let i = 0; i < productNum.length; i++) {
    const elemPlus = btnPlus[i];
    const elemMinus = btnMinus[i];
    const elemOut = productNum[i];
    const summaLen = summa[i];
    const foodsLen = foodsPrice[i];
    let num = 0;
    elemPlus.addEventListener('click', () => {
        if (num < 10) {
            elemOut.value++;
            num++;
            let result = foodsLen.price + +summaLen.innerHTML;
            summaLen.innerHTML = result;
        }
    })
    elemMinus.addEventListener('click', () => {
        if (num > 0) {
            elemOut.value--;
            num--;
            let result = +summaLen.innerHTML - foodsLen.price;
            summaLen.innerHTML = result;
        }
    })
}


//////////////////////////kkcal OBJ
const kkcalObj =
{
    doubleMayonnaise: 1360, lettuce: 12, cheese: 402,
}

const prices = {
    doubleMayonnaise: 500, lettuce: 400, cheese: 600,
}

////////////////////////////////////////////////KKCAL FUNCTION

const checkboxes = document.querySelectorAll('.main__product-checkbox');
checkboxes.forEach(item => item.addEventListener('change', (e) => {
    const thisInp = e.target;
    const attrSpanandSection = thisInp.getAttribute('data-product');
    const attrProduct = thisInp.getAttribute('data-extra');
    const thisSpan = document.querySelector(`span[add-kkcal='${attrSpanandSection}']`);
    const thisSection = document.getElementById(attrSpanandSection);
    const sectionPirice = thisSection.children[1].children[1].children[0];
    if (thisInp.checked) {
        thisSpan.innerHTML = +thisSpan.innerHTML + kkcalObj[attrProduct];
        sectionPirice.innerHTML = +sectionPirice.innerHTML + prices[attrProduct];
    } else {
        thisSpan.innerHTML = +thisSpan.innerHTML - kkcalObj[attrProduct];
        sectionPirice.innerHTML = +sectionPirice.innerHTML - prices[attrProduct];
    }
}))

///////////////////////////////////////////////// MODAL

const productImg = document.querySelectorAll('.main__product-info');
const getModal = document.querySelector('.view');

productImg.forEach(item => item.addEventListener('dblclick', () => {
    const srcAtribute = item.children[0].getAttribute('src');
    getModal.children[1].src = srcAtribute;
    getModal.classList.add('active');
}))

const closeModal = document.querySelector('.view__close').addEventListener('click', () => {
    getModal.classList.remove('active');
})

//////////////////////////// order

const orderSection = document.querySelector('.receipt');
const orderWindow = orderSection.children[0];

const kkcalSpans = document.querySelectorAll('.main__product-kcall span');
document.querySelector('.addCart').addEventListener('click', (e) => {
    e.preventDefault();
    orderSection.classList.add('active');
    orderSection.style = 'display: flex; opacity: 1;';
    orderWindow.style = 'position: static;';
    let products = '';
    let sum = 0;
    let orderKkcal = 0;
    productNum.forEach(item => {
        if (item.innerHTML != 0) {
            const productName = item.parentElement.parentElement.parentElement.id;
            products +=`${productName}(${item.innerHTML}); `;
            const price = +item.parentElement.parentElement.children[1].children[0].innerHTML;
            sum += price;
        }
    })
    kkcalSpans.forEach(span => {
        if(span.innerHTML != 0) {
            orderKkcal += +span.innerHTML;
        }
    })

    orderWindow.children[1].innerHTML = `
    <mark>Товары:</mark>
    ${products}
    <br>
    <mark>Калории:</mark> ${orderKkcal} калорий<br>
    <mark>Общая стоимость:</mark> ${sum} сум
    `
})

orderWindow.children[2].addEventListener('click', () => {
    document.location.reload('true');
})

/////// close order
orderWindow.addEventListener('click', (e) => {
    e.isClickWithInModal = true;
})

orderSection.addEventListener('click', e => {
    if (e.isClickWithInModal == true) return;
    orderSection.classList.remove('active');
    orderSection.style = 'display: none; opacity: 0;';
    orderWindow.style = 'position: absolute;';
})