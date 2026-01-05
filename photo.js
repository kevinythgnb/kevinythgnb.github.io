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
    let openModal = () => {
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
    }
    box.addEventListener("click", openModal);

    let closeModal = () => {
        modal.classList.remove("shown");
        setTimeout(() => {
            modal.classList.remove("onscreen");
        }, 300);
        $("body").css("overflow", "auto");
    }
    document.getElementById("closezone").addEventListener("click", closeModal);
    document.addEventListener("keydown", (k) => {
        if (k.key === "Escape") {
            closeModal();
        }
    })
})

const allImgs = document.querySelectorAll("#gallery img");

let prevImgSrc = () => {
    currentImgIndex--;
    if (currentImgIndex < 0) {
        currentImgIndex = allImgs.length - 1
    }
    return allImgs[currentImgIndex].src.split("/small")[0] + allImgs[currentImgIndex].src.split("/small")[1];
}
let goPrev = () => {
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
}
document.getElementById("prevzone").addEventListener("click", goPrev);
document.addEventListener("keydown", (k) => {
    if (k.key === "ArrowLeft") {
        goPrev();
    }
})

let nextImgSrc = () => {
    currentImgIndex++;
    if (currentImgIndex >= allImgs.length) {
        currentImgIndex = 0
    }
    return allImgs[currentImgIndex].src.split("/small")[0] + allImgs[currentImgIndex].src.split("/small")[1];
}
let goNext = () => {
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
}
document.getElementById("nextzone").addEventListener("click", goNext);
document.addEventListener("keydown", (k) => {
    if (k.key === "ArrowRight") {
        goNext();
    }
})