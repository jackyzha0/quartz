---
tags:
  - programinglang
  - python
  - algorithm
  - software-engineering
  - interview
  - ultralearning
  - java
  - golang
  - go
  - swe-plan
---

# Backbones of Plan

- [ ] Algorithm
- [ ] neetcode
- [ ] OOP Design
- [ ] System Design
- [ ] Python ( Quick review)
- [ ] Golang ( Quick review)
- [ ] Java ( Quick review)
- [ ] JS ( Quick review)
- [ ] Leetcode more than 1000
- [ ] Garbage Collector
- [ ] Programming Techniques (TDD,OOP)
- [ ] https://adventofcode.com/
- [ ] Competitive programming
- [ ] SQL


# Language Resource

# Algorithm Resource

- [Data Structures and Algorithms in Python](https://www.amazon.com/Structures-Algorithms-Python-Michael-Goodrich/dp/1118290275/) Also read java and read same for golang
- [Introduction to Algorithm](https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844)
- [Algorithm Design Manual](https://mimoza.marmara.edu.tr/~msakalli/cse706_12/SkienaTheAlgorithmDesignManual.pdf)
## Calculate Big O 
- [ ]  [Harvard CS50 - Asymptotic Notation (video)](https://www.youtube.com/watch?v=iOq5kSKqeR4)
- [ ]  [Big O Notations (general quick tutorial) (video)](https://www.youtube.com/watch?v=V6mKVRU1evU)
- [ ]  [Big O Notation (and Omega and Theta) - best mathematical explanation (video)](https://www.youtube.com/watch?v=ei-A_wy5Yxw&index=2&list=PL1BaGV1cIH4UhkL8a9bJGG356covJ76qN)
- [ ]  [Skiena (video)](https://www.youtube.com/watch?v=z1mkCe3kVUA)
- [ ]  [UC Berkeley Big O (video)](https://archive.org/details/ucberkeley_webcast_VIS4YDpuP98)
- [ ]  [Amortized Analysis (video)](https://www.youtube.com/watch?v=B3SpQZaAZP4&index=10&list=PL1BaGV1cIH4UhkL8a9bJGG356covJ76qN)
- [ ]  TopCoder (includes recurrence relations and master theorem):
    - [Computational Complexity: Section 1](https://www.topcoder.com/thrive/articles/Computational%20Complexity%20part%20one)
    - [Computational Complexity: Section 2](https://www.topcoder.com/thrive/articles/Computational%20Complexity%20part%20two)
- [ ]  [Cheat sheet](http://bigocheatsheet.com/)
- [ ]  [[Review] Big-O notation in 5 minutes (video)](https://youtu.be/__vX2sjlpXU)

## Data Structures

- ### [Arrays](https://github.com/jwasham/coding-interview-university#arrays)
    
    - [ ]  About Arrays:
        - [Arrays CS50 Harvard University](https://www.youtube.com/watch?v=tI_tIZFyKBw&t=3009s)
        - [Arrays (video)](https://www.coursera.org/lecture/data-structures/arrays-OsBSF)
        - [UC Berkeley CS61B - Linear and Multi-Dim Arrays (video)](https://archive.org/details/ucberkeley_webcast_Wp8oiO_CZZE) (Start watching from 15m 32s)
        - [Dynamic Arrays (video)](https://www.coursera.org/lecture/data-structures/dynamic-arrays-EwbnV)
        - [Jagged Arrays (video)](https://www.youtube.com/watch?v=1jtrQqYpt7g)
    - [ ]  Implement a vector (mutable array with automatic resizing):
        - [ ]  Practice coding using arrays and pointers, and pointer math to jump to an index instead of using indexing.
        - [ ]  New raw data array with allocated memory
            - can allocate int array under the hood, just not use its features
            - start with 16, or if the starting number is greater, use power of 2 - 16, 32, 64, 128
        - [ ]  size() - number of items
        - [ ]  capacity() - number of items it can hold
        - [ ]  is_empty()
        - [ ]  at(index) - returns the item at a given index, blows up if index out of bounds
        - [ ]  push(item)
        - [ ]  insert(index, item) - inserts item at index, shifts that index's value and trailing elements to the right
        - [ ]  prepend(item) - can use insert above at index 0
        - [ ]  pop() - remove from end, return value
        - [ ]  delete(index) - delete item at index, shifting all trailing elements left
        - [ ]  remove(item) - looks for value and removes index holding it (even if in multiple places)
        - [ ]  find(item) - looks for value and returns first index with that value, -1 if not found
        - [ ]  resize(new_capacity) // private function
            - when you reach capacity, resize to double the size
            - when popping an item, if the size is 1/4 of capacity, resize to half
    - [ ]  Time
        - O(1) to add/remove at end (amortized for allocations for more space), index, or update
        - O(n) to insert/remove elsewhere
    - [ ]  Space
        - contiguous in memory, so proximity helps performance
        - space needed = (array capacity, which is >= n) * size of item, but even if 2n, still O(n)
- ### [Linked Lists](https://github.com/jwasham/coding-interview-university#linked-lists)
    
    - [ ]  Description:
        - [ ]  [Linked Lists CS50 Harvard University](https://www.youtube.com/watch?v=2T-A_GFuoTo&t=650s) - this builds the intuition.
        - [ ]  [Singly Linked Lists (video)](https://www.coursera.org/lecture/data-structures/singly-linked-lists-kHhgK)
        - [ ]  [CS 61B - Linked Lists 1 (video)](https://archive.org/details/ucberkeley_webcast_htzJdKoEmO0)
        - [ ]  [CS 61B - Linked Lists 2 (video)](https://archive.org/details/ucberkeley_webcast_-c4I3gFYe3w)
        - [ ]  [[Review] Linked lists in 4 minutes (video)](https://youtu.be/F8AbOfQwl1c)
    - [ ]  [C Code (video)](https://www.youtube.com/watch?v=QN6FPiD0Gzo) - not the whole video, just portions about Node struct and memory allocation
    - [ ]  Linked List vs Arrays:
        - [Core Linked Lists Vs Arrays (video)](https://www.coursera.org/lecture/data-structures-optimizing-performance/core-linked-lists-vs-arrays-rjBs9)
        - [In The Real World Linked Lists Vs Arrays (video)](https://www.coursera.org/lecture/data-structures-optimizing-performance/in-the-real-world-lists-vs-arrays-QUaUd)
    - [ ]  [Why you should avoid linked lists (video)](https://www.youtube.com/watch?v=YQs6IC-vgmo)
    - [ ]  Gotcha: you need pointer to pointer knowledge: (for when you pass a pointer to a function that may change the address where that pointer points) This page is just to get a grasp on ptr to ptr. I don't recommend this list traversal style. Readability and maintainability suffer due to cleverness.
        - [Pointers to Pointers](https://www.eskimo.com/~scs/cclass/int/sx8.html)
    - [ ]  Implement (I did with tail pointer & without):
        - [ ]  size() - returns the number of data elements in the list
        - [ ]  empty() - bool returns true if empty
        - [ ]  value_at(index) - returns the value of the nth item (starting at 0 for first)
        - [ ]  push_front(value) - adds an item to the front of the list
        - [ ]  pop_front() - remove the front item and return its value
        - [ ]  push_back(value) - adds an item at the end
        - [ ]  pop_back() - removes end item and returns its value
        - [ ]  front() - get the value of the front item
        - [ ]  back() - get the value of the end item
        - [ ]  insert(index, value) - insert value at index, so the current item at that index is pointed to by the new item at the index
        - [ ]  erase(index) - removes node at given index
        - [ ]  value_n_from_end(n) - returns the value of the node at the nth position from the end of the list
        - [ ]  reverse() - reverses the list
        - [ ]  remove_value(value) - removes the first item in the list with this value
    - [ ]  Doubly-linked List
        - [Description (video)](https://www.coursera.org/lecture/data-structures/doubly-linked-lists-jpGKD)
        - No need to implement
- ### [Stack](https://github.com/jwasham/coding-interview-university#stack)
    
    - [ ]  [Stacks (video)](https://www.coursera.org/lecture/data-structures/stacks-UdKzQ)
    - [ ]  [[Review] Stacks in 3 minutes (video)](https://youtu.be/KcT3aVgrrpU)
    - [ ]  Will not implement. Implementing with the array is trivial
- ### [Queue](https://github.com/jwasham/coding-interview-university#queue)
    
    - [ ]  [Queue (video)](https://www.coursera.org/lecture/data-structures/queues-EShpq)
    - [ ]  [Circular buffer/FIFO](https://en.wikipedia.org/wiki/Circular_buffer)
    - [ ]  [[Review] Queues in 3 minutes (video)](https://youtu.be/D6gu-_tmEpQ)
    - [ ]  Implement using linked-list, with tail pointer:
        - enqueue(value) - adds value at a position at the tail
        - dequeue() - returns value and removes least recently added element (front)
        - empty()
    - [ ]  Implement using a fixed-sized array:
        - enqueue(value) - adds item at end of available storage
        - dequeue() - returns value and removes least recently added element
        - empty()
        - full()
    - [ ]  Cost:
        - a bad implementation using a linked list where you enqueue at the head and dequeue at the tail would be O(n) because you'd need the next to last element, causing a full traversal of each dequeue
        - enqueue: O(1) (amortized, linked list and array [probing])
        - dequeue: O(1) (linked list and array)
        - empty: O(1) (linked list and array)
- ### [Hash table](https://github.com/jwasham/coding-interview-university#hash-table)
    
    -  Videos:
        
        - [ ]  [Hashing with Chaining (video)](https://www.youtube.com/watch?v=0M_kIqhwbFo&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=8)
        - [ ]  [Table Doubling, Karp-Rabin (video)](https://www.youtube.com/watch?v=BRO7mVIFt08&index=9&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
        - [ ]  [Open Addressing, Cryptographic Hashing (video)](https://www.youtube.com/watch?v=rvdJDijO2Ro&index=10&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
        - [ ]  [PyCon 2010: The Mighty Dictionary (video)](https://www.youtube.com/watch?v=C4Kc8xzcA68)
        - [ ]  [PyCon 2017: The Dictionary Even Mightier (video)](https://www.youtube.com/watch?v=66P5FMkWoVU)
        - [ ]  [(Advanced) Randomization: Universal & Perfect Hashing (video)](https://www.youtube.com/watch?v=z0lJ2k0sl1g&list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp&index=11)
        - [ ]  [(Advanced) Perfect hashing (video)](https://www.youtube.com/watch?v=N0COwN14gt0&list=PL2B4EEwhKD-NbwZ4ezj7gyc_3yNrojKM9&index=4)
        - [ ]  [[Review] Hash tables in 4 minutes (video)](https://youtu.be/knV86FlSXJ8)
    -  Online Courses:
        
        - [ ]  [Core Hash Tables (video)](https://www.coursera.org/lecture/data-structures-optimizing-performance/core-hash-tables-m7UuP)
        - [ ]  [Data Structures (video)](https://www.coursera.org/learn/data-structures/home/week/4)
        - [ ]  [Phone Book Problem (video)](https://www.coursera.org/lecture/data-structures/phone-book-problem-NYZZP)
        - [ ]  distributed hash tables:
            - [Instant Uploads And Storage Optimization In Dropbox (video)](https://www.coursera.org/lecture/data-structures/instant-uploads-and-storage-optimization-in-dropbox-DvaIb)
            - [Distributed Hash Tables (video)](https://www.coursera.org/lecture/data-structures/distributed-hash-tables-tvH8H)
    -  Implement with array using linear probing
        
        - hash(k, m) - m is the size of the hash table
        - add(key, value) - if the key already exists, update value
        - exists(key)
        - get(key)
        - remove(key)

## [](https://github.com/jwasham/coding-interview-university#more-knowledge)More Knowledge

- ### [Binary search](https://github.com/jwasham/coding-interview-university#binary-search)
    
    - [ ]  [Binary Search (video)](https://www.youtube.com/watch?v=D5SrAga1pno)
    - [ ]  [Binary Search (video)](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)
    - [ ]  [detail](https://www.topcoder.com/thrive/articles/Binary%20Search)
    - [ ]  [blueprint](https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template-solved-many-problems)
    - [ ]  [[Review] Binary search in 4 minutes (video)](https://youtu.be/fDKIpRe8GW4)
    - [ ]  Implement:
        - binary search (on a sorted array of integers)
        - binary search using recursion
- ### [Bitwise operations](https://github.com/jwasham/coding-interview-university#bitwise-operations)
    
    - [ ]  [Bits cheat sheet](https://github.com/jwasham/coding-interview-university/blob/main/extras/cheat%20sheets/bits-cheat-sheet.pdf)
        - you should know many of the powers of 2 from (2^1 to 2^16 and 2^32)
    - [ ]  Get a really good understanding of manipulating bits with: &, |, ^, ~, >>, <<
        - [ ]  [words](https://en.wikipedia.org/wiki/Word_(computer_architecture))
        - [ ]  Good intro: [Bit Manipulation (video)](https://www.youtube.com/watch?v=7jkIUgLC29I)
        - [ ]  [C Programming Tutorial 2-10: Bitwise Operators (video)](https://www.youtube.com/watch?v=d0AwjSpNXR0)
        - [ ]  [Bit Manipulation](https://en.wikipedia.org/wiki/Bit_manipulation)
        - [ ]  [Bitwise Operation](https://en.wikipedia.org/wiki/Bitwise_operation)
        - [ ]  [Bithacks](https://graphics.stanford.edu/~seander/bithacks.html)
        - [ ]  [The Bit Twiddler](https://bits.stephan-brumme.com/)
        - [ ]  [The Bit Twiddler Interactive](https://bits.stephan-brumme.com/interactive.html)
        - [ ]  [Bit Hacks (video)](https://www.youtube.com/watch?v=ZusiKXcz_ac)
        - [ ]  [Practice Operations](https://pconrad.github.io/old_pconrad_cs16/topics/bitOps/)
    - [ ]  2s and 1s complement
        - [Binary: Plusses & Minuses (Why We Use Two's Complement) (video)](https://www.youtube.com/watch?v=lKTsv6iVxV4)
        - [1s Complement](https://en.wikipedia.org/wiki/Ones%27_complement)
        - [2s Complement](https://en.wikipedia.org/wiki/Two%27s_complement)
    - [ ]  Count set bits
        - [4 ways to count bits in a byte (video)](https://youtu.be/Hzuzo9NJrlc)
        - [Count Bits](https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan)
        - [How To Count The Number Of Set Bits In a 32 Bit Integer](http://stackoverflow.com/questions/109023/how-to-count-the-number-of-set-bits-in-a-32-bit-integer)
    - [ ]  Swap values:
        - [Swap](https://bits.stephan-brumme.com/swap.html)
    - [ ]  Absolute value:
        - [Absolute Integer](https://bits.stephan-brumme.com/absInteger.html)

## [](https://github.com/jwasham/coding-interview-university#trees)Trees

- ### [Trees - Intro](https://github.com/jwasham/coding-interview-university#trees---intro)
    
    - [ ]  [Intro to Trees (video)](https://www.coursera.org/lecture/data-structures/trees-95qda)
    - [ ]  [Tree Traversal (video)](https://www.coursera.org/lecture/data-structures/tree-traversal-fr51b)
    - [ ]  [BFS(breadth-first search) and DFS(depth-first search) (video)](https://www.youtube.com/watch?v=uWL6FJhq5fM)
        - BFS notes:
            - level order (BFS, using queue)
            - time complexity: O(n)
            - space complexity: best: O(1), worst: O(n/2)=O(n)
        - DFS notes:
            - time complexity: O(n)
            - space complexity: best: O(log n) - avg. height of tree worst: O(n)
            - inorder (DFS: left, self, right)
            - postorder (DFS: left, right, self)
            - preorder (DFS: self, left, right)
    - [ ]  [[Review] Breadth-first search in 4 minutes (video)](https://youtu.be/HZ5YTanv5QE)
    - [ ]  [[Review] Depth-first search in 4 minutes (video)](https://youtu.be/Urx87-NMm6c)
    - [ ]  [[Review] Tree Traversal (playlist) in 11 minutes (video)](https://www.youtube.com/playlist?list=PL9xmBV_5YoZO1JC2RgEi04nLy6D-rKk6b)
- ### [Binary search trees: BSTs](https://github.com/jwasham/coding-interview-university#binary-search-trees-bsts)
    
    - [ ]  [Binary Search Tree Review (video)](https://www.youtube.com/watch?v=x6At0nzX92o&index=1&list=PLA5Lqm4uh9Bbq-E0ZnqTIa8LRaL77ica6)
    - [ ]  [Introduction (video)](https://www.coursera.org/learn/data-structures/lecture/E7cXP/introduction)
    - [ ]  [MIT (video)](https://www.youtube.com/watch?v=76dhtgZt38A&ab_channel=MITOpenCourseWare)
    - C/C++:
        - [ ]  [Binary search tree - Implementation in C/C++ (video)](https://www.youtube.com/watch?v=COZK7NATh4k&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=28)
        - [ ]  [BST implementation - memory allocation in stack and heap (video)](https://www.youtube.com/watch?v=hWokyBoo0aI&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=29)
        - [ ]  [Find min and max element in a binary search tree (video)](https://www.youtube.com/watch?v=Ut90klNN264&index=30&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P)
        - [ ]  [Find the height of a binary tree (video)](https://www.youtube.com/watch?v=_pnqMz5nrRs&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=31)
        - [ ]  [Binary tree traversal - breadth-first and depth-first strategies (video)](https://www.youtube.com/watch?v=9RHO6jU--GU&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=32)
        - [ ]  [Binary tree: Level Order Traversal (video)](https://www.youtube.com/watch?v=86g8jAQug04&index=33&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P)
        - [ ]  [Binary tree traversal: Preorder, Inorder, Postorder (video)](https://www.youtube.com/watch?v=gm8DUJJhmY4&index=34&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P)
        - [ ]  [Check if a binary tree is a binary search tree or not (video)](https://www.youtube.com/watch?v=yEwSGhSsT0U&index=35&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P)
        - [ ]  [Delete a node from Binary Search Tree (video)](https://www.youtube.com/watch?v=gcULXE7ViZw&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=36)
        - [ ]  [Inorder Successor in a binary search tree (video)](https://www.youtube.com/watch?v=5cPbNCrdotA&index=37&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P)
    - [ ]  Implement:
        - [ ]  [insert // insert value into tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/submissions/987660183/)
        - [ ]  get_node_count // get count of values stored
        - [ ]  print_values // prints the values in the tree, from min to max
        - [ ]  delete_tree
        - [ ]  is_in_tree // returns true if a given value exists in the tree
        - [ ]  [get_height // returns the height in nodes (single node's height is 1)](https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/)
        - [ ]  get_min // returns the minimum value stored in the tree
        - [ ]  get_max // returns the maximum value stored in the tree
        - [ ]  [is_binary_search_tree](https://leetcode.com/problems/validate-binary-search-tree/)
        - [ ]  delete_value
        - [ ]  get_successor // returns the next-highest value in the tree after given value, -1 if none
- ### [Heap / Priority Queue / Binary Heap](https://github.com/jwasham/coding-interview-university#heap--priority-queue--binary-heap)
    
    - visualized as a tree, but is usually linear in storage (array, linked list)
    - [ ]  [Heap](https://en.wikipedia.org/wiki/Heap_(data_structure))
    - [ ]  [Introduction (video)](https://www.coursera.org/lecture/data-structures/introduction-2OpTs)
    - [ ]  [Binary Trees (video)](https://www.coursera.org/learn/data-structures/lecture/GRV2q/binary-trees)
    - [ ]  [Tree Height Remark (video)](https://www.coursera.org/learn/data-structures/supplement/S5xxz/tree-height-remark)
    - [ ]  [Basic Operations (video)](https://www.coursera.org/learn/data-structures/lecture/0g1dl/basic-operations)
    - [ ]  [Complete Binary Trees (video)](https://www.coursera.org/learn/data-structures/lecture/gl5Ni/complete-binary-trees)
    - [ ]  [Pseudocode (video)](https://www.coursera.org/learn/data-structures/lecture/HxQo9/pseudocode)
    - [ ]  [Heap Sort - jumps to start (video)](https://youtu.be/odNJmw5TOEE?list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&t=3291)
    - [ ]  [Heap Sort (video)](https://www.coursera.org/lecture/data-structures/heap-sort-hSzMO)
    - [ ]  [Building a heap (video)](https://www.coursera.org/lecture/data-structures/building-a-heap-dwrOS)
    - [ ]  [MIT: Heaps and Heap Sort (video)](https://www.youtube.com/watch?v=B7hVxCmfPtM&index=4&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
    - [ ]  [CS 61B Lecture 24: Priority Queues (video)](https://archive.org/details/ucberkeley_webcast_yIUFT6AKBGE)
    - [ ]  [Linear Time BuildHeap (max-heap)](https://www.youtube.com/watch?v=MiyLo8adrWw)
    - [ ]  [[Review] Heap (playlist) in 13 minutes (video)](https://www.youtube.com/playlist?list=PL9xmBV_5YoZNsyqgPW-DNwUeT8F8uhWc6)
    - [ ]  Implement a max-heap:
        - [ ]  insert
        - [ ]  sift_up - needed for insert
        - [ ]  get_max - returns the max item, without removing it
        - [ ]  get_size() - return number of elements stored
        - [ ]  is_empty() - returns true if the heap contains no elements
        - [ ]  extract_max - returns the max item, removing it
        - [ ]  sift_down - needed for extract_max
        - [ ]  remove(x) - removes item at index x
        - [ ]  heapify - create a heap from an array of elements, needed for heap_sort
        - [ ]  heap_sort() - take an unsorted array and turn it into a sorted array in place using a max heap or min heap

## [Sorting](https://github.com/jwasham/coding-interview-university#sorting)

-  Notes:
    
    - Implement sorts & know best case/worst case, average complexity of each:
        - no bubble sort - it's terrible - O(n^2), except when n <= 16
    - [ ]  Stability in sorting algorithms ("Is Quicksort stable?")
        - [Sorting Algorithm Stability](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability)
        - [Stability In Sorting Algorithms](http://stackoverflow.com/questions/1517793/stability-in-sorting-algorithms)
        - [Stability In Sorting Algorithms](http://www.geeksforgeeks.org/stability-in-sorting-algorithms/)
        - [Sorting Algorithms - Stability](http://homepages.math.uic.edu/~leon/cs-mcs401-s08/handouts/stability.pdf)
    - [ ]  Which algorithms can be used on linked lists? Which on arrays? Which of both?
        - I wouldn't recommend sorting a linked list, but merge sort is doable.
        - [Merge Sort For Linked List](http://www.geeksforgeeks.org/merge-sort-for-linked-list/)
- For heapsort, see the Heap data structure above. Heap sort is great, but not stable
    
-  [Sedgewick - Mergesort (5 videos)](https://www.coursera.org/learn/algorithms-part1/home/week/3)
    
    - [ ]  [1. Mergesort](https://www.coursera.org/lecture/algorithms-part1/mergesort-ARWDq)
    - [ ]  [2. Bottom-up Mergesort](https://www.coursera.org/learn/algorithms-part1/lecture/PWNEl/bottom-up-mergesort)
    - [ ]  [3. Sorting Complexity](https://www.coursera.org/lecture/algorithms-part1/sorting-complexity-xAltF)
    - [ ]  [4. Comparators](https://www.coursera.org/lecture/algorithms-part1/comparators-9FYhS)
    - [ ]  [5. Stability](https://www.coursera.org/learn/algorithms-part1/lecture/pvvLZ/stability)
-  [Sedgewick - Quicksort (4 videos)](https://www.coursera.org/learn/algorithms-part1/home/week/3)
    
    - [ ]  [1. Quicksort](https://www.coursera.org/lecture/algorithms-part1/quicksort-vjvnC)
    - [ ]  [2. Selection](https://www.coursera.org/lecture/algorithms-part1/selection-UQxFT)
    - [ ]  [3. Duplicate Keys](https://www.coursera.org/lecture/algorithms-part1/duplicate-keys-XvjPd)
    - [ ]  [4. System Sorts](https://www.coursera.org/lecture/algorithms-part1/system-sorts-QBNZ7)
-  UC Berkeley:
    
    - [ ]  [CS 61B Lecture 29: Sorting I (video)](https://archive.org/details/ucberkeley_webcast_EiUvYS2DT6I)
    - [ ]  [CS 61B Lecture 30: Sorting II (video)](https://archive.org/details/ucberkeley_webcast_2hTY3t80Qsk)
    - [ ]  [CS 61B Lecture 32: Sorting III (video)](https://archive.org/details/ucberkeley_webcast_Y6LOLpxg6Dc)
    - [ ]  [CS 61B Lecture 33: Sorting V (video)](https://archive.org/details/ucberkeley_webcast_qNMQ4ly43p4)
    - [ ]  [CS 61B 2014-04-21: Radix Sort(video)](https://archive.org/details/ucberkeley_webcast_pvbBMd-3NoI)
-  [Bubble Sort (video)](https://www.youtube.com/watch?v=P00xJgWzz2c&index=1&list=PL89B61F78B552C1AB)
    
-  [Analyzing Bubble Sort (video)](https://www.youtube.com/watch?v=ni_zk257Nqo&index=7&list=PL89B61F78B552C1AB)
    
-  [Insertion Sort, Merge Sort (video)](https://www.youtube.com/watch?v=Kg4bqzAqRBM&index=3&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
    
-  [Insertion Sort (video)](https://www.youtube.com/watch?v=c4BRHC7kTaQ&index=2&list=PL89B61F78B552C1AB)
    
-  [Merge Sort (video)](https://www.youtube.com/watch?v=GCae1WNvnZM&index=3&list=PL89B61F78B552C1AB)
    
-  [Quicksort (video)](https://www.youtube.com/watch?v=y_G9BkAm6B8&index=4&list=PL89B61F78B552C1AB)
    
-  [Selection Sort (video)](https://www.youtube.com/watch?v=6nDMgr0-Yyo&index=8&list=PL89B61F78B552C1AB)
    
-  Merge sort code:
    
    - [ ]  [Using output array (C)](http://www.cs.yale.edu/homes/aspnes/classes/223/examples/sorting/mergesort.c)
    - [ ]  [Using output array (Python)](https://github.com/jwasham/practice-python/blob/master/merge_sort/merge_sort.py)
    - [ ]  [In-place (C++)](https://github.com/jwasham/practice-cpp/blob/master/merge_sort/merge_sort.cc)
-  Quick sort code:
    
    - [ ]  [Implementation (C)](http://www.cs.yale.edu/homes/aspnes/classes/223/examples/randomization/quick.c)
    - [ ]  [Implementation (C)](https://github.com/jwasham/practice-c/blob/master/quick_sort/quick_sort.c)
    - [ ]  [Implementation (Python)](https://github.com/jwasham/practice-python/blob/master/quick_sort/quick_sort.py)
-  [[Review] Sorting (playlist) in 18 minutes](https://www.youtube.com/playlist?list=PL9xmBV_5YoZOZSbGAXAPIq1BeUf4j20pl)
    
    - [ ]  [Quick sort in 4 minutes (video)](https://youtu.be/Hoixgm4-P4M)
    - [ ]  [Heap sort in 4 minutes (video)](https://youtu.be/2DmK_H7IdTo)
    - [ ]  [Merge sort in 3 minutes (video)](https://youtu.be/4VqmGXwpLqc)
    - [ ]  [Bubble sort in 2 minutes (video)](https://youtu.be/xli_FI7CuzA)
    - [ ]  [Selection sort in 3 minutes (video)](https://youtu.be/g-PGLbMth_g)
    - [ ]  [Insertion sort in 2 minutes (video)](https://youtu.be/JU767SDMDvA)
-  Implement:
    
    - [ ]  Mergesort: O(n log n) average and worst case
    - [ ]  Quicksort O(n log n) average case
    - Selection sort and insertion sort are both O(n^2) average and worst-case
    - For heapsort, see Heap data structure above
-  Not required, but I recommended them:
    
    - [ ]  [Sedgewick - Radix Sorts (6 videos)](https://www.coursera.org/learn/algorithms-part2/home/week/3)
        - [ ]  [1. Strings in Java](https://www.coursera.org/learn/algorithms-part2/lecture/vGHvb/strings-in-java)
        - [ ]  [2. Key Indexed Counting](https://www.coursera.org/lecture/algorithms-part2/key-indexed-counting-2pi1Z)
        - [ ]  [3. Least Significant Digit First String Radix Sort](https://www.coursera.org/learn/algorithms-part2/lecture/c1U7L/lsd-radix-sort)
        - [ ]  [4. Most Significant Digit First String Radix Sort](https://www.coursera.org/learn/algorithms-part2/lecture/gFxwG/msd-radix-sort)
        - [ ]  [5. 3 Way Radix Quicksort](https://www.coursera.org/lecture/algorithms-part2/3-way-radix-quicksort-crkd5)
        - [ ]  [6. Suffix Arrays](https://www.coursera.org/learn/algorithms-part2/lecture/TH18W/suffix-arrays)
    - [ ]  [Radix Sort](http://www.cs.yale.edu/homes/aspnes/classes/223/notes.html#radixSort)
    - [ ]  [Radix Sort (video)](https://www.youtube.com/watch?v=xhr26ia4k38)
    - [ ]  [Radix Sort, Counting Sort (linear time given constraints) (video)](https://www.youtube.com/watch?v=Nz1KZXbghj8&index=7&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
    - [ ]  [Randomization: Matrix Multiply, Quicksort, Freivalds' algorithm (video)](https://www.youtube.com/watch?v=cNB2lADK3_s&index=8&list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp)
    - [ ]  [Sorting in Linear Time (video)](https://www.youtube.com/watch?v=pOKy3RZbSws&list=PLUl4u3cNGP61hsJNdULdudlRL493b-XZf&index=14)

As a summary, here is a visual representation of [15 sorting algorithms](https://www.youtube.com/watch?v=kPRA0W1kECg). If you need more detail on this subject, see the "Sorting" section in [Additional Detail on Some Subjects](https://github.com/jwasham/coding-interview-university#additional-detail-on-some-subjects)

## [Graphs](https://github.com/jwasham/coding-interview-university#graphs)

Graphs can be used to represent many problems in computer science, so this section is long, like trees and sorting.

- Notes:
    
    - There are 4 basic ways to represent a graph in memory:
        - objects and pointers
        - adjacency matrix
        - adjacency list
        - adjacency map
    - Familiarize yourself with each representation and its pros & cons
    - BFS and DFS - know their computational complexity, their trade-offs, and how to implement them in real code
    - When asked a question, look for a graph-based solution first, then move on if none
-  MIT(videos):
    
    - [ ]  [Breadth-First Search](https://www.youtube.com/watch?v=oFVYVzlvk9c&t=14s&ab_channel=MITOpenCourseWare)
    - [ ]  [Depth-First Search](https://www.youtube.com/watch?v=IBfWDYSffUU&t=32s&ab_channel=MITOpenCourseWare)
-  Skiena Lectures - great intro:
    
    - [ ]  [CSE373 2020 - Lecture 10 - Graph Data Structures (video)](https://www.youtube.com/watch?v=Sjk0xqWWPCc&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=10)
    - [ ]  [CSE373 2020 - Lecture 11 - Graph Traversal (video)](https://www.youtube.com/watch?v=ZTwjXj81NVY&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=11)
    - [ ]  [CSE373 2020 - Lecture 12 - Depth First Search (video)](https://www.youtube.com/watch?v=KyordYB3BOs&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=12)
    - [ ]  [CSE373 2020 - Lecture 13 - Minimum Spanning Trees (video)](https://www.youtube.com/watch?v=oolm2VnJUKw&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=13)
    - [ ]  [CSE373 2020 - Lecture 14 - Minimum Spanning Trees (con't) (video)](https://www.youtube.com/watch?v=RktgPx0MarY&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=14)
    - [ ]  [CSE373 2020 - Lecture 15 - Graph Algorithms (con't 2) (video)](https://www.youtube.com/watch?v=MUe5DXRhyAo&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=15)
-  Graphs (review and more):
    
    - [ ]  [6.006 Single-Source Shortest Paths Problem (video)](https://www.youtube.com/watch?v=Aa2sqUhIn-E&index=15&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
    - [ ]  [6.006 Dijkstra (video)](https://www.youtube.com/watch?v=NSHizBK9JD8&t=1731s&ab_channel=MITOpenCourseWare)
    - [ ]  [6.006 Bellman-Ford (video)](https://www.youtube.com/watch?v=f9cVS_URPc0&ab_channel=MITOpenCourseWare)
    - [ ]  [6.006 Speeding Up Dijkstra (video)](https://www.youtube.com/watch?v=CHvQ3q_gJ7E&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=18)
    - [ ]  [Aduni: Graph Algorithms I - Topological Sorting, Minimum Spanning Trees, Prim's Algorithm - Lecture 6 (video)](https://www.youtube.com/watch?v=i_AQT_XfvD8&index=6&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm)
    - [ ]  [Aduni: Graph Algorithms II - DFS, BFS, Kruskal's Algorithm, Union Find Data Structure - Lecture 7 (video)](https://www.youtube.com/watch?v=ufj5_bppBsA&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&index=7)
    - [ ]  [Aduni: Graph Algorithms III: Shortest Path - Lecture 8 (video)](https://www.youtube.com/watch?v=DiedsPsMKXc&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&index=8)
    - [ ]  [Aduni: Graph Alg. IV: Intro to geometric algorithms - Lecture 9 (video)](https://www.youtube.com/watch?v=XIAQRlNkJAw&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&index=9)
    - [ ]  [CS 61B 2014: Weighted graphs (video)](https://archive.org/details/ucberkeley_webcast_zFbq8vOZ_0k)
    - [ ]  [Greedy Algorithms: Minimum Spanning Tree (video)](https://www.youtube.com/watch?v=tKwnms5iRBU&index=16&list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp)
    - [ ]  [Strongly Connected Components Kosaraju's Algorithm Graph Algorithm (video)](https://www.youtube.com/watch?v=RpgcYiky7uw)
    - [ ]  [[Review] Shortest Path Algorithms (playlist) in 16 minutes (video)](https://www.youtube.com/playlist?list=PL9xmBV_5YoZO-Y-H3xIC9DGSfVYJng9Yw)
    - [ ]  [[Review] Minimum Spanning Trees (playlist) in 4 minutes (video)](https://www.youtube.com/playlist?list=PL9xmBV_5YoZObEi3Hf6lmyW-CBfs7nkOV)
- Full Coursera Course:
    
    - [ ]  [Algorithms on Graphs (video)](https://www.coursera.org/learn/algorithms-on-graphs/home/welcome)
- I'll implement:
    
    - [ ]  DFS with adjacency list (recursive)
    - [ ]  DFS with adjacency list (iterative with stack)
    - [ ]  DFS with adjacency matrix (recursive)
    - [ ]  DFS with adjacency matrix (iterative with stack)
    - [ ]  BFS with adjacency list
    - [ ]  BFS with adjacency matrix
    - [ ]  single-source shortest path (Dijkstra)
    - [ ]  minimum spanning tree
    - DFS-based algorithms (see Aduni videos above):
        - [ ]  check for a cycle (needed for topological sort, since we'll check for the cycle before starting)
        - [ ]  topological sort
        - [ ]  count connected components in a graph
        - [ ]  list strongly connected components
        - [ ]  check for bipartite graph

## [Even More Knowledge](https://github.com/jwasham/coding-interview-university#even-more-knowledge)

- ### [Recursion](https://github.com/jwasham/coding-interview-university#recursion)
    
    - [ ]  Stanford lectures on recursion & backtracking:
        - [ ]  [Lecture 8 | Programming Abstractions (video)](https://www.youtube.com/watch?v=gl3emqCuueQ&list=PLFE6E58F856038C69&index=8)
        - [ ]  [Lecture 9 | Programming Abstractions (video)](https://www.youtube.com/watch?v=uFJhEPrbycQ&list=PLFE6E58F856038C69&index=9)
        - [ ]  [Lecture 10 | Programming Abstractions (video)](https://www.youtube.com/watch?v=NdF1QDTRkck&index=10&list=PLFE6E58F856038C69)
        - [ ]  [Lecture 11 | Programming Abstractions (video)](https://www.youtube.com/watch?v=p-gpaIGRCQI&list=PLFE6E58F856038C69&index=11)
    - When it is appropriate to use it?
    - How is tail recursion better than not?
        - [ ]  [What Is Tail Recursion Why Is It So Bad?](https://www.quora.com/What-is-tail-recursion-Why-is-it-so-bad)
        - [ ]  [Tail Recursion (video)](https://www.coursera.org/lecture/programming-languages/tail-recursion-YZic1)
    - [ ]  [5 Simple Steps for Solving Any Recursive Problem(video)](https://youtu.be/ngCos392W4w)
    
    Backtracking Blueprint: [Java](https://leetcode.com/problems/combination-sum/discuss/16502/A-general-approach-to-backtracking-questions-in-Java-(Subsets-Permutations-Combination-Sum-Palindrome-Partitioning)) [Python](https://leetcode.com/problems/combination-sum/discuss/429538/General-Backtracking-questions-solutions-in-Python-for-reference-%3A)
    
- ### [Dynamic Programming](https://github.com/jwasham/coding-interview-university#dynamic-programming)
    
    - You probably won't see any dynamic programming problems in your interview, but it's worth being able to recognize a problem as being a candidate for dynamic programming.
    - This subject can be pretty difficult, as each DP soluble problem must be defined as a recursion relation, and coming up with it can be tricky.
    - I suggest looking at many examples of DP problems until you have a solid understanding of the pattern involved.
    - [ ]  Videos:
        - [ ]  [Skiena: CSE373 2020 - Lecture 19 - Introduction to Dynamic Programming (video)](https://www.youtube.com/watch?v=wAA0AMfcJHQ&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=18)
        - [ ]  [Skiena: CSE373 2020 - Lecture 20 - Edit Distance (video)](https://www.youtube.com/watch?v=T3A4jlHlhtA&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=19)
        - [ ]  [Skiena: CSE373 2020 - Lecture 20 - Edit Distance (continued) (video)](https://www.youtube.com/watch?v=iPnPVcZmRbE&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=20)
        - [ ]  [Skiena: CSE373 2020 - Lecture 21 - Dynamic Programming (video)](https://www.youtube.com/watch?v=2xPE4Wq8coQ&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=21)
        - [ ]  [Skiena: CSE373 2020 - Lecture 22 - Dynamic Programming and Review (video)](https://www.youtube.com/watch?v=Yh3RzqQGsyI&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=22)
        - [ ]  [Simonson: Dynamic Programming 0 (starts at 59:18) (video)](https://youtu.be/J5aJEcOr6Eo?list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&t=3558)
        - [ ]  [Simonson: Dynamic Programming I - Lecture 11 (video)](https://www.youtube.com/watch?v=0EzHjQ_SOeU&index=11&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm)
        - [ ]  [Simonson: Dynamic programming II - Lecture 12 (video)](https://www.youtube.com/watch?v=v1qiRwuJU7g&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&index=12)
        - [ ]  List of individual DP problems (each is short): [Dynamic Programming (video)](https://www.youtube.com/playlist?list=PLrmLmBdmIlpsHaNTPP_jHHDx_os9ItYXr)
    - [ ]  Yale Lecture notes:
        - [ ]  [Dynamic Programming](http://www.cs.yale.edu/homes/aspnes/classes/223/notes.html#dynamicProgramming)
    - [ ]  Coursera:
        - [ ]  [The RNA secondary structure problem (video)](https://www.coursera.org/learn/algorithmic-thinking-2/lecture/80RrW/the-rna-secondary-structure-problem)
        - [ ]  [A dynamic programming algorithm (video)](https://www.coursera.org/lecture/algorithmic-thinking-2/a-dynamic-programming-algorithm-PSonq)
        - [ ]  [Illustrating the DP algorithm (video)](https://www.coursera.org/lecture/algorithmic-thinking-2/illustrating-the-dp-algorithm-oUEK2)
        - [ ]  [Running time of the DP algorithm (video)](https://www.coursera.org/learn/algorithmic-thinking-2/lecture/nfK2r/running-time-of-the-dp-algorithm)
        - [ ]  [DP vs. recursive implementation (video)](https://www.coursera.org/learn/algorithmic-thinking-2/lecture/M999a/dp-vs-recursive-implementation)
        - [ ]  [Global pairwise sequence alignment (video)](https://www.coursera.org/lecture/algorithmic-thinking-2/global-pairwise-sequence-alignment-UZ7o6)
        - [ ]  [Local pairwise sequence alignment (video)](https://www.coursera.org/learn/algorithmic-thinking-2/lecture/WnNau/local-pairwise-sequence-alignment)
## Interview Prep Books

You don't need to buy a bunch of these. Honestly "Cracking the Coding Interview" is probably enough, but I bought more to give myself more practice. But I always do too much.

I bought both of these. They gave me plenty of practice.

- [Programming Interviews Exposed: Coding Your Way Through the Interview, 4th Edition](https://www.amazon.com/Programming-Interviews-Exposed-Through-Interview/dp/111941847X/)

- [Cracking the Coding Interview, 6th Edition](http://www.amazon.com/Cracking-Coding-Interview-6th-Programming/dp/0984782850/)
- [Elements of Programming Interviews in Python](https://www.amazon.com/Elements-Programming-Interviews-Python-Insiders/dp/1537713949/)
- [Elements of Programming Interviews (Java version)](https://www.amazon.com/Elements-Programming-Interviews-Java-Insiders/dp/1517435803/) 
- - [Companion Project - Method Stub and Test Cases for Every Problem in the Book](https://github.com/gardncl/elements-of-programming-interviews)

