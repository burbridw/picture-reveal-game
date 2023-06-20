const gameWindow = document.querySelector(".game-window")
const pictureWindow = document.querySelector(".picture-window")
const coverGridContainer = document.querySelector(".cover-grid-container")
const coverGrid = document.querySelector(".cover-grid")

let allCoverGridBoxes
let gridReady = false
let firstTime = true
let coverGridArr = []
let mouseDown = false
let canDraw = false

let circleSize = 125


window.addEventListener("load",()=>{
    function setImage() {
        pictureWindow.innerHTML = `<img src="./images/school/img4.png">`
    }
    setImage()
    
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth * 0.8
    canvas.height = window.innerHeight * 0.8
    const offSetX = window.innerWidth * 0.1
    const offSetY = window.innerHeight * 0.05
    
    canvas.addEventListener("mousemove",event=>{
        trackMouse(event.x-offSetX,event.y-offSetY)
    })
    
    function trackMouse(posx,posy) {
        // ctx.clearRect(posx-window.innerWidth*0.04,posy,100,100)
        if ( canDraw ) {
            drawCanvas()
            clearCircle(ctx,posx,posy,circleSize)
            // clearCircle2(ctx,posx,posy,125)
        }
    }

    function clearCircle2(context,posx,posy,radius) {
        context.globalCompositeOperation = 'destination-out'
        context.arc(posx, posy, radius, 0, Math.PI*2, true);
        context.fill();
    }
    
    canvas.addEventListener("mousedown",(event)=>{
        canDraw = true
        clearCircle(ctx,event.x-offSetX,event.y-offSetY,circleSize)
            // clearCircle2(ctx,event.x-offSetX,event.y-offSetY,125)
    })
    window.addEventListener("mouseup",()=>{
        canDraw = false
        drawCanvas()
    })
    
    
    function drawCanvas() {
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "black"
        ctx.fill()
    }
    
    drawCanvas()
    
})

sizesmall.addEventListener("click",()=>{
    circleSize = 50
    displaySize(sizesmall)
})
sizemedium.addEventListener("click",()=>{
    circleSize = 125
    displaySize(sizemedium)
})
sizelarge.addEventListener("click",()=>{
    circleSize = 175
    displaySize(sizelarge)
})

function displaySize(button) {
    document.querySelector(".current-size").classList.remove("current-size")
    button.classList.add("current-size")
}

function clearCircle(context,x,y,radius) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI, true);
    context.clip();
    context.clearRect(x-radius,y-radius,radius*2,radius*2);
    context.restore();
}

// window.addEventListener("mousedown",(event)=>{
//     if ( event.target.classList.contains("cover-grid-box") ) {
//         mouseDown = true
//         resetClear()
//         let pointedBox = document.elementFromPoint(event.x,event.y)
//         let clickTarget = Array.from(pointedBox.parentNode.children).indexOf(pointedBox)
//         clearAround(clickTarget)
//     }
// })
// window.addEventListener("mouseup",()=>{
//     mouseDown = false
//     resetClear()
// })

// window.addEventListener("mousemove",(event)=>{
//     if ( mouseDown && event.target.classList.contains("cover-grid-box") ) {
//         resetClear()
//         let pointedBox = document.elementFromPoint(event.x,event.y)
//         let clickTarget = Array.from(pointedBox.parentNode.children).indexOf(pointedBox)
//         clearAround(clickTarget)
//     }
// })



// function fillGrid() {
//     for ( let i = 0; i < 2700; i++ ) {
//         coverGrid.innerHTML += `<div class="cover-grid-box"></div>`
//         coverGridArr.push(coverGrid.children[i])
//     }
//     gridReady = true
//     addGridListener()
// }

// fillGrid()

// function addGridListener() {
//     if ( gridReady ) {
//         let allCoverGridBoxes = document.querySelectorAll(".cover-grid-box")
//         allCoverGridBoxes.forEach( (gridBox) =>{
//             gridBox.addEventListener("click",(event) =>{
//                 reveal(event.target)
//             })
//         })
//     }
// }

// function reveal(box) {
//     if ( !firstTime ) {
//         resetClear()
//     }
//     firstTime = false
//     let clickTarget = Array.from(box.parentNode.children).indexOf(box)
//     clearAround(clickTarget)
// }

// function resetClear() {
//     let active = document.querySelectorAll(".active")
//     active.forEach( (x)=>{
//         x.className = "cover-grid-box"
//     })
// }
// function clearAroundLarge(center) {
//     let groupEight = [center,center-1,center+1,center-2,center+2,center-58,center+58,center-59,center+59,center-60,center+60,center-61,center+61,center-62,center+62,center-118,center+118,center-119,center+119,center-120,center+120,center-121,center+121,center-122,center+122]
//     groupEight.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("eight-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupSeven = [center-3,center-4,center-56,center-57,center-63,center-64,center-116,center-117,center-123,center-124,center-177,center-178,center-179,center-180,center-181,center-182,center-183,center-238,center-239,center-240,center-241,center-242,center+3,center+4,center+56,center+57,center+63,center+64,center+116,center+117,center+123,center+124,center+177,center+178,center+179,center+180,center+181,center+182,center+183,center+238,center+239,center+240,center+241,center+242]
//     groupSeven.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("seven-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupSix = [center-176,center+176,center-184,center+184,center-237,center+237,center-243,center+243]
//     groupSix.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("six-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupFive = [center-5,center+5,center-6,center+6,center-54,center+54,center-55,center+55,center-65,center+65,center-66,center+66,center-114,center+114,center-115,center+115,center-125,center+125,center-126,center+126,center-298,center+298,center-299,center+299,center-300,center+300,center-301,center+301,center-302,center+302,center-358,center+358,center-359,center+359,center-360,center+360,center-361,center+361,center-362,center+362]
//     groupFive.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("five-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupFour = [center-174,center+174,center-175,center+175,center-185,center+185,center-186,center+186,center-235,center+235,center-236,center+236,center-244,center+244,center-245,center+245,center-295,center+295,center-296,center+296,center-297,center+297,center-303,center+303,center-304,center+304,center-305,center+305,center-357,center+357,center-363,center+363]
//     groupFour.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("four-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupThree = [center-7,center+7,center-8,center+8,center-52,center+52,center-53,center+53,center-67,center+67,center-68,center+68,center-112,center+112,center-113,center+113,center-127,center+127,center-128,center+128,center-418,center+418,center-419,center+419,center-420,center+420,center-421,center+421,center-422,center+422,center-478,center+478,center-479,center+479,center-480,center+480,center-481,center+481,center-482,center+482]
//     groupThree.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("three-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupTwo = [center-172,center+172,center-173,center+173,center-187,center+187,center-188,center+188,center-233,center+233,center-234,center+234,center-246,center+246,center-247,center+247,center-294,center+294,center-306,center+306,center-355,center+355,center-356,center+356,center-364,center+364,center-365,center+365,center-416,center+416,center-417,center+417,center-423,center+423,center-424,center+424,center-477,center+477,center-483,center+483]
//     groupTwo.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("two-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupOne = [center-9,center+9,center-51,center+51,center-69,center+69,center-111,center+111,center-129,center+129,center-232,center+232,center-248,center+248,center-354,center+354,center-366,center+366,center-476,center+476,center-484,center+484,center-538,center+538,center-539,center+539,center-540,center+540,center-541,center+541,center-542,center+542]
//     groupOne.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("one-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
// }

// function clearAround(center) {
//     let groupEight = [center, center-1,center-59,center-60,center-61,center+1,center+59,center+60,center+61]
//     groupEight.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("eight-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupSeven = [center-2,center-58,center-62,center-119,center-120,center-121,center+2,center+58,center+62,center+119,center+120,center+121]
//     groupSeven.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("seven-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupSix = [center-118,center-122,center+118,center+122]
//     groupSix.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("six-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupFive = [center-3,center-57,center-63,center-179,center-180,center-181,center+3,center+57,center+63,center+179,center+180,center+181]
//     groupFive.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("five-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupFour = [center-117,center+117,center-123,center+123,center-178,center+178,center-182,center+182]
//     groupFour.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("four-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupThree = [center-4,center-56,center-64,center-239,center-240,center-241,center+4,center+56,center+64,center+239,center+240,center+241]
//     groupThree.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("three-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupTwo = [center-116,center-124,center-177,center-183,center-238,center-242,center+116,center+124,center+177,center+183,center+238,center+242]
//     groupTwo.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("two-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
//     let groupOne = [center-5,center-55,center-65,center-299,center-300,center-301,center+5,center+55,center+65,center+299,center+300,center+301]
//     groupOne.forEach( a=>{
//         if ( a >= 0 && a <= 2699 ) {
//             coverGrid.children[a].classList.add("one-clear")
//             coverGrid.children[a].classList.add("active")
//         }
//     })
// }


