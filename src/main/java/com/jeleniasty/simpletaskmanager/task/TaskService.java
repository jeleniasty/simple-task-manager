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
  public void createTask(CreateTaskDTO createTaskDTO) {
    taskRepository.save(
      new TaskEntity(
        createTaskDTO.getTitle(),
        createTaskDTO.getDescription(),
        createTaskDTO.getDeadline(),
        createTaskDTO.getStatus()
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
  public void updateTask(UpdateTaskDTO updateTaskDTO) {
    var existingTask = taskRepository
      .findById(updateTaskDTO.getId())
      .orElseThrow(() -> new TaskNotFoundException(updateTaskDTO.getId()));

    existingTask.setTitle(updateTaskDTO.getTitle());
    existingTask.setDescription(updateTaskDTO.getDescription());
    existingTask.setDeadline(updateTaskDTO.getDeadline());
    existingTask.setStatus(updateTaskDTO.getStatus());

    taskRepository.save(existingTask);
  }

  @Transactional
  public void removeTask(Long taskId) {
    taskRepository.deleteById(taskId);
  }
}
