function updateClockAndGreeting() {
            let now = new Date();
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // HH:MM:SS
            let timeString = hour + ':' + minutes + ':' + seconds;

           
            let greeting;
            if (hour >= 5 && hour < 12) {
                greeting = 'Good Morning!';
            } else if (hour >= 12 && hour < 18) {
                greeting = 'Good Afternoon!';
            } else if (hour >= 18 && hour < 22) {
                greeting = 'Good Evening!';
            } else {
                greeting = 'Good Night!';
            }

            document.getElementById('greeting').textContent = greeting;
            document.getElementById('live-clock').textContent = timeString;
        }
        updateClockAndGreeting();
        setInterval(updateClockAndGreeting, 1000);