document.addEventListener('DOMContentLoaded', function() {
    // 1. Element Selection
    const checkButton = document.getElementById('checkButton');
    const resultElement = document.getElementById('result');
    const inputElement = document.getElementById('checkNum');

    // 2. Event Listener**
    checkButton.addEventListener('click', checkNumberStatus);

    // This is the function that runs when the button is clicked.
    function checkNumberStatus() {
        // Get the value and convert it to a floating-point number
        const number = parseFloat(inputElement.value);

        let statusMessage = "";
        let statusClass = "";
        
        // 3. Conditional Statements (`if/else if/else`)
        if (number > 0) {
            statusMessage = "The number is **POSITIVE**.";
            statusClass = "positive";
            
        } else if (number < 0) {
            statusMessage = "The number is **NEGATIVE**.";
            statusClass = "negative";
            
        } else if (number === 0) {
            statusMessage = "The number is Neutral (Zero).";
            statusClass = "Neutral";

        } else {
            statusMessage = "Please enter a valid number.";
            statusClass = ""; // Clear class for invalid input
        }

        // 4. **DOM Manipulation / Output**
        // Update the text and the CSS class of the result element
        resultElement.textContent = statusMessage;
        resultElement.className = statusClass;
    }
});