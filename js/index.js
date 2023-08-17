const messagesContent = $('.msgs-content');
const messageInput = $('.msg-input');
const messageSubmit = $('.msg-submit');
const avatarImage = 'eldorado.png';
const fakeMessages = [
    'Chào Thằng FA:), Chú mày cần gì?, đây là Robot AT!',
    'Hiện tại tin nhắn sẽ không được trả lời vui lòng liên hệ Facebook: https://facebook.com/tuannooddev nếu có bất kì vấn đề gì.'

];

let minutes = 0;

// Initialize scrollbar and display fake message on window load
$(window).on('load', function () {
    messagesContent.mCustomScrollbar();
    setTimeout(fakeMessage, 100);
});

// Update scrollbar to bottom and add timestamp
function updateScrollbar() {
    messagesContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
};

function addTimestamp() {
    const date = new Date();
    const minutesNow = date.getMinutes();

    if (minutes !== minutesNow) {
        minutes = minutesNow;
        const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);
        $('.msg:last').append(timeStamp);
    };
};

function addMessageToPage(msg, isPersonal = false) {
    const message = $('<div class="msg"></div>').text(msg);
    if (isPersonal) {
        message.addClass('msg-personal');
    } else {
        const figure = $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    };
    $('.mCSB_container').append(message);
    addTimestamp();
    updateScrollbar();
};

// Function to insert user message and trigger fake message after 1 second
function insertMessage() {
    const messageText = messageInput.val().trim();
    if (messageText === '') {
        return false;
    };
    addMessageToPage(messageText, true);
    messageInput.val(null);
    setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
};

// Message input and submit button event listener
messageInput.on('keydown', function (e) {
    // if user press enter, send message
    if (e.which === 13) {
        insertMessage();
        return false;
    };
});

messageSubmit.on('click', insertMessage);

// function to display loading message and replace with fake message after 1 - 2 second
function fakeMessage() {
    if (messageInput.val() !== '') {
        return false;
    };

    const loadingMessage = $('<div class="msg loading new"></div>');
    const figure = $('<figure class="avatar"></figure>');
    const image = $('<img>').attr('src', avatarImage);
    figure.append(image);
    loadingMessage.append(figure).append($('<span></span>'));
    $('.mCSB_container').append(loadingMessage);
    updateScrollbar();

    setTimeout(function () {
        loadingMessage.remove();
        addMessageToPage(fakeMessages.shift());
    }, 1000 + (Math.random() * 20) * 100);
}