Recently, I went to a barber shop, and it turned out to be a great analogy for understanding Generative AI (GenAI). I wanted my hair to look like the person in a picture I had from a year ago. Here’s the image I showed him:

<img src="https://raw.githubusercontent.com/arihara-sudhan/blog/main/img/post_images/GenerEight/h%23n(FGy229292929298.jpg" alt="" width="100%"  style="border-radius: 0.3rem;">

The barber began cutting my hair and asked if it was okay. I said, “It’s not even close! Please cut it more!” After another round of cutting, he asked again, and I told him to continue. After a short nap, he woke me up and asked if it was okay now. I said, “Yes, it looks good,” though it wasn’t an exact match.

<img src="https://raw.githubusercontent.com/arihara-sudhan/blog/main/img/post_images/GenerEight/h%23n(FGy219199.jpg" alt="aftercut" width="100%"  style="border-radius: 0.3rem;">

This process is a simple yet intuitive way to understand GenAI. The barber represents <b>The Generator</b>, who creates a content (an attractive haircut), while I am <b>The Discriminator</b>, providing feedback and asking for corrections. The barber kept adjusting until I was satisfied. This iterative process of generating and refining is akin to how GenAI works—continually adjusting and improving until the output meets the desired criteria.

<h3>GENERATOR (BARBER)</h3>
<div class="code">
  def make_generator_model():
    model = tf.keras.Sequential()
    model.add(layers.Dense(7*7*256, use_bias=False, input_shape=(100,)))
    model.add(layers.BatchNormalization())
    model.add(layers.LeakyReLU())
    model.add(layers.Reshape((7, 7, 256)))
    model.add(layers.Conv2DTranspose(128, (5, 5), strides=(1, 1), padding='same', use_bias=False))
    model.add(layers.BatchNormalization())
    model.add(layers.LeakyReLU())
    model.add(layers.Conv2DTranspose(64, (5, 5), strides=(2, 2), padding='same', use_bias=False))
    model.add(layers.BatchNormalization())
    model.add(layers.LeakyReLU())
    model.add(layers.Conv2DTranspose(1, (5, 5), strides=(2, 2), padding='same', use_bias=False, activation='tanh'))
    return model
</div>
<h3>DISCRIMINATOR (ARI)</h3>
