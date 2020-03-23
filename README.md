# Robust Object Detection based on Simultaneous Localization and Mapping and Segmentation with Deep Neural Network

> Introduce new 3D object detection with SLAM and Fusion.

## Abstract

We present an object detection system using 3d mapping, built with a Kinect camera for sensing an environment. The system introduces Simultaneous Localization and Mapping called SLAM for sensor pose estimation and large sets of map feature points. The Kinect camera is responsible to generates colour images and depth maps about the surrounding circumstance. From the maps, the system populates point clouds in the 3D world and segments the group of points as homogeneous objects. Based on the segmented objects, the system calculates the view projection of the object on the screen and starts to track them as activated objects. With additional algorithms, the iterative closest point and the threshold RGB, the system can achieve to extract a 3D geometry and a fitted 2D shape from the image frame as an independent model. The active model is maintained and managed with semantic cues even in overlapping situation.  The shape image separated from the background is sent to a deep neural network (DNN) for object detection. These all vision systems need to be done synchronously on sequential processing. We present experiments showing the availability of our approach.
