---
title: C++
---

C++ is a high-level, general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".

## Use uninitialized array

In C/C++, we can define multidimensional arrays in simple words as array of arrays. Data in multidimensional arrays are stored in tabular form \(in row major order\). A dynamic 2D array is basically an array of pointers to arrays. So you first need to initialize the array of pointers to pointers and then initialize each 1d array in a loop. Example below using `new`:

```cpp
#include <iostream>

int main()
{
    int row = 3, col =3;
    array = (int**) new int* [row];
    for (int i = 0; i < row; i++) array[i] = new int[col];
    for (int i = 0; i < row; i++)
    {
        for (int j = 0; j < col; j++)
        {
            array[i][j] = 0;
            cout << array[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

For another purpose we have a powerful tool named `vector` in c++, let's see how it works.

```cpp
#include <iostream> 
#include <vector>

int main() 
{
    int row = 3, col =3;
    vector<vector<int>> array(row , vector<int>(col));
    for (int i = 0; i < row; i++)
    {
        for (int j = 0; j < col; j++)
        {
            array[i][j] = 0;
            cout << array[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

Other examples to create multidimensional array using `typedef`:

```cpp
typedef int point;

std::map<std::array<int, 2>, point> twodimearray;
twodimearray[std::array<int, 2>{1, 1}] = 0;

std::map<std::array<int, 3>, point> threedimearray;
threedimearray[std::array<int, 3>{1, 1, 1}] = 0;
```
