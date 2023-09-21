package com.jeleniasty.simpletaskmanager.task;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CreateTaskDTO {

  @NotBlank(message = "Title cannot be empty")
  @Size(max = 60, message = "Title should be at most 60 characters long")
  private String title;

  @Size(
    max = 255,
    message = "Description should be at most 255 characters long"
  )
  private String description;

  @NotBlank(message = "Deadline cannot be empty")
  @Future(message = "Deadline should be a future date")
  private LocalDateTime deadline;

  @NotBlank(message = "Status cannot be empty")
  private Status status;
}
