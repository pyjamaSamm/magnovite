const scroll1 = document.querySelector(".scroll1");
const scroll2 = document.querySelector(".scroll2");
const scroll3 = document.querySelector(".scroll3");
const scroll4 = document.querySelector(".scroll4");
const scroll5 = document.querySelector(".scroll5");
const scroll6 = document.querySelector(".scroll6");
const scroll7 = document.querySelector(".scroll7");
const scroll8 = document.querySelector(".scroll8");
const scroll9 = document.querySelector(".scroll9");
const scroll10 = document.querySelector(".scroll10");
const scroll11 = document.querySelector(".scroll11");
const scroll12 = document.querySelector(".scroll11");
const scroll = [
  scroll1,
  scroll2,
  scroll3,
  scroll4,
  scroll5,
  scroll6,
  scroll7,
  scroll8,
  scroll9,
  scroll10,
  scroll11,
  scroll12,
];

const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const img3 = document.querySelector(".img3");
const img4 = document.querySelector(".img4");
const img5 = document.querySelector(".img5");
const img6 = document.querySelector(".img6");
const img7 = document.querySelector(".img7");
const img8 = document.querySelector(".img8");
const img9 = document.querySelector(".img9");
const img10 = document.querySelector(".img10");
const img11 = document.querySelector(".img11");
const img12 = document.querySelector(".img11");

const img = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

const half2 = document.querySelector(".half2");

// console.log(window.innerWidth)

scroll1.addEventListener("touchend", function() {
    
})

for (let i = 0; i < scroll.length; i++) {
  let x = scroll[i];
  x.onmouseover = function () {
    // console.log("sadjcn");
    for (let j = 0; j < img.length; j++) {
      if (j == i) {
        img[j].classList.remove("displayoff");
      } else {
        img[j].classList.add("displayoff");
      }
    }
  };
}

