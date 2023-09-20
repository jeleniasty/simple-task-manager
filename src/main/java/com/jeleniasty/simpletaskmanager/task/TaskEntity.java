package com.jeleniasty.simpletaskmanager.task;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity(name = "task")
@Table(schema = "simple-task-manager")
@NoArgsConstructor
@Getter
@Setter
public class TaskEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_seq_id")
  @SequenceGenerator(
    name = "task_seq_id",
    sequenceName = "task_seq_id",
    schema = "simple-task-manager"
  )
  private Long id;

  @NonNull
  private String title;

  private String description;

  private LocalDateTime deadline;

  @Enumerated(EnumType.STRING)
  private Status status;

  public TaskEntity(
    @NonNull String title,
    String description,
    LocalDateTime deadline,
    Status status
  ) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }
}
