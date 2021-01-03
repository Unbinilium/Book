---
title: Python
---

Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991.

## Dictionary

Each key is separated from its value by a colon `:`, the items are separated by commas, and the whole thing is enclosed in curly braces. An empty dictionary without any items is written with just two curly braces, like this: `{}`.

Keys are unique within a dictionary while values may not be. The values of a dictionary can be of any type, but the keys must be of an immutable data type such as strings, numbers, or tuples.

```python
dict = {'Name': 'Unbinilium', 'Age': 19, 'Location': 'Norway'}

dict.clear();     # remove all entries in dict
del dict['Name']; # remove entry with key 'Name'
del dict ;        # delete entire dictionary
```

## Calculator

Here we use some common basics, first define a dictionary variable `op`, whose key is used to store all operation instructions except `quit`, and the corresponding value is processed by *lambda*; in the `while` dead loop, determine whether the character entered by keyboard corresponds to a key in `op`. If it is, we continue to input two space-separated numbers, use `spilt()` and `map()` functions to process the input data, then pass in the lambda expression corresponding to the key in `op` and output the result; if not, we determine whether the keyed value is a `quit` exit instruction, and if it is true, then `break` to exit the loop.

```python
op = {'add':lambda T:T[0]+T[1],'sub':lambda T:T[0]-T[1],'mul':lambda T:T[0]*T[1],'div':lambda T:T[0]/T[1]}
while True:
    cmd = input('Input command:')
    if cmd != 'quit' and cmd in op.keys(): print(op[cmd](list(map(float, input('Input 2 numbers:').split()))))
    elif cmd == 'quit': break
```

## Flask

“Micro” does not mean that your whole web application has to fit into a single Python file (although it certainly can), nor does it mean that Flask is lacking in functionality. The “micro” in microframework means Flask aims to keep the core simple but extensible. Flask won’t make many decisions for you, such as what database to use. Those decisions that it does make, such as what templating engine to use, are easy to change. Everything else is up to you, so that Flask can be everything you need and nothing you don’t.

By default, Flask does not include a database abstraction layer, form validation or anything else where different libraries already exist that can handle that. Instead, Flask supports extensions to add such functionality to your application as if it was implemented in Flask itself. Numerous extensions provide database integration, form validation, upload handling, various open authentication technologies, and more. Flask may be “micro”, but it’s ready for production use on a variety of needs.

:::tip

[Flask - Quickstart](https://flask.palletsprojects.com/en/master/quickstart/)

:::


A minimal Flask application looks something like this:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
```

So what did that code do?

1.  First we imported the :class:`~flask.Flask` class. An instance of this class will be our WSGI application.
1.  Next we create an instance of this class. The first argument is the name of the application's module or package. ``__name__`` is a convenient shortcut for this that is appropriate for most cases.
    This is needed so that Flask knows where to look for resources suchas templates and static files.
1.  We then use the :meth:`~flask.Flask.route` decorator to tell Flask what URL should trigger our function.
1.  The function returns the message we want to display in the user's browser. The default content type is HTML, so HTML in the string will be rendered by the browser.

Save it as `hello.py` or something similar. Make sure to not call your application `flask.py` because this would conflict with Flask itself.
