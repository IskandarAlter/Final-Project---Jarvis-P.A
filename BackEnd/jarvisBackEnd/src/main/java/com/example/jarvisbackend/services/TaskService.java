package com.example.jarvisbackend.services;


import com.example.jarvisbackend.models.Task;
import com.example.jarvisbackend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {

    private final TaskRepository taskRepo;

    public TaskService(TaskRepository taskRepo) {
        this.taskRepo = taskRepo;
    }

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Task addTask(Task task) {
        return taskRepo.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepo.findById(id).orElseThrow();
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDeadline(updatedTask.getDeadline());
        task.setCompleted(updatedTask.isCompleted());
        return taskRepo.save(task);
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }
}
