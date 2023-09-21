package com.jeleniasty.simpletaskmanager.task;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTaskDTO extends CreateTaskDTO {

  @NotBlank(message = "Id cannot be empty")
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
