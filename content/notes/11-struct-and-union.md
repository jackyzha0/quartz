---
title: "11-struct-and-union"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-11-10
sr-interval: 19
sr-ease: 230
---

# Struct
not a calss
- class like *composite data type* called struct
- POD plain old data

## declare
```
struct <name>{
	<type><name>;
	<type><name>;
} <variable>;

struct point_2d {
	double x;e
	double y;
} point;
```

typically an anonymous struct is declared and then given a name with typedef

```
typedef struct {
	double x;
	double y;
} point_2d;
```

This is the common convention now.

## initalize
```
point_2d location = {0.0, 1.0}; //initalizers
point_2d location = {.y = 1.0, .x = 0.0}; //designated initalizers
```

## accessing
use the `.`

```
point_2d location;

location.x = 0;
location.y = 1;
```

## shallow copy
copy the members including pointers
- but not the things the pointers point to

![shallow copy example 1|200](https://i.imgur.com/w3B3ce0.png)
![shallow copy example 2|400](https://i.imgur.com/mL5QION.png)

 both point to the same memory location.
when you change one - they both change.

## passing to routines
### by value
need to copy the whole objcet, usually slower
```
void thing_print(thing object) {
	print("%f ",object.value)
	print("%f\n", object.string)	
	object.value = object.value -1; //does not affect first because it is a copy of object
}

thing_print(first)
```

### by address
usually faster. less data coming off and onto the stack
```
void thing_print(thing *object) {
	print("%f ",object->value) //struct->field === (*struct).field
	print("%f\n", object->string)	
	object->value = object->value -1; //does not affect first because object is a pointer to first
}

thing_print(&first)
```

## returning
- return by value
- never return a pointer to somthing on the stack

# Queue
- enqeue to tail
- dequeue from head
- FIFO

![diagram|400](https://i.imgur.com/nD0AxGd.png)

## enqueue with pointers
queue is a linked list
`NULL` as sentinel value at end

![diagram linked list|400](https://i.imgur.com/WFCbQjR.png)

- go down list till we find null
- create new object (`malloc`), value = 123, pointer = NULL
- change null in final object to the new object

```
typedef struct q_item {
	int value;
	stuct q_item *next;
} queue_item;

//for convenience we have a struct for the queue
typedef struct {
	queue_item *head;
} queue;
```

constructor
```
queue *queue_new(void){
	queue *this = malloc(sizeof(queue));
	this->head = NULL;
	return this;
}
```

enqueue
![enqueue code|400](https://i.imgur.com/suaKfi9.png)

dequeue
![dequeue code|400](https://i.imgur.com/u3mKX5R.png)

# Structs as view
```
typedef struct q_item {
	int value;             //4-byte integer
	struct q_item *next;   //8-byte pointer
} queue_item;
```

![](https://i.imgur.com/ObfIzew.png)

struct is a view where the members are laid out consecutively

# Union
multiple views of the same memory
- each line in the declaration is a different view

```
typedef union {
	struct {
		uint8_t a, b, c, d;
	};
	uint32_t integer;
} two_views;
```

![diagram|100](https://i.imgur.com/qL8KnW5.png)

## endianess
big-endian vs little-endian
some computer store the most significatn byte first, other store the least significant byte first

