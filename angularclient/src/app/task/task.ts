import { Status } from './status';

export class Task {
  id?: number;
  title: string;
  description: string;
  deadline: Date;
  status: Status;

  constructor(
    title: string,
    description: string,
    deadline: Date,
    status: Status
  ) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }
}
