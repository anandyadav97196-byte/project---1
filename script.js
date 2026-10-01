/* =====================================================
   FLASHCARD QUIZ APP
   Beginner Level JavaScript
   ===================================================== */


/* =====================================================
   1. FLASHCARD DATA
   ===================================================== */

let flashcards = [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language."
    },

    {
        question: "What is CSS?",
        answer: "CSS stands for Cascading Style Sheets."
    },

    {
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language used to make web pages interactive."
    }
];


/* =====================================================
   2. CURRENT CARD
   ===================================================== */

let currentCard = 0;


/*
    This variable tells us whether
    the answer is currently visible.
*/

let answerVisible = false;


/*
    This variable tells us whether
    we are editing a card.
*/

let editingIndex = -1;


/* =====================================================
   3. GET HTML ELEMENTS
   ===================================================== */

const questionElement = document.getElementById("question");

const answerElement = document.getElementById("answer");

const cardNumberElement = document.getElementById("cardNumber");

const totalCardsElement = document.getElementById("totalCards");

const showAnswerBtn = document.getElementById("showAnswerBtn");

const previousBtn = document.getElementById("previousBtn");

const nextBtn = document.getElementById("nextBtn");

const questionInput = document.getElementById("questionInput");

const answerInput = document.getElementById("answerInput");

const saveBtn = document.getElementById("saveBtn");

const cancelBtn = document.getElementById("cancelBtn");

const formTitle = document.getElementById("formTitle");

const cardList = document.getElementById("cardList");


/* =====================================================
   4. DISPLAY CURRENT FLASHCARD
   ===================================================== */

function showCard() {

    /*
        Check whether there are any flashcards.
    */

    if (flashcards.length === 0) {

        questionElement.textContent =
            "No flashcards available.";

        answerElement.textContent =
            "Add your first flashcard below.";

        cardNumberElement.textContent = "0";

        totalCardsElement.textContent = "0";

        showAnswerBtn.disabled = true;

        previousBtn.disabled = true;

        nextBtn.disabled = true;

        return;
    }


    /*
        Make sure currentCard
        stays inside valid range.
    */

    if (currentCard < 0) {
        currentCard = 0;
    }


    if (currentCard >= flashcards.length) {
        currentCard = flashcards.length - 1;
    }


    /*
        Get current flashcard.
    */

    const card = flashcards[currentCard];


    /*
        Display question.
    */

    questionElement.textContent = card.question;


    /*
        Initially hide answer.
    */

    answerElement.textContent =
        "Click \"Show Answer\" to see the answer.";


    answerVisible = false;


    /*
        Update button text.
    */

    showAnswerBtn.textContent = "Show Answer";


    /*
        Update card counter.
    */

    cardNumberElement.textContent =
        currentCard + 1;

    totalCardsElement.textContent =
        flashcards.length;


    /*
        Enable / disable navigation buttons.
    */

    previousBtn.disabled =
        currentCard === 0;

    nextBtn.disabled =
        currentCard === flashcards.length - 1;

    showAnswerBtn.disabled = false;
}


/* =====================================================
   5. SHOW / HIDE ANSWER
   ===================================================== */

function toggleAnswer() {

    /*
        If answer is currently hidden,
        show it.
    */

    if (answerVisible === false) {

        answerElement.textContent =
            flashcards[currentCard].answer;

        showAnswerBtn.textContent =
            "Hide Answer";

        answerVisible = true;
    }

    /*
        Otherwise hide the answer.
    */

    else {

        answerElement.textContent =
            "Click \"Show Answer\" to see the answer.";

        showAnswerBtn.textContent =
            "Show Answer";

        answerVisible = false;
    }
}


/* =====================================================
   6. NEXT CARD
   ===================================================== */

function nextCard() {

    /*
        Check whether next card exists.
    */

    if (currentCard < flashcards.length - 1) {

        currentCard++;

        showCard();
    }
}


/* =====================================================
   7. PREVIOUS CARD
   ===================================================== */

function previousCard() {

    /*
        Check whether previous card exists.
    */

    if (currentCard > 0) {

        currentCard--;

        showCard();
    }
}


/* =====================================================
   8. ADD / EDIT FLASHCARD
   ===================================================== */

function saveFlashcard() {

    /*
        Get values from input fields.
    */

    const question =
        questionInput.value.trim();

    const answer =
        answerInput.value.trim();


    /*
        Validate question.
    */

    if (question === "") {

        alert("Please enter a question.");

        questionInput.focus();

        return;
    }


    /*
        Validate answer.
    */

    if (answer === "") {

        alert("Please enter an answer.");

        answerInput.focus();

        return;
    }


    /* =================================================
       EDIT EXISTING CARD
       ================================================= */

    if (editingIndex !== -1) {

        flashcards[editingIndex].question =
            question;

        flashcards[editingIndex].answer =
            answer;


        /*
            Go to edited card.
        */

        currentCard = editingIndex;


        /*
            Reset edit mode.
        */

        editingIndex = -1;


        /*
            Change form back to Add mode.
        */

        formTitle.textContent =
            "Add New Flashcard";

        saveBtn.textContent =
            "Add Flashcard";


        /*
            Clear inputs.
        */

        questionInput.value = "";

        answerInput.value = "";


        /*
            Refresh display.
        */

        showCard();

        displayCardList();


        alert("Flashcard updated successfully.");

    }


    /* =================================================
       ADD NEW CARD
       ================================================= */

    else {

        const newCard = {

            question: question,

            answer: answer

        };


        /*
            Add new card to array.
        */

        flashcards.push(newCard);


        /*
            Show newly added card.
        */

        currentCard =
            flashcards.length - 1;


        /*
            Clear form.
        */

        questionInput.value = "";

        answerInput.value = "";


        /*
            Refresh UI.
        */

        showCard();

        displayCardList();


        alert("Flashcard added successfully.");
    }
}


/* =====================================================
   9. EDIT FLASHCARD
   ===================================================== */

function editFlashcard(index) {

    /*
        Check whether card exists.
    */

    if (
        index < 0 ||
        index >= flashcards.length
    ) {
        return;
    }


    /*
        Store index of card being edited.
    */

    editingIndex = index;


    /*
        Put existing values into form.
    */

    questionInput.value =
        flashcards[index].question;

    answerInput.value =
        flashcards[index].answer;


    /*
        Change form title.
    */

    formTitle.textContent =
        "Edit Flashcard";


    /*
        Change button text.
    */

    saveBtn.textContent =
        "Save Changes";


    /*
        Scroll to form.
    */

    document
        .querySelector(".form-container")
        .scrollIntoView({
            behavior: "smooth"
        });


    /*
        Focus question field.
    */

    questionInput.focus();
}


/* =====================================================
   10. DELETE FLASHCARD
   ===================================================== */

function deleteFlashcard(index) {

    /*
        Check whether card exists.
    */

    if (
        index < 0 ||
        index >= flashcards.length
    ) {
        return;
    }


    /*
        Ask user for confirmation.
    */

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this flashcard?"
        );


    /*
        Stop if user clicks Cancel.
    */

    if (!confirmDelete) {
        return;
    }


    /*
        Remove card from array.
    */

    flashcards.splice(index, 1);


    /*
        Handle empty flashcard list.
    */

    if (flashcards.length === 0) {

        currentCard = 0;

    }

    else {

        /*
            If deleted card was the last card,
            move to previous card.
        */

        if (
            currentCard >= flashcards.length
        ) {

            currentCard =
                flashcards.length - 1;
        }
    }


    /*
        Reset edit mode if needed.
    */

    editingIndex = -1;


    /*
        Reset form.
    */

    questionInput.value = "";

    answerInput.value = "";

    formTitle.textContent =
        "Add New Flashcard";

    saveBtn.textContent =
        "Add Flashcard";


    /*
        Refresh UI.
    */

    showCard();

    displayCardList();


    alert("Flashcard deleted successfully.");
}


/* =====================================================
   11. DISPLAY FLASHCARD LIST
   ===================================================== */

function displayCardList() {

    /*
        Clear existing list.
    */

    cardList.innerHTML = "";


    /*
        If no cards exist.
    */

    if (flashcards.length === 0) {

        cardList.innerHTML = `
            <p class="empty-message">
                No flashcards available.
                Add your first flashcard!
            </p>
        `;

        return;
    }


    /*
        Create each card.
    */

    flashcards.forEach(function (card, index) {

        /*
            Create card container.
        */

        const cardItem =
            document.createElement("div");

        cardItem.className =
            "card-item";


        /*
            Create card information.
        */

        const cardInfo =
            document.createElement("div");

        cardInfo.className =
            "card-info";


        /*
            Create question.
        */

        const question =
            document.createElement("strong");

        question.textContent =
            card.question;


        /*
            Create answer preview.
        */

        const answer =
            document.createElement("p");

        answer.textContent =
            card.answer;


        /*
            Add question and answer.
        */

        cardInfo.appendChild(question);

        cardInfo.appendChild(answer);


        /*
            Create action buttons container.
        */

        const cardActions =
            document.createElement("div");

        cardActions.className =
            "card-actions";


        /*
            Create Edit button.
        */

        const editButton =
            document.createElement("button");

        editButton.textContent =
            "Edit";

        editButton.className =
            "edit-btn";


        /*
            Edit button click.
        */

        editButton.addEventListener(
            "click",
            function () {

                editFlashcard(index);

            }
        );


        /*
            Create Delete button.
        */

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Delete";

        deleteButton.className =
            "delete-btn";


        /*
            Delete button click.
        */

        deleteButton.addEventListener(
            "click",
            function () {

                deleteFlashcard(index);

            }
        );


        /*
            Add buttons.
        */

        cardActions.appendChild(editButton);

        cardActions.appendChild(deleteButton);


        /*
            Add information and buttons.
        */

        cardItem.appendChild(cardInfo);

        cardItem.appendChild(cardActions);


        /*
            Add complete card to list.
        */

        cardList.appendChild(cardItem);

    });
}


/* =====================================================
   12. CANCEL EDIT
   ===================================================== */

function cancelEdit() {

    /*
        Clear form.
    */

    questionInput.value = "";

    answerInput.value = "";


    /*
        Reset edit mode.
    */

    editingIndex = -1;


    /*
        Reset form title.
    */

    formTitle.textContent =
        "Add New Flashcard";


    /*
        Reset save button.
    */

    saveBtn.textContent =
        "Add Flashcard";
}


/* =====================================================
   13. BUTTON EVENTS
   ===================================================== */


/*
    Show Answer button
*/

showAnswerBtn.addEventListener(
    "click",
    toggleAnswer
);


/*
    Next button
*/

nextBtn.addEventListener(
    "click",
    nextCard
);


/*
    Previous button
*/

previousBtn.addEventListener(
    "click",
    previousCard
);


/*
    Add / Save button
*/

saveBtn.addEventListener(
    "click",
    saveFlashcard
);


/*
    Cancel button
*/

cancelBtn.addEventListener(
    "click",
    cancelEdit
);


/* =====================================================
   14. INITIALIZE APPLICATION
   ===================================================== */


/*
    Display first flashcard.
*/

showCard();


/*
    Display all flashcards.
*/

displayCardList();