const text = [
  "အရာတိုင်းမှာ တန်ပြန်တုံ့ပြန်မှုဆိုတာ ရှိတယ် ချစ်သားရဲ့",
  "လိုသုံးရဲ့ အဓိပ္ပါယ်မှာကိုက ဂယက်အနက်ပါတယ် လိုမှသာသုံးမှာ",
  "ဆုံးရှုံးစရာမရှိတဲ့ အမှန်တရားကို အသည်းနှလုံးမှာ ရှာလိုက်ပါ",
  "ကံဆိုတာ ကိုယ်ပြုသမျှ တစ်ပတ်ပတ်ပြီး ပြန်လာမယ်",
  "မင်္ဂလာပါ အစ်ကိုတို့ အစ်မတို့ခင်ဗျာ လိုချင်တဲ့အရာအလုံးစုံကို ပိုင်ဆိုင်နိုင်ပါစေ",
  "အချစ်ဆိုတာ ဘဝတစ်ခုလုံးနဲ့တွက်ရင် တင်္ဒဂပါပဲ",
  "စိတ်ကူးတော့ လူတိုင်းမှာရှိကြတယ်၊ မရှိတာက အဲ့စိတ်ကူးကို တကယ်လုပ်ဖို့ပဲ",
  "ကမ္ဘာကကျဉ်းပါတယ် မကျဉ်းတာက ဒီလူ့နှလုံးသားပါ",
  "မြတ်စွာဘုရားက ပဋိကတ်သုံးပုံကို ပိုင်နိုင်ခဲ့တယ်",
  "အမှားများတဲ့ ကမ္ဘာကြီးထဲ မင်းနေနိုင်လို့လား",
];

const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//Display random quotes
const renderNewQuote = async () => {
  //Access quote
  var quote = text[Math.floor(Math.random() * text.length)];

  //Array of characters in the quote
  let arr = quote.split("").map((value) => {
    //wrap the characters in a span tag
    return "<span class='quote-chars'>" + value + "</span>";
  });
  //join array for displaying
  quoteSection.innerHTML += arr.join("");
};

//Logic for comparing input words with quote
userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  //Create an arrat from received span tags
  quoteChars = Array.from(quoteChars);

  //array of user input characters
  let userInputChars = userInput.value.split("");

  //loop through each character in quote
  quoteChars.forEach((char, index) => {
    //Check if char(quote character) = userInputChars[index](input character)
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    }
    //If user hasn't entered anything or backspaced
    else if (userInputChars[index] == null) {
      //Remove class if any
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    //If user enter wrong character
    else {
      //Checks if we alreasy have added fail class
      if (!char.classList.contains("fail")) {
        //increment and display mistakes
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
    //Returns true if all the characters are entered correctly
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    //End test if all characters are correct
    if (check) {
      displayResult();
    }
  });
});

//Update Timer on screen
function updateTimer() {
  if (time == 0) {
    //End test if timer reaches 0
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}

//Sets timer
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

//End Test
const displayResult = () => {
  //display result div
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + " %";
};

//Start Test
const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
