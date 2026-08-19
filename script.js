/* =========================
   MUSIC CONTROLLER
========================= */

function toggleAudio() {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("navMusicBtn");

  if (!music) return;

  if (music.paused) {
    music.play()
      .then(function () {
        btn.innerHTML = "⏸ Pause";
      })
      .catch(function (err) {
        console.log("Audio play error:", err);
      });
  } else {
    music.pause();
    btn.innerHTML = "♫ Music";
  }
}


/* =========================
   PAGE HISTORY & LINE NAVIGATION
========================= */

let pageHistoryArray = ["welcome"];
let timers = [];


function clearTimers() {
  timers.forEach(function (timer) {
    clearInterval(timer);
    clearTimeout(timer);
  });

  timers = [];
}


function addTimer(timer) {
  timers.push(timer);
  return timer;
}


function hideAllPages() {
  const pages = [
    "welcome",
    "passwordPage",
    "envelopePage",
    "letterPage",
    "chapter2",
    "chapter3",
    "finalChapter",
    "birthdayReveal",
    "celebrationScene",
    "ultimateEnding"
  ];

  pages.forEach(function (id) {
    const page = document.getElementById(id);

    if (page) {
      page.classList.add("hidden");
      page.style.display = "none";
    }
  });
}


function showPage(pageId) {

  clearTimers();
  hideAllPages();

  const targetPage = document.getElementById(pageId);

  if (targetPage) {
    targetPage.classList.remove("hidden");
    targetPage.style.display = "flex";
  }

  if (pageHistoryArray[pageHistoryArray.length - 1] !== pageId) {
    pageHistoryArray.push(pageId);
  }

  const backBtn = document.getElementById("navBackBtn");

  if (backBtn) {
    backBtn.style.display =
      pageHistoryArray.length > 1
        ? "inline-flex"
        : "none";
  }

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* 
   ====================================================
   INSTANT BACK BUTTON LOGIC
   ====================================================
*/
function goBackPage() {

  if (pageHistoryArray.length <= 1) return;

  const currentPageId = pageHistoryArray[pageHistoryArray.length - 1];

  // Chapter 2-এর জন্য ব্যাক (Instant Text)
  if (currentPageId === "chapter2" && c2 > 1) {
    c2 -= 2;
    showC2(true); // true = instant show
    return;
  }

  // Chapter 3-এর জন্য ব্যাক (Instant Text)
  if (currentPageId === "chapter3" && c3 > 1) {
    c3 -= 2;
    showC3(true); // true = instant show
    return;
  }

  // Birthday Reveal-এর জন্য ব্যাক (Instant Text)
  if (currentPageId === "birthdayReveal" && bday > 1) {
    bday -= 2;
    showBday(true); // true = instant show
    return;
  }

  // চ্যাপ্টারের শুরুতে থাকলে আগের পেজে ফেরত যাবে
  pageHistoryArray.pop();

  const previousPageId =
    pageHistoryArray[pageHistoryArray.length - 1];

  clearTimers();
  hideAllPages();

  const previousPage =
    document.getElementById(previousPageId);

  if (previousPage) {
    previousPage.classList.remove("hidden");
    previousPage.style.display = "flex";
  }

  const backBtn =
    document.getElementById("navBackBtn");

  if (backBtn) {
    backBtn.style.display =
      pageHistoryArray.length > 1
        ? "inline-flex"
        : "none";
  }

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* =========================
   WELCOME → PASSWORD
========================= */

function nextPage() {
  showPage("passwordPage");
}


/* =========================
   PASSWORD → ENVELOPE
========================= */

function checkPassword() {

  const input =
    document.getElementById("password");

  const pass =
    input.value.toLowerCase().trim();

  if (pass === "favourite chapter") {

    showPage("envelopePage");

  } else {

    input.classList.add("wrong");

    setTimeout(function () {
      input.classList.remove("wrong");
    }, 500);

    alert("Wrong Password 💔");
  }
}


/* =========================
   ENVELOPE → CHAPTER 1
========================= */

function openEnvelope() {

  showPage("letterPage");

  const nextBtn =
    document.getElementById("nextChapterBtn");

  if (nextBtn) {
    nextBtn.style.display = "none";
  }

  startLetter();
}


/* =========================
   CHAPTER 1
========================= */

const lines = [
  "Hey tui... ❤️",
  "Haa... tokei bolchi. 😊",
  "Hoyto vabchis...",
  "Eta sudhu ekta website... na",
  "Eta amar tor jonno banano ekta chotto surprise. 🤍",
  "So aste aste por...",
  "Golpota ekhono shesh hoyni... ✨"
];

let line = 0;


function startLetter() {

  line = 0;

  const box =
    document.getElementById("typewriter");

  box.innerHTML = "";

  showNextLine();
}


function showNextLine() {

  const box =
    document.getElementById("typewriter");

  const nextBtn =
    document.getElementById("nextChapterBtn");

  if (line >= lines.length) {

    addTimer(
      setTimeout(function () {
        if (nextBtn) {
          nextBtn.style.display = "block";
          nextBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500)
    );

    return;
  }

  typeText(
    box,
    lines[line],
    function () {

      box.innerHTML += "<br><br>";

      line++;

      addTimer(
        setTimeout(showNextLine, 700)
      );
    }
  );
}


/* =========================
   UNIVERSAL TYPEWRITER
========================= */

function typeText(box, text, done) {

  let i = 0;

  const typingTimer =
    setInterval(function () {

      box.appendChild(
        document.createTextNode(text.charAt(i))
      );

      i++;

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

      if (i >= text.length) {

        clearInterval(typingTimer);

        timers =
          timers.filter(function (timer) {
            return timer !== typingTimer;
          });

        done();
      }

    }, 35);

  addTimer(typingTimer);
}


/* =========================
   CHAPTER 2
========================= */

function goToChapter2() {

  showPage("chapter2");

  startChapter2();
}


const chapter2Lines = [

  "Our story didn't really start with a beautiful moment... 🤍",

  "বরং শুরুটা হয়েছিল একটা classroom-এ... আর একটা ছোট্ট ঝগড়া দিয়ে। 😬",

  "সেদিন কে জানত, ওই মানুষটার সাথেই একদিন এত কথা জমে থাকবে... এত memories তৈরি হবে।",

  "At that time, we weren't even close... সত্যি বলতে, friend বললেও হয়তো একটু বেশি বলা হয়ে যেত।",

  "Then came 28 November 2023... ✨",

  "একটা simple video-তে তোর একটা comment... আর somehow, সেখান থেকেই আবার আমাদের কথা শুরু হলো।",

  "কথা বলতে বলতে একসময় তুই আমাকে তোর number দিতে চাইলি।",

  "But TikTok-এর privacy তখন আমাদের একটু পরীক্ষা নিতে চেয়েছিল। 😭😂",

  "তাই numberটা সরাসরি দেখাতে না পেরে তুই যেভাবে দিলি...",

  "\"zero one seven\" 😁",

  "সত্যি বলছি, তোর ওই বুদ্ধি দেখে আমি সেদিন একটু অবাকই হয়েছিলাম। 😂❤️",

  "তারপর... একটার পর একটা দিন চলে গেল।",

  "কথা বাড়তে থাকল, রাতগুলো একটু একটু করে ছোট হতে থাকল... আর অজান্তেই তুই হয়ে উঠলি আমার পরিচিত মানুষগুলোর মধ্যে একটু আলাদা একজন।",

  "But then... 27 April 2024. 💔",

  "হঠাৎ করেই তুই হারিয়ে গেলি।",

  "কোনো proper goodbye ছিল না... কোনো explanation-ও না।",

  "আমি তোকে খুঁজেছি... কিন্তু কোথাও পেলাম না।",

  "সময় চলে গেল। Days became months... আর আমি ভেবেছিলাম, হয়তো গল্পটা এখানেই শেষ।",

  "But some stories don't end when we think they do...",

  "Because then came 2 June 2025. ✨",

  "একদিন হঠাৎ... an unknown number থেকে একটা message এলো।",

  "আর message-এর ওপাশে ছিলি... তুই। ❤️",

  "কী অদ্ভুত না? এতদিন পরেও somehow, we found our way back to each other.",

  "তারপর থেকে আবার কথা... আবার সেই পরিচিত feeling... আর এবার গল্পটা আর হারিয়ে যায়নি।",

  "Maybe that's what makes our story a little different...",

  "কিছু মানুষ জীবনে আসে খুব quietly...",

  "কিছুদিন থাকে... তারপর হারিয়ে যায়...",

  "কিন্তু যদি তারা সত্যিই important হয়, somehow life তাদের আবার ফিরিয়ে আনে। 🤍",

  "And maybe... that's exactly what happened with us.",

  "কিন্তু জানিস তো... এই গল্পটা এখানেও শেষ হয়নি।",

  "Because the best part of our story... is still being written. ❤️"
];

let c2 = 0;


function startChapter2() {

  c2 = 0;

  document.getElementById("chapter2Story").innerHTML = "";

  showC2();
}


function showC2(isInstant = false) {

  const box =
    document.getElementById("chapter2Story");

  const btn =
    document.getElementById("chapter2NextBtn");

  if (c2 >= chapter2Lines.length) {

    btn.textContent =
      "Continue to Chapter 3 →";

    btn.style.display =
      "inline-flex";

    btn.onclick =
      goToChapter3;

    return;
  }

  document.getElementById("memoryNo").textContent =
    String(c2 + 1).padStart(2, "0");

  const text =
    chapter2Lines[c2];

  let specialClass = "";

  if (text.includes("28 November")) {
    specialClass = "dateMoment";
  }

  if (text.includes("27 April")) {
    specialClass = "sadMoment";
  }

  if (text.includes("2 June")) {
    specialClass = "returnMoment";
  }

  box.innerHTML =
    `<div class="chapterStoryText ${specialClass}"></div>`;

  const textBox =
    box.querySelector(".chapterStoryText");

  btn.style.display = "none";

  clearTimers();

  if (isInstant) {
    // সরাসরি দেখানোর লজিক (Back Button Click)
    textBox.textContent = text;
    c2++;
    btn.textContent = "Continue ✦";
    btn.style.display = "inline-flex";
    btn.onclick = function () { showC2(false); };
  } else {
    // টাইপিং এনিমেশন সহ দেখানোর লজিক (Next Click)
    typeText(
      textBox,
      text,
      function () {

        c2++;

        btn.textContent =
          "Continue ✦";

        btn.style.display =
          "inline-flex";

        btn.onclick = function () { showC2(false); };
      }
    );
  }
}


/* =========================
   CHAPTER 3
   ONE LINE PER PAGE
========================= */

function goToChapter3() {

  showPage("chapter3");

  startChapter3();
}


const chapter3Lines = [

  "At first, everything was pretty simple... 😊",

  "আমি একটু বেশি fun করতাম, আর তুইও সেগুলো equally enjoy করতি।",

  "তারপর কখন যে আমরা এতটা close হয়ে গেলাম... honestly, I didn't even notice. 🤍",

  "কিছু রাত তো এমনও গেছে—9টা-10টায় কথা শুরু করে কখন যে সকাল 5টা-6টা বেজে গেছে, বুঝতেই পারিনি। 🌙",

  "সবচেয়ে অবাক করার বিষয়... এতক্ষণ কথা বলার পরেও আমাদের কথা যেন কখনো শেষ হতো না।",

  "আর তোর ওই জেদটা... 😑❤️",

  "মাঝে মাঝে সত্যিই বিরক্ত করতি, but somehow... that stubborn little side of you became one of my favourite things. 😂",

  "কিন্তু জানিস...",

  "ঠিক কখন তুই আমার কাছে এতটা important হয়ে গেলি, সেটা আমি মধ্যেও বুঝতে পারিনি।",

  "কোনো particular moment ছিল না... কোনো special day-ও না।",

  "Maybe it happened somewhere between all those random talks, stupid jokes, little arguments and endless nights...",

  "কখন যে 'তুই' শুধু একজন মানুষ না হয়ে আমার favourite person হয়ে গেলি... I just didn't notice. 🤍",

  "And maybe... that's the part I never really said. ❤️"
];

let c3 = 0;


function startChapter3() {

  c3 = 0;

  document.getElementById("chapter3Story").innerHTML = "";

  document.getElementById("chapter3NextBtn").style.display =
    "none";

  showC3();
}


function showC3(isInstant = false) {

  const box =
    document.getElementById("chapter3Story");

  const btn =
    document.getElementById("chapter3NextBtn");

  if (c3 >= chapter3Lines.length) {

    btn.textContent =
      "Continue to Final Chapter →";

    btn.style.display =
      "inline-flex";

    btn.onclick =
      goToFinalChapter;

    return;
  }

  box.innerHTML = "";

  btn.style.display =
    "none";

  clearTimers();

  if (isInstant) {
    // সরাসরি দেখানোর লজিক
    box.textContent = chapter3Lines[c3];
    c3++;
    btn.textContent = "Continue ✦";
    btn.style.display = "inline-flex";
    btn.onclick = function () { showC3(false); };
  } else {
    // টাইপিং সহ দেখানোর লজিক
    typeText(
      box,
      chapter3Lines[c3],
      function () {

        c3++;

        btn.textContent =
          "Continue ✦";

        btn.style.display =
          "inline-flex";

        btn.onclick = function () { showC3(false); };
      }
    );
  }
}


/* =========================
   FINAL CHAPTER
========================= */

function goToFinalChapter() {

  showPage("finalChapter");
}


/* =========================
   BIRTHDAY REVEAL
   ONE LINE PER PAGE
========================= */

const birthdayLines = [

  "আজকের দিনটা শুধু একটা date না... 🤍",

  "আজ এমন একজন মানুষের birthday, যে somehow আমার গল্পের একটা very special part হয়ে গেছে। ❤️",

  "তোর জন্য আমার একটাই wish—",

  "তুই সবসময় হাসিস, happy থাকিস, আর তোর ছোট-বড় সব dream একদিন সত্যি হোক। ✨",

  "আর জীবন তোকে যত দূরেই নিয়ে যাক... তোর এই সুন্দর হাসিটা যেন কখনো হারিয়ে না যায়। 🤍"
];

let bday = 0;


function openFinalSurprise() {

  showPage("birthdayReveal");

  bday = 0;

  document.getElementById("birthdayMessage").innerHTML = "";

  document.getElementById("oneMoreBtn").style.display =
    "none";

  showBday();
}


function showBday(isInstant = false) {

  const box =
    document.getElementById("birthdayMessage");

  const btn =
    document.getElementById("oneMoreBtn");

  if (bday >= birthdayLines.length) {

    btn.textContent =
      "🎂 Let's Celebrate";

    btn.style.display =
      "inline-flex";

    btn.onclick =
      goToCelebration;

    return;
  }

  box.innerHTML = "";

  btn.style.display =
    "none";

  clearTimers();

  if (isInstant) {
    // সরাসরি দেখানোর লজিক
    box.textContent = birthdayLines[bday];
    bday++;
    btn.textContent = "Continue ✨";
    btn.style.display = "inline-flex";
    btn.onclick = function () { showBday(false); };
  } else {
    // টাইপিং সহ দেখানোর লজিক
    typeText(
      box,
      birthdayLines[bday],
      function () {

        bday++;

        btn.textContent =
          "Continue ✨";

        btn.style.display =
          "inline-flex";

        btn.onclick = function () { showBday(false); };
      }
    );
  }
}


/* =========================
   CELEBRATION
========================= */

function goToCelebration() {

  showPage("celebrationScene");

  document.getElementById("celebrationMessage").innerHTML =
    "";

  document.getElementById("celebrationContinueBtn").style.display =
    "none";

  document.getElementById("makeWishBtn").style.display =
    "inline-flex";

  document.getElementById("celebrationConfetti").innerHTML =
    "";
}


function startCelebration() {

  const wishButton =
    document.getElementById("makeWishBtn");

  const message =
    document.getElementById("celebrationMessage");

  const continueBtn =
    document.getElementById("celebrationContinueBtn");

  wishButton.style.display =
    "none";

  message.innerHTML =
    `
    <p class="wishMoment">
      Close your eyes... 🤍<br><br>
      Make a wish. ✨
    </p>
    `;

  createConfetti();

  addTimer(
    setTimeout(function () {

      message.innerHTML =
        `
        <p class="wishMoment">
          And now... make it come true. ❤️
        </p>
        `;

    }, 2200)
  );

  addTimer(
    setTimeout(function () {

      continueBtn.style.display =
        "inline-flex";

    }, 4200)
  );
}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

  const container =
    document.getElementById("celebrationConfetti");

  const pieces =
    ["✦", "✧", "♡", "✿", "⋆", "♥"];

  container.innerHTML = "";

  for (let i = 0; i < 40; i++) {

    const piece =
      document.createElement("span");

    piece.textContent =
      pieces[
        Math.floor(
          Math.random() * pieces.length
        )
      ];

    piece.style.left =
      Math.random() * 100 + "%";

    piece.style.animationDelay =
      Math.random() * 2 + "s";

    piece.classList.add(
      "confettiPiece"
    );

    container.appendChild(piece);
  }
}


/* =========================
   CELEBRATION → FINAL MESSAGE
========================= */

function goToFinalMessage() {
  showPage("ultimateEnding", 0);

  const box = document.getElementById("ultimateText");
  box.innerHTML = "";

  const finalLines = [
    "I don't know what the future holds for us...",
    "But I'm really glad that, somehow, our paths crossed again. 🤍",
    "From a classroom argument to endless midnight conversations...",
    "কী সুন্দর একটা little journey হয়ে গেছে, তাই না? ❤️",
    "আর যদি আজ তোর জন্য একটা wish করতে পারতাম...",
    "তাহলে চাইতাম, life তোকে ঠিক সেই happiness টাই দিক, যেটা তুই unknowingly আমার জীবনে নিয়ে এসেছিস। 🤍",
    "This whole little world you just walked through...",
    "এটা শুধু একটা website ছিল না।",
    "এটা ছিল আমার মনে জমে থাকা কিছু কথা... শুধু তোর জন্য। ❤️",
    "21 August  তোর day, আর somehow এখন আমার কাছেও এই দিন টি special একটা দিন।",
    "সবসময় happy থাকিস। হাসিস। আর নিজের মতোই থাকিস। 🤍",
    "— From someone who's really glad you found your way back. ❤️"
  ];

  let currentLine = 0;

  function typeFinalLine() {
    if (currentLine >= finalLines.length) {
      return;
    }

    const paragraph = document.createElement("p");
    paragraph.className = "finalTypingLine";
    box.appendChild(paragraph);

    paragraph.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    const text = finalLines[currentLine];
    let i = 0;

    const typing = setInterval(function () {
      paragraph.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(typing);
        currentLine++;
        setTimeout(function () {
          typeFinalLine();
        }, 1200);
      }
    }, 45);
  }

  setTimeout(function () {
    typeFinalLine();
  }, 1000);
}


/* PAGE LOAD */
window.addEventListener("load", function () {
  pageHistoryArray = ["welcome"];
  showPage("welcome");
});
