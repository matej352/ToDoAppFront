﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ToDoApp.Models
{
    public partial class Tasks
    {
        public string Id { get; set; }
        public bool MarkAsDone { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTimeOffset CreationTime { get; set; }
    }
}