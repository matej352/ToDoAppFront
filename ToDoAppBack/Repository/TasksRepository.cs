using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.DTOs;
using ToDoApp.Models;

namespace ToDoApp.Repository
{
    public class TasksRepository : ITasksRepository
    {

    /*private readonly List<TaskToDo> repo = new List<TaskToDo> {
        new TaskToDo { Id = Guid.NewGuid(), MarkAsDone = false, Title = "DZ FIZIKA" , Text = "Riješi 2. zadatak", CreationTime = DateTimeOffset.UtcNow },
        new TaskToDo { Id = Guid.NewGuid(), MarkAsDone = false, Title = "DZ MATEMATIKA" , Text = "Riješi 8. zadatak", CreationTime = DateTimeOffset.UtcNow},
        new TaskToDo 
        { 
            Id = Guid.NewGuid(), 
            MarkAsDone = true,
            Title = "OPERI SUĐE",
            Text = "bolje nego prošli put",
            CreationTime = new DateTimeOffset(2008, 5, 1, 8, 6, 32, new TimeSpan(1, 0, 0)) 
        },
        new TaskToDo { Id = Guid.NewGuid(), MarkAsDone = false, Title = "PROŠEĆI PSA" , Text = "Barem pola sata", CreationTime = DateTimeOffset.UtcNow }
    }; */

        private readonly TodoappdbContext context;

        public TasksRepository(TodoappdbContext context) {
            this.context = context;
        }
      

        public async Task Delete(Guid id)
        {
            var task = await context.Tasks.FindAsync(id.ToString());
            context.Remove(task);

            await context.SaveChangesAsync();
        }

        public async Task<ActionResult<TaskToDo>> findById(Guid id)
        {
            var task = await context.Tasks.FindAsync(id.ToString());

            var taskToDo = convertToTaskToDo(task);
            
            return await Task.FromResult(taskToDo);
        }


    public async Task<IEnumerable<TaskToDo>> GetAll()
        {

            var tasks = context.Tasks.OrderByDescending(t => t.CreationTime).ToList();

            var taskToDoS = tasks.Select(t => convertToTaskToDo(t)).ToList();
        
            return await Task.FromResult(taskToDoS);
        }

        public async Task<Guid> save(CreateTaskDTO task)
        {
            var newTask = new Tasks {
                Id = Guid.NewGuid().ToString(),
                CreationTime = DateTimeOffset.UtcNow,
                Title = task.Title,
                Text = task.Text,
                MarkAsDone = false
            };
            context.Add(newTask);
            await context.SaveChangesAsync();
            return await Task.FromResult(new Guid(newTask.Id));
        }

        public async Task Update(UpdateTaskDTO dto)
        {
            var task = await context.Tasks.FindAsync(dto.Id.ToString());
            task.MarkAsDone = dto.MarkAsDone;
            task.Text = dto.Text;
            task.Title = dto.Title;

            await context.SaveChangesAsync();
        }
        private TaskToDo convertToTaskToDo(Tasks task)
        {
            return new TaskToDo {
              Id = new Guid(task.Id),
              CreationTime = task.CreationTime,
              Title = task.Title,
              Text = task.Text,
              MarkAsDone = task.MarkAsDone
            };
        }
  }
}
