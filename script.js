
// SELECT THE BUTTONS AND POEM ELEMENTS

const windButton = document.getElementById("windButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

const stanzas = document.querySelectorAll(".stanza");

// SAVE THE ORIGINAL ORDER OF EVERY STANZA

const originalPoem = [];

stanzas.forEach((stanza) => {
    const lines = Array.from(stanza.querySelectorAll(".poem-line"));

    originalPoem.push(lines.map((line) => line.textContent));
});


// FUNCTION TO SHUFFLE THE POEM LINES

function shuffleLines(lines) {

    const shuffled = [...lines];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] =
            [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}


// WIND BUTTON: RANDOMLY REARRANGE THE LINES

windButton.addEventListener("click", () => {

    stanzas.forEach((stanza) => {

        const lines = Array.from(
            stanza.querySelectorAll(".poem-line")
        );

        const original = lines.map((line) => line.textContent);

        let shuffled = shuffleLines(original);

        // Make sure the new arrangement is different
        if (shuffled.every((line, index) => line === original[index])) {
            shuffled = [
                ...shuffled.slice(1),
                shuffled[0]
            ];
        }

        // Update the poem with the new arrangement
        lines.forEach((line, index) => {
            line.textContent = shuffled[index];

            // Restart the visual animation
            line.style.animation = "none";
            void line.offsetWidth;
            line.style.animation = "appear 0.8s ease both";
        });

    });

    message.textContent =
        "The wind has changed the order. Every moment finds a new place.";
});


// RESET BUTTON: RESTORE THE ORIGINAL POEM

resetButton.addEventListener("click", () => {

    stanzas.forEach((stanza, stanzaIndex) => {

        const lines = stanza.querySelectorAll(".poem-line");

        lines.forEach((line, lineIndex) => {

            line.textContent =
                originalPoem[stanzaIndex][lineIndex];

            line.style.animation = "none";
            void line.offsetWidth;
            line.style.animation = "appear 0.8s ease both";
        });

    });

    message.textContent =
        "The poem has returned to its original form.";
});
