We guys must have played The Bounce Game in Nokia!
In fact, I could say like, it is the first adventurous game I have played!
<img src="https://raw.githubusercontent.com/arihara-sudhan/blog/main/img/post_images/Debouncing/bounce.gif" alt="" width="100%"  style="border-radius: 0.3rem;">
The ball there bounces once hits a wall!
In Electronics, If we have a switch or a button, when we turn it on, it may bounce back and forth, unwantedly causing some electrical touches and we could see the Bulb being glowing and offing frequently. We can control such button design by something called Debouncer. If you guys have interest in Electronics, [here you go](https://youtu.be/9h5OuOCE-m8?si=eUq8JIXyMy5WBFgc) to explore The SR Latch which avoids the bouncing of switches!

Now, let's come to our case!
When a user clicks on a button multiple times accidentally or intentionally(😈), we may need to handle those cases! A Button click may induce an API invocation!

If he/she clicks 6 times in a second like the up and down motion of bee's wings, well! The API threshold limit will be exceeded and nothing we can do!
Where is my button?
Here 🔘 is!

🔘 is clicked -----> API Request Sent 	
			0.20 seconds

🔘 is clicked -----> API Request Sent
			0.20 seconds

🔘 is clicked -----> API Request Sent
			0.21 seconds

🔘 is clicked -----> API Request Sent
			0.19 seconds

🔘 is clicked -----> API Request Sent
			0.20 seconds

🔘 is clicked -----> API LIMIT REACHED

So, how can we get rid of this? How can we control this bouncing effect? Actually, our UI buttons are working properly.. By bouncing, we mean this continuous invocations of API! So, how can we?
Simple!

Let me explain..
We need a timer to achieve this debouncing... 
HERE ⌛️ is!


Now, here is how we can implement the debouncing!

🔘 is clicked ----> ⌛ SET FOR 3 SECONDS ----> API Request will be sent after 3 SECONDS
			0.20 seconds
   
🔘 is clicked ----> Previous Timer is cleared & New ⌛ SET FOR 3 SECONDS ----> API Request will be sent after 3 SECS
			0.20 seconds
   
🔘 is clicked ----> Previous Timer is cleared & New ⌛ SET FOR 3 SECONDS ----> API Request will be sent after 3 SECS
			0.20 seconds
   
🔘 is clicked ----> Previous Timer is cleared & New ⌛ SET FOR 3 SECONDS ----> API Request will be sent after 3 SECS
			0.20 seconds
   
🔘 is clicked ----> Previous Timer is cleared & New ⌛ SET FOR 3 SECONDS ----> API Request will be sent after 3 SECS
			0.20 seconds
   
🔘 is clicked ----> Previous Timer is cleared & New ⌛ SET FOR 3 SECONDS ----> API Request will be sent after 3 SECS

AFTER 3 SECONDS -----> API Request Sent

Hey Hey! We made it! So, let's code it! 🙂
<img src="https://raw.githubusercontent.com/arihara-sudhan/blog/main/img/post_images/Debouncing/debouncing.png" alt="" width="100%"  style="border-radius: 0.3rem;">
It's applicable for something like the Input Boxes in React also! Where we set to perform something intensive for each changes! Remember! It's not only for API calls! It's for any intensive operations!
