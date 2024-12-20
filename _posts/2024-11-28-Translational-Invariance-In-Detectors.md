I got this bladder grasshopper in a Bus heading from Tenkasi to Tirunelveli.
It became the RoI in my object detection work! Seeing my shaky hands on the bus and the grasshopper balancing, I wondered how object detection algorithms handle translational variance 🤔

<video width="100%" height="auto" controls>
  <source src="videos/TInvarianceInDet/vid.mp4" type="video/mp4">
GHopper Detected
</video> 


The wide categories of Object Detectors are, 
1. Two Stage Detectors (RCNN, Fast RCNN, Faster RCNN and etc,.)
2. Single Stage Detectors (SSD, YOLO, RetinaNet and etc,.)

Let's see how do they achieve Translational Invariance.

Two Stage Detector works by, region proposals, followed by classification and bouding box regression. Since, the regions are proposed, I guess there could be no translation variance, because, proposed regions are CROPPED REGIONS focusing only on the object of interest 💡

Single Stage Detector works by, direct local feature extraction. For example, if a filter is trained to recognize the grasshopper on the left side of the image, it can detect the same grasshopper on the right side because the same filter is applied across the entire feature map. So, No translational variance or prehaps retarded 💡

Enjoy The Yellow Bounding Box around The Green Grasshopper!
