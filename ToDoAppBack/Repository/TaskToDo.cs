using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Repository
{
  public class TaskToDo
  {
    public Guid Id { get; set; }
    public bool MarkAsDone { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public DateTimeOffset CreationTime { get; set; }
  }
}
