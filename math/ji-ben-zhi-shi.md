# 基本知识

## 基本微分

| 函数  | 微分 |
| :------------- | -------------: |
| $y = \log_a x$ | $y' = (x\ln a)^{-1}$ |
| $y = \arctan x$ | $y' = (1+x^2)^{-1}$|
| $y = a^x$ | $y^{(n)} = a^x \ln^n a (a > 0)$ |
| $y = \sin(kx)$ | $y^{(n)} = k^n\sin(kx + n\cdot \frac{\pi}{2})$|
| $y = \cos(kx)$ | $y^{(n)} = k^n\cos(kx + n\cdot \frac{\pi}{2})$|


## 泰勒公式


$$ f(x) = f(x_0) + f'(x_0)(x-x_0) + \frac{1}{2!}f''(x_0)(x-x_0)^2 + \cdots + \frac{1}{n!}f^{n}(x_0)(x-x_0)^n + R_n(x)$$
如果令$x_0 = 0$, 就是一个对$f(x)$的估计

常见函数的泰勒展开式

$$\begin{align*}
e^x &=1+x+\frac{1}{2!}{x}^{2}+\cdots +\frac{1}{n!}{x}^{n}+o({x}^{n}) \cr
\sin x &=x-\frac{1}{3!}{x}^{3}+\cdots +\frac{x}^{n}{n!}\sin \frac{n\pi }{2}+o({x}^{n}) \cr
\cos x &=1-\frac{1}{2!}{x}^{2}+\cdots +\frac{x}^{n}{n!}\cos \frac{n\pi }{2}+o({x}^{n}) \cr
\ln (1+x) &=x-\frac{1}{2}{x}^{2}+\frac{1}{3}{x}^{3}-\cdots +{(-1)}^{n-1}\frac{x}^{n}{n}+o({x}^{n}) \cr
(1+x)^m &=1+mx+\frac{m(m-1)}{2!}{x}^{2}+\cdots+\frac{m(m-1)\cdots (m-n+1)}{n!}{x}^{n}+o({x}^{n})
\end{align*}$$

