---
title: Essence of React 
---
React is a frontend library created by a team in Facebook. I won’t write more history. All I and you remember whenever someone says “ReactJS”, is a logo of rotating atom.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*NeU9lVIQLyrjRpoB.gif" width="100%">
This article will talk of almost all features in ReactJS. It is a great article for a fresher to startup their frontend architect journey. My Mind: Let’s stop talking and start learning!

### SPEND 2 MINS FOR SET-UP PLEASE!
You must have Node >= 14.0.0 and npm >= 5.6 installed on your machine. To create a react project, run:

    > npx create-react-app my-react

Once the react project is created, you will see a folder of my-react. Besides, you will see a message of “Happy Hacking” in the terminal… That’s why every React Developer is a hacker!!! 😂

Get into the folder and type npm start.

    > cd my-react

    > npm start

Now, the famous icon of atom rotation comes in front of our face…

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*UlvuUnOSvMQIpWROHDZ75Q.png" width="100%">
That’s it dude! You just set it up!

### Look at App.js and play with it!
You will see lot of files generated. All we need for now is, App.js.

<img src="https://miro.medium.com/v2/resize:fit:1108/format:webp/1*JTLdf5qs3MK11lCl-fpPhA.png" width="100%">
The code in it will be like:

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_rFPgxkyBsCwd3RscxRVqQ.png" width="100%">
Simply edit it. I just want to display, “HELLO SOUTHERN BOY”. So, let’s edit it. I would like to remove all the contents inside return statement.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IiZH_a7wbMl08H9EHRgytw.png" width="100%">
Now, the rotating atom won’t be there. We’ll see the heading, “HELLO SOUTHERN BOY!” displayed or rendered.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*YkhEz6q4Aa4c1gklKil99A.png" width="100%">
Still, we have some styles (font-family) applied to the rendered text. It’s because of the index.js. Why do we need index.js separately?

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*dM2a34nNSSSmV28Art1uQQ.png" width="100%">
Our App.js is written into index.html by index.js. This single, simple sentence describes the flow of A React Application. Here, we have the index.css imported which applies some styles to the index.html. Let’s remove that import statement and get rid of those styles! (Actually I like that font but just wanted to remove it! 🤥)

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ckcsD0dFlVEkdRGQujVfOg.png" width="100%">
Let’s see the Southern Boy now!

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3JkbOHp-GTNWCWeOrU1oeA.png" width="100%">

### WRAP IT UP OR YOU WILL BE ACCOUNTABLE!
Wrap the elements in a top-level component! Let’s consider an example where we don’t:

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2EBoCYpGQY3_B_XZkyw9Fw.png" width="100%">
Dude… We return something! If we return just one element, the remaining won’t even be touched. So, it’s essential to wrap the elements inside a top level container or a parent element.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2_TAQu1CULXstW56zoJ24w.png" width="100%">
But, do we need this division just to hold these inner elements? We create extra nodes in The DOM Tree. Why do we need to create extra nodes in The DOM? Just to wrap the elements? Grouping shouldn’t be a overhead!
To overcome this, React provides us the so called, Fragments.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2_TAQu1CULXstW56zoJ24w.png" width="100%">
Now, should we actually need to type, <React.Fragment> and </React.Fragment> just to group elements? 😂 Just use <> and </> instead of those tails of marsupilami! Just wrap with two diamonds!

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7J_Ok2fyDT2f-Kkamz0yWA.png" width="100%">
Where is our grouped output?

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h1GI5nBJ48pRhCZr-V_P1g.png" width="100%">
The Southen Boy doesn’t have “R” 😭 Let the southern boy correct it!

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZZkWsbE6jSGVnsT7YNbH4g.png" width="100%">

### COMPONENTS
Hope you see the image given below. It is a screenshot of my instagram profile page (Don't take it as a shameless self-promotion 😂).

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IUr7HpRF1ywjgALQoQlzZw.png" width="100%">
Component 1: We have a division for the stuffs like the logo of Instagram, a button for Log in and a link for Signing up.

Component 2: In the second division (after the horizontal line), We have the profile details including the profile picture of the southern boy (world wide handsome? 🤔) and also his name, a follow button, number of posts, followers and following in one row, his customizable name in next row, bio and a link to his page in the subsequent rows.

We totally have two components here in this page. Component is simply a grouping or a logical division. In Instagram, we have a component for stories, one for the feed, one for post and so on. We can divide a page into components. We actually code the page that way! We make logical groupings and put them in the page.
Now, let’s make the first component shown in the above image.

<img src="https://miro.medium.com/v2/resize:fit:1372/format:webp/1*bErX-RgeCxBjdkaseszU4A.png" width="100%">
We render our FirstComponent inside the App Component. Here, App is the container-component that just holds the components in a order we specify.

<img src="https://miro.medium.com/v2/resize:fit:884/format:webp/1*5d9FQQLZSg1nt-xWxUt7hQ.png" width="100%">
But, do we actually have this in our Instagram page? Now, we need a division with a className of whatever you want (‘first’ in my class).

<img src="https://miro.medium.com/v2/resize:fit:1084/format:webp/1*DZTgA-d2JDAgESzlZe2vqg.png" width="100%">
The syntax we use here in ReactJS is called, JSX which is a combination of HTML and JS. So, we can’t use class attribute which is already there in JS. That’s why we use className. Let’s add some styles in App.css.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mqbh6NbIMVnsCtYSVa6gcg.png" width="100%">
Now, the output would be like:

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ig0ThiTNCbEcPWK-aBvYMA.png" width="100%">
Well! But… Okay.. let’s wrap the button and the hyperlink in a tag.

<img src="https://miro.medium.com/v2/resize:fit:1176/format:webp/1*fGGHNE4glUNRyP4BYzlfaw.png" width="100%">
Now, the page will be:

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fmj6XSy1DHYl6syDDpVa3g.png" width="100%">
It’s okay than before. Let’s not focus on CSS for now… 🤫
Let’s create the second component which consists of the profile image, name, bio and so on and group them for simple styling.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KCEzj1TgHb3xkgXKLUhSSA.png" width="100%">
We are using an img tag here. To import an image, we have to use the following import statement:

<img src="https://miro.medium.com/v2/resize:fit:1344/format:webp/1*OAFIr4HzV5QPFglyiJ1-_g.png" width="100%">
The image “profile.jpg” is present there in images folder.

<img src="https://miro.medium.com/v2/resize:fit:1228/format:webp/1*X0VGuz4_IRkvvVcXjiRjGA.png" width="100%">
Now, if you check the screen, a simple instagram profile header is ready!

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*YGJ6eod4u8kVQtJ1dprkng.png" width="100%">
I hope you can understand what actually a component is… It’s simply a segment of a web-page.

### PROPS
Imagine a use case where we have to display the same component but with different images. We have our second component… How can we display the same component multiple times with different images? Should we need to write the same code again and again as we do in HTML? NO! It’s REACT JS! The answer is, we can use props.

Now, I have some more images. I want three profile headers with different images. I can use the existing code again and again. Let me first import the images.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*OEC8HXFUB5Rw1xt9ZUWCEA.png" width="100%">
Now, let’s nest the SecondComponent inside the App Component.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*whG_MJ5PWEdOOg2xSDjG7w.png" width="100%">
We have nested the SecondComponent again and again. This is actually the code reusability… We have passed the different images as props to the SecondComponent. The img is the props variable. We use the <hr /> element which is actually a horizontal rule (line). In React, tags such as hr, br are self closing tags. (They have a trailing /)

Now, in the SecondComponent, we use props object. The props object holds the passed props. In our case, we have img.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uInkzdVNfwF2auBx1xsE2A.png" width="100%">
As you can see, we have <img src= {props.img} alt=’Profile Picture’/>.

<img src="https://miro.medium.com/v2/resize:fit:1200/format:webp/1*Ype5Lo57-Za1b7vyFVQTbw.gif" width="100%">
You can also change name, bio and everything! We utilise the existing code of SecondComponent as a Template.

### STATES
State is specific to a component (mostly). In our example, the button “Follow” indicates that we are yet to follow the user. If we click that button, it should become “Following”. This is where we can use States. Initially, when we don’t follow the user, the state is “Follow”. On clicking the button, we have to change the state to “Following”. Plus, we have to display the button text accordingly.
Let’s use a hook called, useState.

<img src="https://miro.medium.com/v2/resize:fit:1344/format:webp/1*gGcbD23BStKBYWnAeVU_kw.png" width="100%">
We’ll not talk of the hooks in detail here. useState is a simple state management hook by means of which, we can manage state. It returns the passed state and a function that can only change the state.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gkxcEtB3IyZ0Mw6j3c3Alw.png" width="100%">
Here, in this code, we have a useState that takes “Follow”, the initial state. It will return the same state value and a function that can change this state. We have destructed it as [followed, setFollowed]. Now, the value in followed is “Follow”. We can use setFollowed to change the state to whatever we want. When we click the Follow button, we have to change the state as desired. The button has the text of {followed} which is the text in the state variable followed. The button element does these all:
<button onClick = { ()=> { setFollowed("Following") } > { followed } </button>

<img src="https://miro.medium.com/v2/resize:fit:1200/format:webp/1*egVb04vLuVO6qewxELdKdw.gif" width="100%">
The problem now is, we can’t actually toggle the button. We can’t unfollow here (I don’t leave my followers go… 🤗)
To toggle, we need to write a toggle logic. Let’s write a separate function for handling click inside the SecondComponent.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NdD5EWXCzNqOkHiL3ACFcg.png" width="100%">
That’s it! We have covered the essence of “Components, States, Props”!

<img src="https://miro.medium.com/v2/resize:fit:1200/format:webp/1*56vXjqmpXsmB_p0MhnvClQ.gif" width="100%">
NANDRI!
