package com.jeleniasty.simpletaskmanager.task;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TaskService {

  private final TaskRepository taskRepository;

  @Transactional
  public void createTask(TaskDTO taskDTO) {
    taskRepository.save(
      new TaskEntity(
        taskDTO.title(),
        taskDTO.description(),
        taskDTO.deadline(),
        taskDTO.status()
      )
    );
  }

  public TaskEntity getTask(Long taskId) {
    return taskRepository
      .findById(taskId)
      .orElseThrow(() -> new TaskNotFoundException(taskId));
  }

  public List<TaskEntity> getTasks() {
    return taskRepository.findAll();
  }

  @Transactional
  public void updateTask(Long taskId, TaskDTO taskDTO) {
    var task = taskRepository
      .findById(taskId)
      .orElseThrow(() -> new TaskNotFoundException(taskId));

    task.setTitle(taskDTO.title());
    task.setDescription(taskDTO.description());
    task.setDeadline(taskDTO.deadline());
    task.setStatus(taskDTO.status());

    taskRepository.save(task);
  }

  @Transactional
  public void removeTask(Long taskId) {
    taskRepository.deleteById(taskId);
  }
}
