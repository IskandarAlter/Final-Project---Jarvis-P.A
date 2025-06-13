package com.example.jarvisbackend.services;


import com.example.jarvisbackend.models.Task;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {

    private final Map<Long, Task> taskMap = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong();

    public List<Task> getAllTasks() {
        return new ArrayList<>(taskMap.values());
    }

    public Task getTaskById(Long id) {
        return taskMap.get(id);
    }

    public Task createTask(Task task) {
        task.setId(idGenerator.incrementAndGet());
        taskMap.put(task.getId(), task);
        return task;
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existingTask = taskMap.get(id);
        if(existingTask != null) {
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDeadline(updatedTask.getDeadline());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setCompleted(updatedTask.isCompleted());
        }
        return existingTask;
    }

    public boolean deleteTaskById(Long id) {
        return taskMap.remove(id) != null;
    }

}
