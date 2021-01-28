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

## Expression template

**Expression templates** are a [C++](https://en.wikipedia.org/wiki/C%2B%2B) [template metaprogramming](https://en.wikipedia.org/wiki/Template_metaprogramming) technique that builds structures representing a computation at compile time, where expressions are [evaluated only as needed](https://en.wikipedia.org/wiki/Lazy_evaluation) to produce efficient code for the entire computation.[[1\]](https://en.wikipedia.org/wiki/Expression_templates#cite_note-matsuzaki-1) Expression templates thus allow programmers to bypass the normal order of evaluation of the C++ language and achieve optimizations such as [loop fusion](https://en.wikipedia.org/wiki/Loop_fusion).

### Motivation

Consider a library representing [vectors](https://en.wikipedia.org/wiki/Vector_space) and operations on them. One common mathematical operation is to add two vectors **u** and **v**, element-wise, to produce a new vector. The obvious C++ implementation of this operation would be an [overloaded](https://en.wikipedia.org/wiki/Operator_overloading) operator+ that returns a new vector object:

```cpp
class Vec {
    std::vector<double> elems;

  public:
    Vec(size_t n) : elems(n) {}

    double &operator[](size_t i)      { return elems[i]; }
    double operator[](size_t i) const { return elems[i]; }
    size_t size()               const { return elems.size(); }
};

Vec operator+(Vec const &u, Vec const &v) {
    assert(u.size() == v.size());
    Vec sum(u.size());
    for (size_t i = 0; i < u.size(); i++) {
         sum[i] = u[i] + v[i];
    }
    return sum;
}
```

:::tip

[Expression templates - Wikipedia](https://en.wikipedia.org/wiki/Expression_templates)

:::

### Example

Here’s example written by [Chlorie](https://chlorie.github.io/ChloroBlog/posts/2019-10-06/0-expr-templ.html):

```cpp
#include <iostream>

namespace liner_algebra
{
    template <typename E, typename T, typename U = void>
    struct is_expr_of { static constexpr bool value = false; };

    template <typename E, typename T>
    struct is_expr_of<E, T, std::void_t<typename E::et_value_type>> { static constexpr bool value = std::is_same_v<T, typename E::et_value_type>; };

    template <typename E, typename T>
    constexpr bool is_expr_of_v = is_expr_of<E, T>::value;

    template <typename T, typename U>
    constexpr bool is_cvref_of_v = std::is_same_v<std::decay_t<T>, U>;

    template <typename T>
    class vector
    {
    protected:
        std::vector<T> data_;

    public:
        explicit vector(const size_t size) : data_(size) {}
        vector(const std::initializer_list<T> ilist) : data_(ilist) {}
        size_t size() const { return data_.size(); }

        T& operator[](const size_t i) { return data_[i]; }
        T operator[](const size_t i) const { return data_[i]; }

        using et_value_type = T;

        template <typename E, typename = std::enable_if_t<!is_cvref_of_v<E, T>&& is_expr_of_v<E, T>>>
        vector(const E& expr) : data_(expr.size())
        {
            const size_t size = data_.size();
            for (size_t i = 0; i < size; i++) data_[i] = expr[i];
        }

        template <typename E, typename = std::enable_if_t<!is_cvref_of_v<E, T>&& is_expr_of_v<E, T>>>
        vector& operator=(const E& expr)
        {
            const size_t size = expr.size();
            vector result(size);
            for (size_t i = 0; i < size; i++) result.data_[i] = expr[i];
            return *this;
        }
    };

    template <typename T, typename E>
    struct scalar_mul
    {
        using et_value_type = T;
        T scalar;
        const E& expr;
        size_t size() const { return expr.size(); }
        auto operator[](const size_t i) const { return scalar * expr[i]; }
    };

    template <typename L, typename R>
    struct vector_plus
    {
        using et_value_type = typename L::et_value_type;
        const L& lhs;
        const R& rhs;
        size_t size() const { return lhs.size(); }
        auto operator[](const size_t i) const { return lhs[i] + rhs[i]; }
    };

    template <typename T, typename E, typename = std::enable_if_t<is_expr_of_v<E, T>>>
    auto operator*(const T lhs, const E& rhs) { return scalar_mul<T, E>{ lhs, rhs }; }

    template <typename L, typename R, typename = std::enable_if_t<is_expr_of_v<L, typename R::et_value_type>>>
    auto operator+(const L& lhs, const R& rhs) { return vector_plus<L, R>{ lhs, rhs }; }

    template <typename T>
    std::ostream& operator<<(std::ostream& str, const vector<T>& vec)
    {
        for (size_t i = 0; i != vec.size(); i++)
        {
            if (i != 0) str << ", ";
            str << vec[i];
        }
        return str;
    }
}

#include <random>
#include <chrono>

static std::mt19937 gen{ std::random_device{}() };
static std::uniform_real_distribution<float> dist(-1.0f, 1.0f);

liner_algebra::vector<float> rand_vec(const size_t dimension)
{
    liner_algebra::vector<float> result(dimension);
    for (size_t i = 0; i < dimension; i++)
        result[i] = dist(gen);
    return result;
}

int main()
{
    const size_t size = 100000000;
    const auto v1 = rand_vec(size), v2 = rand_vec(size), v3 = rand_vec(size);
    const float a1 = dist(gen), a2 = dist(gen), a3 = dist(gen);

    using namespace std::literals;
    using clock = std::chrono::high_resolution_clock;
    {
        const auto begin = clock::now();
        const liner_algebra::vector<float> result = a1 * v1 + a2 * v2 + a3 * v3;
        const auto end = clock::now();
        std::cout << "Class abstraction elapsed " << (end - begin) / 1.0ms << "ms" << std::endl;
    }
    return 0;
}
```

## Pattern Matching

Experimental implementation of C++ pattern matching is available.

```cpp
#include <iostream>
#include <utility>

void fizzbuzz()
{
  for (size_t i = 1; i <= 100; ++i)
  {
    inspect (std::pair(i % 3, i % 5))
    {
      [0 , 0 ] => { std::cout << "fizzbuzz\n"; }
      [0 , __] => { std::cout << "fizz\n";     }
      [__, 0 ] => { std::cout << "buzz\n";     }
      [__, __] => { std::cout << i << '\n';    }
    };
  }
}

int main()
{
  fizzbuzz();
  return 0;
}
```

## Determining Compiler

:::tip

[Fun with conversion-operator name lookup](https://quuxplusone.github.io/blog/2021/01/13/conversion-operator-lookup/)

:::

An unqualified name that is a component name of a type-specifier or ptr-operator of a conversion-type-id is looked up in the same fashion as the conversion-function-id in which it appears. If that lookup finds nothing, it undergoes unqualified name lookup; in each case, only names that denote types or templates whose specializations are types are considered.

The four mainstream compilers give four different answers for this simple C++ program:

```cpp
struct A {
    using T = T1;
    using U = U1;
    operator U1 T1::*();
    operator U1 T2::*();
    operator U2 T1::*();
    operator U2 T2::*();
};

inline auto which(U1 T1::*) { return "gcc"; }
inline auto which(U1 T2::*) { return "icc"; }
inline auto which(U2 T1::*) { return "msvc"; }
inline auto which(U2 T2::*) { return "clang"; }

int main()
{
    A a;
    using T = T2;
    using U = U2;
    puts(which(a.operator U T::*()));
}
```

The question is whether U should be looked up in the scope of test or in the scope of A; and the same question for T.

According to the current draft standard, it sounds like the conforming answer is “they should both be looked up in the scope of A”; So GCC’s answer is correct and the others are wrong in three different ways.
