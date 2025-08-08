const light = document.getElementById("light");
const message = document.getElementById("message");
const speakBtn = document.getElementById("speakBtn");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

speakBtn.addEventListener("click", () => {
  recognition.start();
  message.textContent = "Listening...";
});

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  message.textContent = `You said: "${transcript}"`;

  if (transcript.includes("yes") || transcript.includes("truth")) {
    light.style.background = "green";
    light.style.boxShadow = "0 0 30px green";
    message.textContent += " → Detected: Truth ✅";
  } 
  else {
    light.style.background = "red";
    light.style.boxShadow = "0 0 30px red";
    message.textContent += " → Detected: Lie ❌";
  }
};

recognition.onerror = function(event) {
  message.textContent = "Error: " + event.error;
};
