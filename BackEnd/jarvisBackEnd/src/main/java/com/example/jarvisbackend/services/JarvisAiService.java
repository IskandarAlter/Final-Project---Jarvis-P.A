package com.example.jarvisbackend.services;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ai.openai.OpenAiChatModel;


@Service
public class JarvisAiService {

    private final OpenAiChatModel chatClient;
    private final PromptBuilderService promptBuilderService;

    @Autowired
    public JarvisAiService(OpenAiChatModel chatClient, PromptBuilderService promptBuilderService) {
        this.chatClient = chatClient;
        this.promptBuilderService = promptBuilderService;
    }

    public String askJarvis(String input) {
        String prompt = promptBuilderService.buildPrompt(input);
        ChatResponse response = chatClient.call(new Prompt(prompt));
        return response.getResult().getOutput().getText();
    }
}
