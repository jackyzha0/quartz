---
title: "Basic PP Node"
tag:
date: 2023-08-18
draft: true
---

```python
#!/usr/bin/env python

import rospy
from sensor_msgs.msg import PointCloud2
import sensor_msgs.point_cloud2 as pc2
import numpy as np
import os
import tempfile

from mmdet3d.apis import inference_detector, init_model
from mmdet3d.registry import VISUALIZERS

class PPNode:

    def __init__(self):
        # ROS Node setup
        rospy.init_node('pp_node', anonymous=True)
        self.subscriber = rospy.Subscriber('/os3_cloud_node/points', PointCloud2, self.callback)
        
        # MMDetection3D setup
        self.config = rospy.get_param('~config')
        self.checkpoint = rospy.get_param('~checkpoint')
        self.device = rospy.get_param('~device', 'cuda:0')
        self.score_thr = rospy.get_param('~score_thr', 0.0)
        self.out_dir = rospy.get_param('~out_dir', 'demo')

        self.model = init_model(self.config, self.checkpoint, device=self.device)
        self.visualizer = VISUALIZERS.build(self.model.cfg.visualizer)
        self.visualizer.dataset_meta = self.model.dataset_meta

    def callback(self, data):
        # Convert PointCloud2 to .bin format
        pc = pc2.read_points(data, field_names=("x", "y", "z"), skip_nans=True)
        pc_array = np.array(list(pc))
        
        # Create a temporary bin file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.bin') as tmp_file:
            pc_array.tofile(tmp_file.name)

            # Inference
            result, data = inference_detector(self.model, tmp_file.name)
            points = data['inputs']['points']
            data_input = dict(points=points)

            print(result)

            # Visualize
            
            self.visualizer.add_datasample(
                'result',
                data_input,
                data_sample=result,
                draw_gt=False,
                show=True,
                wait_time=0,
                out_file=self.out_dir,
                pred_score_thr=self.score_thr,
                vis_task='lidar_det'
            )
            

            # Cleanup
            os.unlink(tmp_file.name)

    def spin(self):
        rospy.spin()

if __name__ == '__main__':
    node = PPNode()
    node.spin()
```