# ViT_for_FewShotLearning
Can we use Vision Transformers for FewShot Learning? Indeed!
<h1>Intraclass Variance : ViT vs ResNet50</h1>
<img src="https://github.com/arihara-sudhan/ViT_for_FewShotLearning/blob/main/imgs/photo-output.jpg?raw=true" alt="img-loss">
<span>
<h3>An Experiment : ResNet50 and ViT on High Intraclass Variance ☘️</h3>
The main goal here is to highlight the differences in performance between ResNet50 and the ViT model when dealing with data characterized by high intraclass variance, while noting their strengths in simpler datasets like MNIST and Omniglot. 👾
<br>In simple datasets such as MNIST and Omniglot, both models performed exceptionally well. Specifically, ResNet50 achieved an impressive accuracy rate of 99%, showcasing its prowess in capturing patterns effectively. In contrast, the ViT Model achieved a slightly lower accuracy of 96%. This outcome is understandable, as ResNet50 excels at pattern recognition in these low-intraclass variance datasets. 🦉<br>
However, when more complex data with high intraclass variance was introduced, the performance gap between the two models became more apparent. ResNet50's accuracy dropped significantly to 56%, demonstrating its struggle with the increased intraclass variance. On the other hand, the ViT Model's accuracy remained relatively higher at 77%, indicating its ability to comprehend the context and adapt to datasets with more variability. 📉
<br>
It's important to emphasize that both ResNet50 and the ViT Model have their unique strengths and weaknesses. A ViT Model may not be capable of accomplishing what a ResNet50 can do, and vice versa. Each model is optimized for specific tasks and scenarios, and their performance varies based on the nature of the data they are presented with. ❤️ 
</span><br>
<h3>Intuition of Triplet Loss and How we do it is <a href="https://www.mediafire.com/file/sntleqxee2cte9n/triptrans.pdf/file">HERE</a></h3>
<img src="https://arihara-sudhan.github.io/statics/triptrans.png" alt="cover">
<br>
<h3>Links to Datasets Used</h3>
<a href="https://www.kaggle.com/datasets/watesoyan/omniglot">Link to Omniglot Dataset</a><br>
<a href="https://www.kaggle.com/datasets/aravindariharasudhan/animals-insects-reptiles">Link to Animals Dataset</a>
