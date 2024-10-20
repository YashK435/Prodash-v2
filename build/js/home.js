const boxes = document.querySelectorAll(".box");

const checkBoxes = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;
    boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    });
};

window.addEventListener("scroll", checkBoxes);

checkBoxes(); // Call once to check on load
const userData = JSON.parse(sessionStorage.getItem('userData'));
const userName = document.querySelector(".navbar-btn#userName");
if (userData && userData.name) {
    userName.textContent = userData.name;
    console.log("User name is :", userData.name);
} else {
    console.log("No user data found in localStorage");
}
function visit_home() {
    window.open("./home.html", "_self");
}
function visit_git() {
    window.open("https://github.com/YashK435/Prodash-v2.git", "_self");
}
function visit_drawing() {
    window.open("./drawing-board.html", "_self");
}
function visit_notes() {
    window.open("./Notes.html", "_self");
}
function visit_weather() {
    window.open("./weather.html", "_self");
}
function visit_todo() {
    window.open("./todo.html", "_self");
}
function visit_subs() {
    window.open("./Subscription.html", "_self");
}
window.addEventListener("load",()=>{
    if(!sessionStorage.getItem("subscription")){
        sessionStorage.setItem("subscription","false")
    }
})
function subscribed() {
    const checkTrue = sessionStorage.getItem("subscription");
    console.log(sessionStorage.getItem("subscription"))
    return checkTrue === "true";
}
function visit_finance() {
    if (subscribed()) {
        window.location.href = "finance.html";
    } else {
        window.location.href = "Subscription.html";
    }
}
function visit_habit() {
    if (subscribed()) {
        window.location.href = "habit.html";
    } else {
        window.location.href = "Subscription.html";
    }
}
