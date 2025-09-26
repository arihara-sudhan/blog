### (1/4) A FewShot Experiment : ResNet50 and ViT on High Intraclass Variance
The main goal here is to highlight the differences in performance between ResNet50 and the ViT model when dealing with 
data characterized by high intraclass variance, while noting their strengths in simpler datasets like MNIST and Omniglot 👾

In simple datasets such as MNIST and Omniglot, both models performed exceptionally well. Specifically, ResNet50 achieved 
an impressive accuracy rate of 99%, showcasing its prowess in capturing patterns effectively. In contrast, the ViT Model 
achieved a slightly lower accuracy of 96%. This outcome is understandable, as ResNet50 excels at pattern recognition in 
these low-intraclass variance datasets. 🦉 

However, when more complex data with high intraclass variance was introduced, the performance gap between the two models became more apparent. ResNet50's accuracy dropped significantly to 56%, demonstrating 
its struggle with the increased intraclass variance. On the other hand, the ViT Model's accuracy remained relatively higher at 77%,
indicating its ability to comprehend the context and adapt to datasets with more variability. 📉

<img src='https://github.com/arihara-sudhan/arihara-sudhan.github.io/blob/main/statics/blog1.jpeg?raw=true' alt='imghere' width="100%">

It's important to emphasize that both ResNet50 and the ViT Model have their unique strengths and weaknesses. 
A ViT Model may not be capable of accomplishing what a ResNet50 can do, and vice versa. Each model is optimized for specific tasks and
scenarios, and their performance varies based on the nature of the data they are presented with. ❤️<br>
<a href='https://lnkd.in/gk9sf_hc'>Link to REPO</a>

### (2/4) FewShot Model tends to behave like A Classification Model??? 😲

<img src='https://github.com/arihara-sudhan/arihara-sudhan.github.io/blob/main/statics/blog2.jpeg?raw=true' alt='img' width="100%">

So, what I've been experimenting with is a FewShot model, and it turns out that its generalization depends on the number of unseen classes during testing. 
I initiated the experiment by training the model using a triplet setup with the MNIST images belonging to category 7, 8, and 9. 🍀
When I trained the model on just those three classes (7, 8, 9), it performed remarkably well, achieving an accuracy of 98%. 
However, as I introduced more unseen classes during testing, things got a bit trickier. Testing on two new classes (5, 6) still gave me a respectable 
accuracy of 90%. A Considerable Generalization! 🙂 
As I expanded the testing set to include three unseen classes (4, 5, 6), the accuracy dropped slightly to 89%.
It continued to drop as I included four unseen classes (3, 4, 5, 6), reaching 84%. The model started to struggle with entirely different classes. But then, something
interesting happened when I introduced class 1. Its similarity to class 7 helped the model, and the accuracy went up. 😃 

When testing with  six classes (1, 2, 3, 4, 5, 6), the accuracy was 81%. However, when I replaced class 1 with class 0, I noticed a drop in accuracy. 
Testing with these six classes (0, 2, 3, 4, 5, 6) gave me an accuracy of 77%. Six Unseen classes together (0, 1, 2, 3, 4, 5, 6) brought the accuracy
back up to 80%, but it still wasn't as high as when I started with just three classes (7, 8, 9). 🙃 

It appears that the model's generalization performance is influenced by the number of classes used during training. Introducing a greater number of classes during testing than what was used for training tends to confuse the model.
Let's consider training with a larger number of classes and, during testing, aim to keep the number of classes lower than those used in training to an extent!
<br><br>
Trained on 3 (7,8,9) CLASSES :98%
<br>
Testing on 2 (5,6) : 90% [K-MEANS : 89%]
<br>
Testing on 3 (4,5,6) : 89% [K-MEANS : 79%]
<br>
Testing on 4 (3,4,5,6) : 84% [K-MEANS : 70%]
<br>
Testing on 5 (2,3,4,5,6) : 79% [K-MEANS : 61%]
<br>
Testing on 6 (1,2,3,4,5,6) : 81% [K-MEANS : 64%]
<br>
Testing on 6 (0,2,3,4,5,6) : 77% [K-MEANS : 55%]
<br>
Testing on 7 (0,1,2,3,4,5,6) : 80% [K-MEANS : 63%]
<br><br>
Doubts may arise regarding whether a low number of classes leads to fewer mispredictions. This example illustrates the behavior of a few-shot model, 
which doesn't fall within our assumptions... 

<img src='https://github.com/arihara-sudhan/arihara-sudhan.github.io/blob/main/statics/blog3.png?raw=true' alt='img' width="100%">

### (3/4) Classification Model tends to behave like A FewShot Model??? 😲
While a classifier model may not excel in precisely classifying unseen classes (Completely Different Classes), it can demonstrate
the ability to create meaningful clusters for unknown classes. I trained a classifier on datasets containing classes of various shades of red, green, and blue.
The model efficiently grouped these colors into clusters resembling Starlink satellites. ⭐️

Subsequently, when I introduced classes featuring shades of orange, pink, and violet during testing , the model displayed a distinctive cluster formation.
Although not as potent as specialized few-shot techniques like Triplet or Contrastive Training, which are explicitly designed for such scenarios, 
this classifier performed admirably in identifying underlying patterns, particularly when dealing with simple image categories such as color shades.
Interesting! 😃

<img src='https://github.com/arihara-sudhan/arihara-sudhan.github.io/blob/main/statics/blog4.jpeg?raw=true' alt='img' width="100%">

### (4/4)💡 IDEA : Collaged Images as Embeddings in FewShot Learning!
In Few-Shot Learning, we conduct training to make the embeddings of similar samples closer to each other and dissimilar samples farther apart.
During testing, we need to extract embeddings for the samples by inputting them into the trained model. We require a database of embeddings where distinct clusters
for each class result from our training. When testing with samples, we search for the nearest embeddings of those samples and calculate accuracy based on this. (We have one grape fruit and search to which grape-cluster it belongs to 🍇)
This approach becomes resource-intensive when dealing with a large number of samples that need to be stored as embeddings. On the other hand, we cannot ignore any samples, as each contributes to achieving good results.
If we simply follow this approach, it becomes time-consuming to extract embeddings for all the samples, and memory usage also increases. 💀
I thought like: why not create collages of sample images, extract their embeddings, and store them in the database? This would reduce the space and time required, depending on the number of samples we need in a single image.
I conducted experiments with a simple dataset and achieved 99% accuracy using the conventional method with individual samples. However, it was resource-intensive. When I introduced collages (3x3) of samples, we reduced the number of samples, 
the time required for embedding extraction, and memory usage. The accuracy was still 99%!😍 

<img src='https://github.com/arihara-sudhan/arihara-sudhan.github.io/blob/main/statics/blog5.jpeg?raw=true' alt='img' width="100%">

Furthermore, we can observe that one embedding collectively represents the features of multiple images.  This way, misclustering is reduced to some extent when considering them collectively (Outliers Problem Solved 🤭).

> NON-COLLAGED EMBEDDINGS : TOTAL SAMPLES : 1621 | EMBEDDINGS EXTRACTION TIME : 35 SECONDS | SIZE OF EMBEDDINGS : 981 MB | ACCURACY : 99.01 % 

> COLLAGED EMBEDDINGS : TOTAL SAMPLES : 182 | EMBEDDINGS EXTRACTION TIME : 3 SECONDS | SIZE OF EMBEDDINGS : 105 MB | ACCURACY : 99.01 % <br>
    
