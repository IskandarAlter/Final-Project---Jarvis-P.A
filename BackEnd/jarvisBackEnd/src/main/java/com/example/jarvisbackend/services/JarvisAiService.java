package com.example.jarvisbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ai.openai.OpenAiChatModel;


@Service
public class JarvisAiService {

    private final OpenAiChatModel chatClient;

    @Autowired
    public JarvisAiService(OpenAiChatModel chatClient) {
        this.chatClient = chatClient;
    }

    public String askJarvis(String input) {
        return chatClient.call(input);
    }

}
