package com.example.jarvisbackend.services;

import com.example.jarvisbackend.models.Task;
import com.example.jarvisbackend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromptBuilderService {


    private final TaskRepository taskRepository;

    public PromptBuilderService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public String buildPrompt(String userQuestion) {
        if(isAboutTasks(userQuestion)){
            List<Task> tasks = taskRepository.findAll();

            StringBuilder taskDetails = new StringBuilder();
            for(Task task : tasks){
                taskDetails.append(String.format(
                        "ID: %d, Title: %s, Description: %s, Deadline: %s, Completed: %b\n",
                        task.getId(), task.getTitle(), task.getDescription(), task.getDeadline(), task.isCompleted()
                ));
            }
            return taskDetails + "\n\nUser Question: " + userQuestion;
        }

        return  userQuestion;
    }



    private boolean isAboutTasks(String question) {
        String q = question.toLowerCase();
        return q.contains("task") || q.contains("todo") || q.contains("deadline");
    }

}
