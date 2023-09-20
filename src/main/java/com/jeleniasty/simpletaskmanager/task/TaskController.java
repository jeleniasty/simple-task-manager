package com.jeleniasty.simpletaskmanager.task;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/task")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

  private final TaskService taskService;

  @PostMapping
  public ResponseEntity<Void> createTask(@RequestBody TaskDTO taskDTO) {
    taskService.createTask(taskDTO);
    return ResponseEntity.status(201).build();
  }

  @GetMapping("/{taskId}")
  public ResponseEntity<TaskEntity> getTask(@PathVariable Long taskId) {
    return ResponseEntity.ok(taskService.getTask(taskId));
  }

  @GetMapping
  public ResponseEntity<List<TaskEntity>> getTasks() {
    return ResponseEntity.ok(taskService.getTasks());
  }

  @PutMapping("/{taskId}")
  public ResponseEntity<Void> updateTask(
    @PathVariable Long taskId,
    @RequestBody TaskDTO taskDTO
  ) {
    taskService.updateTask(taskId, taskDTO);

    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{taskId}")
  public ResponseEntity<Void> updateTask(@PathVariable Long taskId) {
    taskService.removeTask(taskId);

    return ResponseEntity.status(204).build();
  }
}
