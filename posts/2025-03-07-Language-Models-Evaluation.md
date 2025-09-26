The Interesting Evaluation of Language Models! 🐲

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7303295816616615936?compact=1" 
    style="width: 100%; aspect-ratio: 16 / 9; border: none;" 
    allowfullscreen 
    title="Embedded post">
</iframe>

I always wondered about this scene in Jackie Chan Adventures (Season 3, Episode 15).

In this episode, Daolon Wong (Maayaavi) re-enters the Netherworld, hoping that Shendu will keep his promise to grant him the power of combustion. However, when Shendu is reborn on Earth, he sneers at Wong and explains that, although he is a noble dragon, he is also a Demon Sorcerer, thus, not known for keeping promises. 😂

The scene that truly inspired me when I was very young was, when Daolon Wong attacks Shendu with two different powers. Instead of being harmed, Shendu effortlessly absorbs them and sarcastically remarks that they were thoughtful birthday presents. 🐲

I wanted to be like Shendu in that moment. Life constantly throws challenges at us, but instead of being overwhelmed, we should absorb them, learn from them, and emerge stronger. If faced with a challenge, master it and stand firm! Our mindset should embrace it with a confident "Okay, bring it on!" 💥

Now, as I get deep-deep-deeper into learning about language models, I find an interesting connection between this scene and how we evaluate them. We shouldn’t keep testing a language model on the same test set. If we do, it may start recognizing patterns in the test set and act like it already knows the answers. This wouldn’t be a fair test but rather overfitting! Testing should happen only once or a few times at the end to get a true evaluation of real world data. 😃

Just like Shendu absorbs the powers aimed at attacking him, the model absorbs the patterns in the test set, which were meant to test it. 🐲

That’s why we use a development set (dev set) for evaluation, it is randomized for each evaluation, ensuring the model isn’t simply memorizing but truly learning.
