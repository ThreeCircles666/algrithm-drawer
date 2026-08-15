export const BUBBLE_SORT_CODE = `def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        for j in range(0, n - i - 1):

            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr`

export const BINARY_SEARCH_CODE = `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            left = mid + 1

        else:
            right = mid - 1

    return -1`

export const BFS_CODE = `def bfs(graph, start):
    visited = []
    queue = [start]
    visited.append(start)

    while queue:
        current = queue.pop(0)

        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.append(neighbor)
                queue.append(neighbor)

    return visited`

export const SAMPLE_CODES = {
  'bubble-sort': BUBBLE_SORT_CODE,
  'binary-search': BINARY_SEARCH_CODE,
  bfs: BFS_CODE,
} as const
