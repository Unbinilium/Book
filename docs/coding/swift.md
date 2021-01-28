---
title: Swift
---

Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc.


## Bubble Sort

Bubble sort is a sorting algorithm that is implemented by starting in the beginning of the array and swapping the first two elements only if the first element is greater than the second element. This comparison is then moved onto the next pair and so on and so forth. This is done until the array is completely sorted. The smaller items slowly “bubble” up to the beginning of the array.

Sometimes this algorithm is refered as Sinking sort, due to the larger, or heavier elements sinking to the end of the array.

```swift
func bubbleSort(_ arr: [Int]) -> [Int] {
    guard arr.count > 1 else { return arr }
    var sorted = arr
    for i in 0.. < sorted.count {
        for j in 0.. < sorted.count - i - 1 {
            if sorted[j] > sorted[j + 1] {
                sorted.swapAt(j + 1, j)
            }
        }
    }
    return sorted
}
```
