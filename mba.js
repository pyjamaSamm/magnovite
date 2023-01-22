const scroll1 = document.querySelector('.scroll1')
const scroll2 = document.querySelector('.scroll2')
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const half2 = document.querySelector('.half2');


scroll2.onmouseover = function() {
    img1.classList.add("displayoff");
}

// half2.addEventListener("scroll", (event) => {

//     console.log(getOffset(img2).top)
// })

// console.log(getOffset(img2).top)
// function getOffset( el ) {
//     var _x = 0;
//     var _y = 0;
//     while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
//         _x += el.offsetLeft - el.scrollLeft;
//         _y += el.offsetTop - el.scrollTop;
//         el = el.offsetParent;
//     }
//     return { top: _y, left: _x };
// }
