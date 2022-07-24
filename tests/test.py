from typing import Callable

from numpy import number
a: str = 'danny'

b = a * 5
f: Callable[[int], int] = lambda x: x + 5

def g(x: number) -> int:
    return x + 4

l: list[int] = [1,2,3,4,5]

mapped = list(map(
    lambda n: [n],
    l
))

class BinaryTreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None