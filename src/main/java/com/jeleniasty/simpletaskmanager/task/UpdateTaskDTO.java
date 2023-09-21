package com.jeleniasty.simpletaskmanager.task;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTaskDTO extends CreateTaskDTO {

  private Long id;

  public UpdateTaskDTO(
    Long id,
    String title,
    String description,
    LocalDateTime deadline,
    Status status
  ) {
    super(title, description, deadline, status);
    this.id = id;
  }
}
