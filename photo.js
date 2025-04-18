$("img").wrap("<div class='imgbox'></div>")
const imgBox = document.querySelectorAll(".imgbox")
imgBox.forEach((box) => {
    $(box).append("<div class='overlay'></div>");
    const captext = box.querySelector("img").getAttribute("alt");
    $(box).append("<div class='caption'>" + captext.split(" | ")[0] + "<br><br>" + captext.split(" | ")[1] + "</div>");
})

const modal = document.createElement("div"),
      modalImg = document.createElement("img"),
      modalCap = document.createElement("div");
modal.classList.add("modal");
modalImg.classList.add("shown");
modalCap.classList.add("modalcap", "shown");
modal.appendChild(modalImg);
modal.appendChild(modalCap);
$(modal).append("<div id='closezone'><div id='closebkgd'></div><p>&#10005;</p></div>");
$(modal).append("<div id='prevzone'><div id='prevbkgd'></div><p>&larr;</p></div>");
$(modal).append("<div id='nextzone'><div id='nextbkgd'></div><p>&rarr;</p></div>");
let currentImgIndex;
document.body.appendChild(modal);

imgBox.forEach((box, i) => {
    box.addEventListener("click", () => {
        $("body").css("overflow", "hidden");
        const smallImgSrc = box.querySelector("img").getAttribute("src");
        const imgSrc = smallImgSrc.split("/small")[0] + smallImgSrc.split("/small")[1]
        const imgCap = box.querySelector("img").getAttribute("alt");
        modalImg.setAttribute("src", imgSrc);
        modalCap.innerHTML = imgCap;
        currentImgIndex = i;
        modal.classList.add("onscreen");
        setTimeout(() => {
            modal.classList.add("shown");
        }, 1);
    });
    document.getElementById("closezone").addEventListener("click", () => {
        modal.classList.remove("shown");
        setTimeout(() => {
            modal.classList.remove("onscreen");
        }, 300);
        $("body").css("overflow", "auto");
    });
});

const allImgs = document.querySelectorAll("#gallery img");

const prevBtn = document.getElementById("prevzone");
let prevImgSrc = () => {
    currentImgIndex--;
    if (currentImgIndex < 0) {
        currentImgIndex = allImgs.length - 1
    }
    return allImgs[currentImgIndex].src.split("/small")[0] + allImgs[currentImgIndex].src.split("/small")[1];
};
prevBtn.onclick = () => {
    $(modalImg).toggleClass("shown hidden");
    $(modalCap).toggleClass("shown hidden");
    setTimeout(() => {
        modalImg.setAttribute("src", prevImgSrc());
        modalCap.innerHTML = allImgs[currentImgIndex].alt;
    }, 150);
    setTimeout(() => {
        $(modalImg).toggleClass("shown hidden");
        $(modalCap).toggleClass("shown hidden");
    }, 300);
};

const nextBtn = document.getElementById("nextzone");
let nextImgSrc = () => {
    currentImgIndex++;
    if (currentImgIndex >= allImgs.length) {
        currentImgIndex = 0
    }
    return allImgs[currentImgIndex].src.split("/small")[0] + allImgs[currentImgIndex].src.split("/small")[1];
};
nextBtn.onclick = () => {
    $(modalImg).toggleClass("shown hidden");
    $(modalCap).toggleClass("shown hidden");
    setTimeout(() => {
        modalImg.setAttribute("src", nextImgSrc());
        modalCap.innerHTML = allImgs[currentImgIndex].alt;
    }, 150)
    setTimeout(() => {
        $(modalImg).toggleClass("shown hidden");
        $(modalCap).toggleClass("shown hidden");
    }, 300);

};