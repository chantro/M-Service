package com.example.__task_2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inform")
public class DetailController {
    @Autowired
    private DetailService detailService;

    @GetMapping("/{name}")
    public ResponseEntity<Object> getDetail(@PathVariable String name){
        System.out.println("success");
        return detailService.findDetail(name)
                .map(person -> ResponseEntity.ok().body((Object) person))
                .orElse(ResponseEntity.status(500).body("cannot find person"));
    }
}
