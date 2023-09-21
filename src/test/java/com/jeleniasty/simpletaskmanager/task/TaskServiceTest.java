package com.jeleniasty.simpletaskmanager.task;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

  @InjectMocks
  private TaskService taskService;

  @Mock
  private TaskRepository taskRepository;

  @Test
  public void testCreateTask() {
    CreateTaskDTO createTaskDTO = new CreateTaskDTO(
      "Task Title",
      "Task Description",
      LocalDateTime.of(2023, 9, 30, 15, 30),
      Status.DONE
    );

    when(taskRepository.save(any(TaskEntity.class)))
      .thenReturn(new TaskEntity());

    taskService.createTask(createTaskDTO);
    verify(taskRepository, Mockito.times(1)).save(any(TaskEntity.class));
  }

  @Test
  public void testGetTask() {
    Long taskId = 1L;
    TaskEntity taskEntity = new TaskEntity();

    when(taskRepository.findById(taskId)).thenReturn(Optional.of(taskEntity));
    TaskEntity result = taskService.getTask(taskId);

    verify(taskRepository, Mockito.times(1)).findById(taskId);
    assertEquals(taskEntity, result);
  }

  @Test
  public void testGetTasks() {
    List<TaskEntity> taskEntities = Arrays.asList(
      new TaskEntity(),
      new TaskEntity()
    );

    when(taskRepository.findAll()).thenReturn(taskEntities);
    List<TaskEntity> result = taskService.getTasks();

    verify(taskRepository, Mockito.times(1)).findAll();
    assertEquals(taskEntities, result);
  }

  @Test
  public void testUpdateTask() {
    UpdateTaskDTO updateTaskDTO = new UpdateTaskDTO(
      1L,
      "Task Title",
      "Task Description",
      LocalDateTime.of(2023, 9, 30, 15, 30),
      Status.DONE
    );

    when(taskRepository.findById(updateTaskDTO.getId()))
      .thenReturn(Optional.of(new TaskEntity()));
    taskService.updateTask(updateTaskDTO);

    verify(taskRepository, Mockito.times(1)).save(any(TaskEntity.class));
  }

  @Test
  public void testRemoveTask() {
    Long taskId = 1L;
    taskService.removeTask(taskId);

    verify(taskRepository, Mockito.times(1)).deleteById(taskId);
  }
}
