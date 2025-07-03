package com.example.__task_2;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class DetailService {
    private final Map<String, Person> persons = new HashMap<>();

    public DetailService(){
        loadCsvData();
    }

    public void loadCsvData(){
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        new ClassPathResource("data/details.csv").getInputStream(), StandardCharsets.UTF_8))){
            String line;
            br.readLine();
            while ((line = br.readLine()) != null){
                String[] tokens = line.split(",");
                if(tokens.length == 3){ //3개의 정보가 모두 있을 때에만
                    String name = tokens[0].trim();
                    int age = Integer.parseInt(tokens[1].trim());
                    String job = tokens[2].trim();
                    persons.put(name.toLowerCase(), new Person(name, age, job));
                }
            }
        }catch (IOException e) {
            System.err.println("CSV 파일 읽기 오류: " + e.getMessage());
        }

    }

    //null을 고려하여 Optional 사용
    public Optional<Person> findDetail(String name){
        return Optional.ofNullable(persons.get(name.toLowerCase()));
    }
}
