package com.jeleniasty.simpletaskmanager.task;

import java.time.LocalDateTime;

public record TaskDTO(
  String title,
  String description,
  LocalDateTime deadline,
  Status status
) {}
