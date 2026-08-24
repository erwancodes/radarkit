---
title: 'Reptile: A scalable meta-learning algorithm'
source: 'OpenAI'
topic: 'AI'
publishedAt: 2018-03-07T08:00:00.000Z
sourceUrl: 'https://openai.com/index/reptile'
tags: ['ai']
---

We’ve developed a simple meta-learning algorithm called Reptile which works by repeatedly sampling a task, performing stochastic gradient descent on it, and updating the initial parameters towards the final parameters learned on that task. Reptile is the application of the Shortest Descent algorithm to the meta-learning setting, and is mathematically similar to first-order MAML (which is a version of the well-known MAML algorithm) that only needs black-box access to an optimizer such as SGD or A

[Read the original source](https://openai.com/index/reptile)
