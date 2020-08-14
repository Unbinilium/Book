---
title: Algorithm
---

In mathematics and computer science, an algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation. I write some programs or special ideas here, both classical algorithms and Leet-Code problems are included.

## Vector Rotation

In linear algebra, a rotation matrix is a matrix that is used to perform a rotation in Euclidean space.

### Point to Point

Rotate *P(x, y)* rounded the *O(o_x, o_y)* with angle `theta`, the new *P'* is *(x_r, y_r)*. 

```python
def rotate(x, y, o_x, o_y, theta):
    x_r = math.cos(theta) * (x - o_x) - math.sin(theta) * (y - o_y) + o_x
    y_r = math.sin(theta) * (x - o_x) + math.cos(theta) * (y - o_y) + o_y
    return [x_r, y_r]
```
