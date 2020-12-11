//check if there's local Storage Color option
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {

    document.documentElement.style.setProperty('--maincolor', mainColors);

    //Remove Active Class Form All Colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        //Add Active Class On Element With Data-color === Local Storage Item 
        if (element.dataset.color === mainColors) {

            //Add Active Class 
            element.classList.add("active");
        }

    });
}

//Random Background Option
let backgroundOption = true;

//varible To Control The background interval
let backgroundInterval;

//Check If There's Local Storage Randome Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

//check If Random Background local storage is not Empaty
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {

        backgroundOption = false;

        document.querySelector(".random-backgrounds .no").classList.add("active");

    }

    //Remove Active Class Form All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active");

    });
}

// Toggle spin Class On Icon
document.querySelector(".toggle-settings .gear").onclick = function () {

    // Toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");

    // Toggle class open on main setting box
    document.querySelector(".settings-box").classList.toggle("open");
}

// switch colors
const colorsli = document.querySelectorAll(".colors-list li");

// loop on all list items
colorsli.forEach(li => {


    //click on every list items
    li.addEventListener("click", (e) => {

        // set color on root
        document.documentElement.style.setProperty('--maincolor', e.target.dataset.color);

        //set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);


        //Remove Active Class Form All Childrens
        handleActive(e);

    });

});


// switch Random Background Option
const randomBackEl = document.querySelectorAll(".settings-box .option-box .random-backgrounds span");

// loop on all spans
randomBackEl.forEach(span => {

    //click on every spans
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.back === "yes") {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_Option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_Option", false);

        }
    });

});

// select header page
let headerPage = document.querySelector('.header-section');

// Get array of images
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg"];


// //function to randomize imgs
// function randomizeImgs() {

//     if (backgroundOption === true) {

//         //setInterval
//         backgroundInterval = setInterval(() => {

//             // Get random Number
//             let randomNumber = Math.floor(Math.random() * imgsArray.length);

//             // chang Backgroung img
//             headerPage.style.backgroundImage = 'url("../images/' + imgsArray[randomNumber] + '")'
//         }, 1000);

//     }
// }
// randomizeImgs();

//Select skills Selector
let ourSkills = document.querySelector(".our-skills")

window.onscroll = function () {

    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;


    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;


    //window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".our-skills .our-skills-item span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

//creat popup with the image
let ourGallery = document.querySelectorAll(".our-gallery-item .our-gallery-img");

ourGallery.forEach(img => {


    img.addEventListener('click', (e) => {


        //creat overlay element
        let overlay = document.createElement('div');

        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //creat the popup box
        let popupBox = document.createElement('div');

        //add Class To The Popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            //creat heading
            let imgHeading = document.createElement("h3");

            //creat text for heading
            let imgText = document.createTextNode(img.alt);

            //append the text to the heading
            imgHeading.appendChild(imgText);

            //append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //creat the image
        let popupImage = document.createElement('img');

        //set image src
        popupImage.src = img.src;

        //Add Image To Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup Box To Body
        document.body.appendChild(popupBox);

        //creat the close span
        let closeButton = document.createElement("span");

        //creat the close button text
        let closeButtonText = document.createTextNode("X");

        //append text to close button
        closeButton.appendChild(closeButtonText);

        //add class To close button
        closeButton.className = 'close-button';

        //addclose button to the popup box
        popupBox.appendChild(closeButton);

        //close popup
        document.addEventListener("click", function (e) {

            if (e.target.className == 'close-button') {

                //remove the current popup
                e.target.parentNode.remove();

                //remove overlay
                document.querySelector(".popup-overlay").remove();

            }
        })
    });
});

//seclect all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {

    bullet.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });

})

//handle active state

function handleActive(ev) {

    //remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    //add active class on self
    ev.target.classList.add("active");
};

// add event bullets

let bulletsSpan = document.querySelectorAll(".option-box .bullets-option span"),

    bulletsContainer = document.querySelector(".nav-bullets"),

    bulletLocalItem = localStorage.getItem("bullets_option");


if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".option-box .bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".option-box .bullets-option .no").classList.add("active");

    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');

        }
        handleActive(e);
    });
});

//Reset Button
document.querySelector(".reset-options").onclick = function() {

// localStorage.clear();
localStorage.removeItem("color-option");
localStorage.removeItem("background_option");
localStorage.removeItem("bullets_option");

//reload widow
window.location.reload();
};
