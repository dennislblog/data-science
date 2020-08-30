
## Boston

```python

import paddle.fluid as fluid
import paddle
import numpy as np
import os
import matplotlib.pyplot as plt

##### config ###############################################################################
BUF_SIZE = 500
BATCH_SIZE = 20
use_cuda = True
##### data #################################################################################
train_reader = paddle.batch( paddle.reader.shuffle(paddle.dataset.uci_housing.train(), 
                          buf_size=BUF_SIZE),batch_size=BATCH_SIZE)   
test_reader = paddle.batch( paddle.reader.shuffle(paddle.dataset.uci_housing.test(),
                          buf_size=BUF_SIZE), batch_size=BATCH_SIZE)  
##### network ##############################################################################
x = fluid.layers.data(name='x', shape=[13], dtype='float32')
y = fluid.layers.data(name='y', shape=[1], dtype='float32')
y_predict=fluid.layers.fc(input=x,size=1,act=None)
cost = fluid.layers.square_error_cost(input=y_predict, label=y) 
avg_cost = fluid.layers.mean(cost)                             
##### optimizer ############################################################################
optimizer = fluid.optimizer.SGDOptimizer(learning_rate=0.001)
opts = optimizer.minimize(avg_cost)
##### initialize network ###################################################################
test_program = fluid.default_main_program().clone(for_test=True)
#####  ###################################################################

```
