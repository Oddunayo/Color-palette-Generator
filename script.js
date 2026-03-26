const refreshBtn = document.getElementById("refresh-btn");
const paletteContainer = document.getElementById("palette");

//1. The Generator function generatePalette()
const generatePalette = () => {
    //2. Clear the palette container before generating new colors
    paletteContainer.innerHTML = "";
    //3. Generate 5 random colors
    for (let i = 0; i < 5; i++) {
        //Generate a random hex color
        //math.random generates a decimal, we then multiply by the max hex value
        //tostring16 converts the number to a hexadecimal string
        let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
        //sometimes, the hex is lesser than 6, so we pad it with zeros
        randomHex = `#${randomHex.padStart(6, "0")}`;

        //Create the HTML elements for the color box and the color code
        const colorCard = document.createElement("li");
        colorCard.classList.add("color-card");

        colorCard.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
                               <span class="hex-text">${randomHex}</span>`;
        // Add click event to copy the color code to clipboard
        colorCard.addEventListener("click", () => copyColor(colorCard, randomHex));
        // Append the color card to the palette container
        paletteContainer.appendChild(colorCard);
    }
};
//4. Function to copy the color code to clipboard
const copyColor = (element, hex) => {
    const hexElement = element.querySelector(".hex-text");

    //navigator.clipboard.writeText(hex) is a modern API to write text to the clipboard
    navigator.clipboard.writeText(hex).then(() => {
        hexElement.innerText = "Copied!";
        setTimeout(() => (hexElement.innerText = hex), 1000);
    });
};
//5. Add event listener to the refresh button to generate a new palette
refreshBtn.addEventListener("click", generatePalette);
//6. Generate an initial palette when the page loads
generatePalette();
